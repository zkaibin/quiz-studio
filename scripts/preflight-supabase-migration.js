#!/usr/bin/env node

/*
 * Preflight validation for Supabase -> Firebase migration inputs.
 *
 * Usage:
 *   node scripts/preflight-supabase-migration.js \
 *     --profiles ./migration/profiles.json \
 *     --quizRecords ./migration/quiz_records.json \
 *     --authUsers ./migration/auth_users.json
 */

const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const val = argv[i + 1];
    if (!val || val.startsWith('--')) {
      throw new Error('Missing value for argument: ' + a);
    }
    out[key] = val;
    i++;
  }
  if (!out.profiles && !out.quizRecords && !out.authUsers) {
    throw new Error('Provide at least one input: --profiles, --quizRecords, or --authUsers');
  }
  return out;
}

function loadJsonMaybe(filePath) {
  const full = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(full)) {
    return { ok: false, error: 'file-not-found', full };
  }
  try {
    const raw = fs.readFileSync(full, 'utf8');
    const parsed = JSON.parse(raw);
    return { ok: true, full, parsed };
  } catch (e) {
    return { ok: false, error: 'invalid-json', full, detail: e.message };
  }
}

function normalizeRows(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.data)) return data.data;
  if (data && Array.isArray(data.rows)) return data.rows;
  if (data && Array.isArray(data.result)) return data.result;
  if (data && data.result && Array.isArray(data.result.rows)) return data.result.rows;
  if (data && data.body && Array.isArray(data.body)) return data.body;
  return null;
}

function toObj(x) {
  return x && typeof x === 'object' ? x : {};
}

function safeString(v) {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  return s || null;
}

function parseMaybeJson(v) {
  if (typeof v !== 'string') return v;
  const t = v.trim();
  if (!t) return v;
  if (!(t.startsWith('{') || t.startsWith('['))) return v;
  try { return JSON.parse(t); } catch { return v; }
}

function validateProfiles(rows) {
  const issues = [];
  let valid = 0;

  rows.forEach((r, i) => {
    const row = toObj(r);
    const id = safeString(row.id);
    const email = safeString(row.email);

    if (!id) issues.push({ row: i, field: 'id', issue: 'missing' });
    if (!email) issues.push({ row: i, field: 'email', issue: 'missing' });
    if (id && email) valid++;
  });

  return { valid, issues };
}

function validateQuizRecords(rows) {
  const issues = [];
  let valid = 0;

  rows.forEach((r, i) => {
    const row = toObj(r);
    const userId = safeString(row.user_id);
    const score = Number(row.score);
    const totalQuestions = Number(row.total_questions);
    const percentage = Number(row.percentage);
    const questions = parseMaybeJson(row.questions);
    const answers = parseMaybeJson(row.answers);

    if (!userId) issues.push({ row: i, field: 'user_id', issue: 'missing' });
    if (!Number.isFinite(score)) issues.push({ row: i, field: 'score', issue: 'not-number' });
    if (!Number.isFinite(totalQuestions)) issues.push({ row: i, field: 'total_questions', issue: 'not-number' });
    if (!Number.isFinite(percentage)) issues.push({ row: i, field: 'percentage', issue: 'not-number' });
    if (!Array.isArray(questions)) issues.push({ row: i, field: 'questions', issue: 'not-array-or-json-array' });
    if (!Array.isArray(answers)) issues.push({ row: i, field: 'answers', issue: 'not-array-or-json-array' });

    if (
      userId &&
      Number.isFinite(score) &&
      Number.isFinite(totalQuestions) &&
      Number.isFinite(percentage) &&
      Array.isArray(questions) &&
      Array.isArray(answers)
    ) {
      valid++;
    }
  });

  return { valid, issues };
}

function validateAuthUsers(rows) {
  const issues = [];
  let valid = 0;

  rows.forEach((r, i) => {
    const row = toObj(r);
    const id = safeString(row.id || row.uid || row.user_id);
    const email = safeString(row.email);

    if (!id) issues.push({ row: i, field: 'id/uid/user_id', issue: 'missing' });
    if (!email) issues.push({ row: i, field: 'email', issue: 'missing' });
    if (id && email) valid++;
  });

  return { valid, issues };
}

function summarize(label, filePath, result, validator) {
  if (!filePath) return null;

  if (!result.ok) {
    return {
      dataset: label,
      ok: false,
      path: result.full,
      error: result.error,
      detail: result.detail || null
    };
  }

  const rows = normalizeRows(result.parsed);
  if (!rows) {
    return {
      dataset: label,
      ok: false,
      path: result.full,
      error: 'unsupported-json-shape',
      detail: 'Expected array or object with data/rows/result.rows'
    };
  }

  const { valid, issues } = validator(rows);
  return {
    dataset: label,
    ok: true,
    path: result.full,
    totalRows: rows.length,
    validRows: valid,
    invalidRows: rows.length - valid,
    issueCount: issues.length,
    issuesPreview: issues.slice(0, 20)
  };
}

function printSummary(s) {
  if (!s) return;
  console.log('---', s.dataset, '---');
  console.log('Path:', s.path);
  if (!s.ok) {
    console.log('Status: FAIL');
    console.log('Error:', s.error);
    if (s.detail) console.log('Detail:', s.detail);
    return;
  }

  console.log('Status: OK');
  console.log('Rows:', s.totalRows);
  console.log('Valid rows:', s.validRows);
  console.log('Invalid rows:', s.invalidRows);
  console.log('Issue count:', s.issueCount);
  if (s.issuesPreview.length > 0) {
    console.log('Issue preview (first 20):');
    s.issuesPreview.forEach((x) => {
      console.log('  row', x.row, '|', x.field, '|', x.issue);
    });
  }
}

function main() {
  const args = parseArgs(process.argv);

  const profilesSummary = summarize(
    'profiles',
    args.profiles,
    args.profiles ? loadJsonMaybe(args.profiles) : null,
    validateProfiles
  );

  const recordsSummary = summarize(
    'quiz_records',
    args.quizRecords,
    args.quizRecords ? loadJsonMaybe(args.quizRecords) : null,
    validateQuizRecords
  );

  const authSummary = summarize(
    'auth_users',
    args.authUsers,
    args.authUsers ? loadJsonMaybe(args.authUsers) : null,
    validateAuthUsers
  );

  printSummary(profilesSummary);
  printSummary(recordsSummary);
  printSummary(authSummary);

  const summaries = [profilesSummary, recordsSummary, authSummary].filter(Boolean);
  const hasFail = summaries.some((s) => !s.ok);

  if (hasFail) {
    process.exitCode = 2;
    return;
  }

  const hasInvalidRows = summaries.some((s) => s.invalidRows > 0);
  if (hasInvalidRows) {
    process.exitCode = 3;
    return;
  }

  console.log('Preflight passed with zero invalid rows.');
}

main();
