#!/usr/bin/env node

/*
 * One-time migration script: Supabase JSON export -> Firebase Firestore
 *
 * Usage:
 *   node scripts/migrate-supabase-to-firebase.js \
 *     --serviceAccount ./firebase-service-account.json \
 *     --profiles ./migration/profiles.json \
 *     --quizRecords ./migration/quiz_records.json
 *
 * Optional flags:
 *   --dryRun                Validate + summarize only; no writes
 *   --batchSize 400         Firestore writes per batch commit (max 500)
 *   --usersCollection users Override users collection name
 *   --recordsCollection quiz_records Override quiz_records collection name
 */

const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

function parseArgs(argv) {
  const out = {
    dryRun: false,
    batchSize: 400,
    usersCollection: 'users',
    recordsCollection: 'quiz_records'
  };

  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--dryRun') {
      out.dryRun = true;
      continue;
    }
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const value = argv[i + 1];
    if (!value || value.startsWith('--')) {
      throw new Error('Missing value for argument: ' + a);
    }
    out[key] = value;
    i++;
  }

  if (!out.serviceAccount) {
    throw new Error('Missing required argument --serviceAccount <path>');
  }

  if (!out.profiles && !out.quizRecords) {
    throw new Error('Provide at least one input: --profiles <path> and/or --quizRecords <path>');
  }

  out.batchSize = Math.max(1, Math.min(500, Number(out.batchSize) || 400));
  return out;
}

function loadJson(filePath) {
  const full = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(full)) {
    throw new Error('File not found: ' + full);
  }
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

  throw new Error('Unsupported JSON format. Expected an array or an object containing data/rows.');
}

function parseMaybeJson(value) {
  if (value === null || value === undefined) return value;
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  if (!trimmed) return value;
  if (!(trimmed.startsWith('{') || trimmed.startsWith('['))) return value;

  try {
    return JSON.parse(trimmed);
  } catch {
    return value;
  }
}

function toNullableString(value) {
  if (value === null || value === undefined) return null;
  const s = String(value).trim();
  return s ? s : null;
}

function toInt(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.trunc(n) : fallback;
}

function toDateOrNull(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function mapProfileRow(row) {
  const id = toNullableString(row.id);
  if (!id) return null;

  return {
    id,
    data: {
      email: toNullableString(row.email),
      full_name: toNullableString(row.full_name),
      display_name: toNullableString(row.display_name),
      bio: toNullableString(row.bio),
      avatar_url: toNullableString(row.avatar_url),
      favourite_subject: toNullableString(row.favourite_subject),
      total_points: toInt(row.total_points, 0),
      total_quizzes: toInt(row.total_quizzes, 0),
      created_at: toNullableString(row.created_at),
      updated_at: toNullableString(row.updated_at)
    }
  };
}

function mapQuizRecordRow(row, Timestamp) {
  const recordId = toNullableString(row.id);
  const userId = toNullableString(row.user_id);
  if (!userId) return null;

  const completedAtDate = toDateOrNull(row.completed_at);

  return {
    id: recordId,
    userId,
    data: {
      user_id: userId,
      student_name: toNullableString(row.student_name),
      subject: toNullableString(row.subject),
      category: toNullableString(row.category) || 'all',
      difficulty: toNullableString(row.difficulty) || 'all',
      theme: toNullableString(row.theme) || 'all',
      score: toInt(row.score, 0),
      total_questions: toInt(row.total_questions, 0),
      percentage: toInt(row.percentage, 0),
      points_earned: toInt(row.points_earned, 0),
      questions: parseMaybeJson(row.questions) || [],
      answers: parseMaybeJson(row.answers) || [],
      completed_at: completedAtDate ? Timestamp.fromDate(completedAtDate) : admin.firestore.FieldValue.serverTimestamp(),
      migrated_from_supabase: true
    }
  };
}

async function commitInBatches(db, writes, batchSize, dryRun) {
  if (dryRun) return;

  for (let i = 0; i < writes.length; i += batchSize) {
    const slice = writes.slice(i, i + batchSize);
    const batch = db.batch();

    for (const w of slice) {
      batch.set(w.ref, w.data, w.options || undefined);
    }

    await batch.commit();
    console.log('Committed batch', Math.floor(i / batchSize) + 1, 'of', Math.ceil(writes.length / batchSize));
  }
}

async function main() {
  const args = parseArgs(process.argv);

  const serviceAccountPath = path.resolve(process.cwd(), args.serviceAccount);
  if (!fs.existsSync(serviceAccountPath)) {
    throw new Error('Service account file not found: ' + serviceAccountPath);
  }

  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  const db = admin.firestore();
  const Timestamp = admin.firestore.Timestamp;

  const profilesRows = args.profiles ? normalizeRows(loadJson(args.profiles)) : [];
  const quizRows = args.quizRecords ? normalizeRows(loadJson(args.quizRecords)) : [];

  const mappedProfiles = profilesRows.map(mapProfileRow).filter(Boolean);
  const mappedRecords = quizRows.map((r) => mapQuizRecordRow(r, Timestamp)).filter(Boolean);

  console.log('--- Migration plan ---');
  console.log('Profiles input rows:', profilesRows.length);
  console.log('Profiles valid rows:', mappedProfiles.length);
  console.log('Quiz records input rows:', quizRows.length);
  console.log('Quiz records valid rows:', mappedRecords.length);
  console.log('Dry run:', args.dryRun ? 'yes' : 'no');

  const writes = [];

  // Upsert users docs
  for (const p of mappedProfiles) {
    const ref = db.collection(args.usersCollection).doc(p.id);
    writes.push({ ref, data: p.data, options: { merge: true } });
  }

  // Insert/overwrite quiz records docs
  for (const r of mappedRecords) {
    const ref = r.id
      ? db.collection(args.recordsCollection).doc(r.id)
      : db.collection(args.recordsCollection).doc();
    writes.push({ ref, data: r.data });
  }

  // Recompute totals from migrated records and merge into user docs.
  // This keeps leaderboard totals consistent even if profile totals were stale.
  const totalsByUser = new Map();
  for (const r of mappedRecords) {
    const current = totalsByUser.get(r.userId) || { total_points: 0, total_quizzes: 0 };
    current.total_points += toInt(r.data.points_earned, 0);
    current.total_quizzes += 1;
    totalsByUser.set(r.userId, current);
  }

  for (const [userId, totals] of totalsByUser.entries()) {
    const ref = db.collection(args.usersCollection).doc(userId);
    writes.push({
      ref,
      data: {
        total_points: totals.total_points,
        total_quizzes: totals.total_quizzes,
        updated_at: new Date().toISOString()
      },
      options: { merge: true }
    });
  }

  console.log('Total Firestore writes queued:', writes.length);

  if (args.dryRun) {
    console.log('Dry run complete. No data was written.');
    return;
  }

  await commitInBatches(db, writes, args.batchSize, args.dryRun);
  console.log('Migration complete.');
}

main().catch((err) => {
  console.error('Migration failed:', err.message);
  process.exit(1);
});
