#!/usr/bin/env node

/*
 * One-time migration script: Supabase users/profiles JSON -> Firebase Auth users
 *
 * Usage:
 *   node scripts/migrate-auth-users-to-firebase.js \
 *     --serviceAccount ./firebase-service-account.json \
 *     --profiles ./migration/profiles.json
 *
 * Optional:
 *   --authUsers ./migration/auth_users.json
 *   --defaultPassword TempPass123!
 *   --dryRun
 *   --updateExisting true
 *   --resetPasswordExisting false
 *   --report ./migration/firebase-auth-temp-passwords.json
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const admin = require('firebase-admin');

function parseArgs(argv) {
  const out = {
    dryRun: false,
    updateExisting: true,
    resetPasswordExisting: false,
    report: './migration/firebase-auth-temp-passwords.json'
  };

  for (let i = 2; i < argv.length; i++) {
    const token = argv[i];
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);

    if (key === 'dryRun') {
      out.dryRun = true;
      continue;
    }

    const value = argv[i + 1];
    if (!value || value.startsWith('--')) {
      throw new Error('Missing value for argument: ' + token);
    }

    out[key] = value;
    i++;
  }

  if (!out.serviceAccount) {
    throw new Error('Missing required argument --serviceAccount <path>');
  }
  if (!out.profiles && !out.authUsers) {
    throw new Error('Provide at least one input file: --profiles <path> and/or --authUsers <path>');
  }

  out.updateExisting = toBool(out.updateExisting, true);
  out.resetPasswordExisting = toBool(out.resetPasswordExisting, false);

  return out;
}

function toBool(value, fallback) {
  if (value === undefined || value === null) return fallback;
  if (typeof value === 'boolean') return value;
  const normalized = String(value).trim().toLowerCase();
  if (['1', 'true', 'yes', 'y'].includes(normalized)) return true;
  if (['0', 'false', 'no', 'n'].includes(normalized)) return false;
  return fallback;
}

function resolveFile(p) {
  const full = path.resolve(process.cwd(), p);
  if (!fs.existsSync(full)) {
    throw new Error('File not found: ' + full);
  }
  return full;
}

function loadJson(filePath) {
  const full = resolveFile(filePath);
  const raw = fs.readFileSync(full, 'utf8');
  return JSON.parse(raw);
}

function normalizeRows(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.data)) return data.data;
  if (data && Array.isArray(data.rows)) return data.rows;
  if (data && Array.isArray(data.result)) return data.result;
  if (data && data.result && Array.isArray(data.result.rows)) return data.result.rows;
  if (data && data.body && Array.isArray(data.body)) return data.body;
  throw new Error('Unsupported JSON format. Expected array or object containing data/rows.');
}

function pick(...values) {
  for (const v of values) {
    if (v !== undefined && v !== null && String(v).trim() !== '') return v;
  }
  return null;
}

function safeString(v) {
  if (v === undefined || v === null) return null;
  const s = String(v).trim();
  return s || null;
}

function parseMaybeJson(v) {
  if (typeof v !== 'string') return v;
  const t = v.trim();
  if (!t) return v;
  if (!(t.startsWith('{') || t.startsWith('['))) return v;
  try {
    return JSON.parse(t);
  } catch {
    return v;
  }
}

function inferDisplayName(row) {
  const metadata = parseMaybeJson(row.user_metadata) || {};
  return safeString(
    pick(
      row.display_name,
      row.full_name,
      metadata.full_name,
      metadata.name
    )
  );
}

function inferEmailVerified(row) {
  const explicit = row.email_verified;
  if (explicit === true || explicit === false) return explicit;
  if (row.email_confirmed_at) return true;
  if (row.confirmed_at) return true;
  return false;
}

function inferUid(row) {
  return safeString(pick(row.id, row.user_id, row.uid));
}

function inferEmail(row) {
  return safeString(row.email);
}

function randomPassword(len = 16) {
  const raw = crypto.randomBytes(Math.max(24, len));
  const base = raw.toString('base64').replace(/[^a-zA-Z0-9]/g, 'A');
  const candidate = base.slice(0, Math.max(10, len - 2));
  return candidate + '9!';
}

function dedupeByUidEmail(rows) {
  const map = new Map();

  for (const row of rows) {
    const uid = inferUid(row);
    const email = inferEmail(row);
    if (!uid || !email) continue;

    const key = uid + '::' + email.toLowerCase();
    if (!map.has(key)) {
      map.set(key, {
        uid,
        email,
        displayName: inferDisplayName(row),
        emailVerified: inferEmailVerified(row)
      });
    }
  }

  return Array.from(map.values());
}

async function ensureUser(auth, candidate, opts, generatedPasswords) {
  const password = opts.defaultPassword || randomPassword(16);
  const createPayload = {
    uid: candidate.uid,
    email: candidate.email,
    displayName: candidate.displayName || undefined,
    emailVerified: !!candidate.emailVerified,
    disabled: false,
    password
  };

  if (opts.dryRun) {
    return { action: 'dry-run', usedPassword: password };
  }

  try {
    await auth.createUser(createPayload);
    generatedPasswords.push({
      uid: candidate.uid,
      email: candidate.email,
      tempPassword: password,
      action: 'created'
    });
    return { action: 'created', usedPassword: password };
  } catch (err) {
    if (err && err.code === 'auth/uid-already-exists') {
      if (!opts.updateExisting) return { action: 'exists-skip' };

      const updatePayload = {
        email: candidate.email,
        displayName: candidate.displayName || undefined,
        emailVerified: !!candidate.emailVerified,
        disabled: false
      };

      if (opts.resetPasswordExisting) {
        updatePayload.password = password;
      }

      await auth.updateUser(candidate.uid, updatePayload);

      if (opts.resetPasswordExisting) {
        generatedPasswords.push({
          uid: candidate.uid,
          email: candidate.email,
          tempPassword: password,
          action: 'updated-password-reset'
        });
      }

      return { action: opts.resetPasswordExisting ? 'updated-password-reset' : 'updated' };
    }

    if (err && err.code === 'auth/email-already-exists') {
      // The email may already exist with a different UID in Firebase.
      // We skip automatically to avoid accidental account takeover.
      return { action: 'email-conflict', error: err.message };
    }

    throw err;
  }
}

function writeReport(reportPath, payload) {
  const full = path.resolve(process.cwd(), reportPath);
  const dir = path.dirname(full);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(full, JSON.stringify(payload, null, 2));
  return full;
}

async function main() {
  const args = parseArgs(process.argv);

  const serviceAccountPath = resolveFile(args.serviceAccount);
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  const auth = admin.auth();

  const sourceRows = [];
  if (args.profiles) sourceRows.push(...normalizeRows(loadJson(args.profiles)));
  if (args.authUsers) sourceRows.push(...normalizeRows(loadJson(args.authUsers)));

  const candidates = dedupeByUidEmail(sourceRows);

  console.log('--- Auth migration plan ---');
  console.log('Input rows:', sourceRows.length);
  console.log('Valid users with uid+email:', candidates.length);
  console.log('Dry run:', args.dryRun ? 'yes' : 'no');
  console.log('Update existing:', args.updateExisting ? 'yes' : 'no');
  console.log('Reset existing passwords:', args.resetPasswordExisting ? 'yes' : 'no');

  let created = 0;
  let updated = 0;
  let skipped = 0;
  let emailConflicts = 0;
  let failed = 0;

  const generatedPasswords = [];
  const issues = [];

  for (let i = 0; i < candidates.length; i++) {
    const c = candidates[i];
    try {
      const result = await ensureUser(auth, c, args, generatedPasswords);
      if (result.action === 'created') created++;
      else if (result.action === 'updated' || result.action === 'updated-password-reset') updated++;
      else if (result.action === 'email-conflict') {
        emailConflicts++;
        issues.push({ uid: c.uid, email: c.email, issue: 'email-conflict', detail: result.error || 'Email already exists under different UID' });
      } else skipped++;
    } catch (err) {
      failed++;
      issues.push({ uid: c.uid, email: c.email, issue: 'error', detail: err.message });
    }

    if ((i + 1) % 100 === 0) {
      console.log('Processed', i + 1, 'of', candidates.length);
    }
  }

  const summary = {
    processed: candidates.length,
    created,
    updated,
    skipped,
    emailConflicts,
    failed,
    dryRun: args.dryRun,
    generatedPasswordsCount: generatedPasswords.length
  };

  console.log('--- Auth migration summary ---');
  console.log(JSON.stringify(summary, null, 2));

  const reportPayload = {
    generatedAt: new Date().toISOString(),
    summary,
    generatedPasswords,
    issues
  };

  if (!args.dryRun) {
    const reportPath = writeReport(args.report, reportPayload);
    console.log('Report written to:', reportPath);
    if (generatedPasswords.length > 0) {
      console.log('WARNING: report contains temporary passwords; handle it securely.');
    }
  }
}

main().catch((err) => {
  console.error('Auth migration failed:', err.message);
  process.exit(1);
});
