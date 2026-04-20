/* global supabase, SUPABASE_CONFIG */
(function () {
  'use strict';

  var client = null;
  var currentUser = null;
  var records = [];
  var activeRecord = null;
  var letters = ['A', 'B', 'C', 'D'];

  var $ = function (id) { return document.getElementById(id); };

  // ── Init ─────────────────────────────────────────────────────────────────
  async function init() {
    if (!window.SUPABASE_CONFIG) {
      showListMsg('Supabase configuration not found.', true);
      return;
    }

    client = supabase.createClient(
      window.SUPABASE_CONFIG.url,
      window.SUPABASE_CONFIG.anonKey
    );

    var result = await client.auth.getSession();
    if (!result.data.session) {
      window.location.href = 'index.html';
      return;
    }

    currentUser = result.data.session.user;

    client.auth.onAuthStateChange(function (_event, session) {
      if (!session) window.location.href = 'index.html';
    });

    await loadRecords();
  }

  // ── Load records ──────────────────────────────────────────────────────────
  async function loadRecords() {
    showListMsg('Loading your quiz records…', false);
    var result = await client
      .from('quiz_records')
      .select('id, student_name, category, difficulty, theme, score, total_questions, percentage, completed_at')
      .eq('user_id', currentUser.id)
      .order('completed_at', { ascending: false });

    if (result.error) {
      showListMsg('Could not load records: ' + result.error.message, true);
      return;
    }

    records = result.data || [];
    renderList();
  }

  // ── Render list ───────────────────────────────────────────────────────────
  function renderList() {
    var listMsg = $('listMsg');
    var recordsList = $('recordsList');
    if (!recordsList) return;

    if (records.length === 0) {
      if (listMsg) {
        listMsg.textContent = 'No quiz records yet. Complete a quiz to save your first record!';
        listMsg.style.display = 'block';
        listMsg.className = 'list-msg';
      }
      recordsList.innerHTML = '';
      return;
    }

    if (listMsg) listMsg.style.display = 'none';

    var html = '';
    records.forEach(function (rec) {
      var date = new Date(rec.completed_at).toLocaleString();
      var pct = rec.percentage;
      var badgeClass = pct >= 80 ? 'badge-excellent' : pct >= 60 ? 'badge-good' : pct >= 40 ? 'badge-ok' : 'badge-poor';
      var emoji = pct >= 80 ? '🎉' : pct >= 60 ? '👍' : pct >= 40 ? '📚' : '💪';

      html += '<div class="record-card" data-id="' + rec.id + '">';
      html += '<div class="record-main">';
      html += '<div class="record-info">';
      html += '<div class="record-date">' + date + '</div>';
      html += '<div class="record-meta">';

      var parts = [];
      if (rec.category && rec.category !== 'all') parts.push('Category: ' + rec.category);
      if (rec.difficulty && rec.difficulty !== 'all') parts.push('Level: ' + rec.difficulty);
      if (rec.theme && rec.theme !== 'all') parts.push('Theme: ' + rec.theme);
      html += parts.length ? parts.join(' · ') : 'All categories';

      html += '</div>';
      html += '</div>';
      html += '<div class="record-score">';
      html += '<span class="score-badge ' + badgeClass + '">' + emoji + ' ' + pct + '%</span>';
      html += '<span class="score-fraction">' + rec.score + ' / ' + rec.total_questions + '</span>';
      html += '</div>';
      html += '</div>';
      html += '<div class="record-actions">';
      html += '<button class="btn-record btn-review" data-id="' + rec.id + '">Review Answers</button>';
      html += '<button class="btn-record btn-delete" data-id="' + rec.id + '">Delete</button>';
      html += '</div>';
      html += '</div>';
    });

    recordsList.innerHTML = html;

    recordsList.querySelectorAll('.btn-review').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openReview(btn.getAttribute('data-id'));
      });
    });

    recordsList.querySelectorAll('.btn-delete').forEach(function (btn) {
      btn.addEventListener('click', function () {
        deleteRecord(btn.getAttribute('data-id'));
      });
    });
  }

  // ── Review panel ──────────────────────────────────────────────────────────
  async function openReview(id) {
    var result = await client
      .from('quiz_records')
      .select('*')
      .eq('id', id)
      .eq('user_id', currentUser.id)
      .maybeSingle();

    if (result.error || !result.data) {
      alert('Could not load this record.');
      return;
    }

    activeRecord = result.data;
    renderReview(activeRecord);
    showPanel('reviewPanel');
  }

  function renderReview(rec) {
    var container = $('reviewContainer');
    var title = $('reviewTitle');
    if (!container) return;

    var date = new Date(rec.completed_at).toLocaleString();
    if (title) title.textContent = 'Quiz Review — ' + date + ' (' + rec.score + '/' + rec.total_questions + ' · ' + rec.percentage + '%)';

    var html = '';
    var questions = rec.questions || [];
    var answers = rec.answers || [];

    questions.forEach(function (question, index) {
      var userAnswer = answers[index];
      var correctAnswer = question.answer;
      var isCorrect = userAnswer === correctAnswer;

      var questionText = question.template || '';
      questionText = questionText.replace(/\{(CHARACTER|DESCRIPTOR|NUMBER)_(\d+)\}/g, function (match, type, idx) {
        var val = question.placeholders && question.placeholders[parseInt(idx, 10)];
        return val !== undefined ? val : match;
      });

      var userAnswerText = (userAnswer !== null && userAnswer !== undefined && question.options) ? (question.options[userAnswer] || 'Not answered') : 'Not answered';
      var correctAnswerText = question.options ? question.options[correctAnswer] : '';
      var userLetter = (userAnswer !== null && userAnswer !== undefined) ? (letters[userAnswer] || '?') : '?';
      var correctLetter = letters[correctAnswer] || '?';

      html += '<div class="review-item ' + (isCorrect ? 'correct' : 'incorrect') + '">';
      html += '<div class="review-header">';
      html += '<span class="review-question-num">Question ' + (index + 1) + '</span>';
      html += '<span class="review-status ' + (isCorrect ? 'correct' : 'incorrect') + '">' + (isCorrect ? '✓ Correct' : '✗ Incorrect') + '</span>';
      html += '</div>';
      html += '<div class="review-question-text">' + questionText + '</div>';
      html += '<div class="review-answer-section">';
      html += '<div class="review-answer-box user-answer ' + (isCorrect ? 'correct' : 'incorrect') + '">';
      html += '<div class="review-answer-label">Your Answer</div>';
      html += '<div class="review-answer-value">' + userLetter + ' - ' + userAnswerText + '</div>';
      html += '</div>';
      html += '<div class="review-answer-box correct-answer">';
      html += '<div class="review-answer-label">Correct Answer</div>';
      html += '<div class="review-answer-value">' + correctLetter + ' - ' + correctAnswerText + '</div>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
    });

    container.innerHTML = html;
  }

  // ── Delete record ─────────────────────────────────────────────────────────
  async function deleteRecord(id) {
    if (!confirm('Delete this quiz record? This cannot be undone.')) return;

    var result = await client
      .from('quiz_records')
      .delete()
      .eq('id', id)
      .eq('user_id', currentUser.id);

    if (result.error) {
      alert('Could not delete record: ' + result.error.message);
      return;
    }

    records = records.filter(function (r) { return r.id !== id; });
    renderList();
  }

  // ── Panel navigation ──────────────────────────────────────────────────────
  function showPanel(panelId) {
    var panels = ['listPanel', 'reviewPanel'];
    panels.forEach(function (p) {
      var el = $(p);
      if (el) el.style.display = p === panelId ? 'block' : 'none';
    });
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  function showListMsg(msg, isError) {
    var el = $('listMsg');
    if (!el) return;
    el.textContent = msg;
    el.className = 'list-msg' + (isError ? ' list-msg-error' : '');
    el.style.display = 'block';
  }

  // ── Wire events ───────────────────────────────────────────────────────────
  function wireEvents() {
    var backBtn = $('backToListBtn');
    if (backBtn) backBtn.addEventListener('click', function () {
      showPanel('listPanel');
    });

    var backBtn2 = $('backToListBtn2');
    if (backBtn2) backBtn2.addEventListener('click', function () {
      showPanel('listPanel');
    });

    var refreshBtn = $('refreshBtn');
    if (refreshBtn) refreshBtn.addEventListener('click', loadRecords);
  }

  // ── Bootstrap ─────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    wireEvents();
    init();
  });
})();
