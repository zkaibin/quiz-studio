/* global FB_AUTH, FB_DB */
(function () {
  'use strict';

  var auth = null;
  var db = null;
  var currentUser = null;
  var records = [];
  var activeRecord = null;
  var letters = ['A', 'B', 'C', 'D'];

  var $ = function (id) { return document.getElementById(id); };

  function getSortableTime(value) {
    if (!value) return 0;
    if (value.toDate) return value.toDate().getTime();
    var parsed = new Date(value);
    return isNaN(parsed.getTime()) ? 0 : parsed.getTime();
  }

  async function init() {
    if (!window.FB_AUTH || !window.FB_DB) {
      showListMsg('Firebase configuration not found.', true);
      return;
    }
    auth = window.FB_AUTH;
    db = window.FB_DB;

    var { onAuthStateChanged } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js');
    onAuthStateChanged(auth, async function (user) {
      if (!user) {
        window.location.href = 'index.html';
        return;
      }
      currentUser = user;
      await loadRecords();
    });
  }

  async function loadRecords() {
    showListMsg('Loading your quiz records\u2026', false);
    try {
      var { collection, getDocs, query, where } =
        await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');
      var q = query(
        collection(db, 'quiz_records'),
        where('user_id', '==', currentUser.uid)
      );
      var snap = await getDocs(q);
      records = [];
      snap.forEach(function (d) {
        records.push(Object.assign({ id: d.id }, d.data()));
      });
      records.sort(function (a, b) {
        return getSortableTime(b.completed_at) - getSortableTime(a.completed_at);
      });
      renderList();
    } catch (e) {
      showListMsg('Could not load records: ' + e.message, true);
    }
  }

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
      var ts = rec.completed_at;
      var dateStr = ts && ts.toDate ? ts.toDate().toLocaleString() : (ts ? new Date(ts).toLocaleString() : '');
      var pct = rec.percentage;
      var badgeClass = pct >= 80 ? 'badge-excellent' : pct >= 60 ? 'badge-good' : pct >= 40 ? 'badge-ok' : 'badge-poor';
      var emoji = pct >= 80 ? '\uD83C\uDF89' : pct >= 60 ? '\uD83D\uDC4D' : pct >= 40 ? '\uD83D\uDCDA' : '\uD83D\uDCAA';

      html += '<div class="record-card" data-id="' + rec.id + '">';
      html += '<div class="record-main"><div class="record-info">';
      html += '<div class="record-date">' + dateStr + '</div>';
      html += '<div class="record-meta">';
      var parts = [];
      if (rec.subject) parts.push('Subject: ' + rec.subject.charAt(0).toUpperCase() + rec.subject.slice(1));
      if (rec.category && rec.category !== 'all') parts.push('Category: ' + rec.category);
      if (rec.difficulty && rec.difficulty !== 'all') parts.push('Level: ' + rec.difficulty);
      if (rec.theme && rec.theme !== 'all') parts.push('Theme: ' + rec.theme);
      html += parts.length ? parts.join(' \xB7 ') : 'All categories';
      html += '</div></div>';
      html += '<div class="record-score">';
      html += '<span class="score-badge ' + badgeClass + '">' + emoji + ' ' + pct + '%</span>';
      html += '<span class="score-fraction">' + rec.score + ' / ' + rec.total_questions + '</span>';
      html += '</div></div>';
      html += '<div class="record-actions">';
      html += '<button class="btn-record btn-review" data-id="' + rec.id + '">Review Answers</button>';
      html += '<button class="btn-record btn-delete" data-id="' + rec.id + '">Delete</button>';
      html += '</div></div>';
    });

    recordsList.innerHTML = html;

    recordsList.querySelectorAll('.btn-review').forEach(function (btn) {
      btn.addEventListener('click', function () { openReview(btn.getAttribute('data-id')); });
    });
    recordsList.querySelectorAll('.btn-delete').forEach(function (btn) {
      btn.addEventListener('click', function () { deleteRecord(btn.getAttribute('data-id')); });
    });
  }

  function openReview(id) {
    activeRecord = records.find(function (r) { return r.id === id; });
    if (!activeRecord) { alert('Could not load this record.'); return; }
    renderReview(activeRecord);
    showPanel('reviewPanel');
  }

  function renderReview(rec) {
    var container = $('reviewContainer');
    var title = $('reviewTitle');
    if (!container) return;

    var ts = rec.completed_at;
    var dateStr = ts && ts.toDate ? ts.toDate().toLocaleString() : (ts ? new Date(ts).toLocaleString() : '');
    if (title) title.textContent = 'Quiz Review \u2014 ' + dateStr + ' (' + rec.score + '/' + rec.total_questions + ' \xB7 ' + rec.percentage + '%)';

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
      html += '<span class="review-status ' + (isCorrect ? 'correct' : 'incorrect') + '">' + (isCorrect ? '\u2713 Correct' : '\u2717 Incorrect') + '</span>';
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
      html += '</div></div></div>';
    });

    container.innerHTML = html;
  }

  async function deleteRecord(id) {
    if (!confirm('Delete this quiz record? This cannot be undone.')) return;
    try {
      var { doc, deleteDoc } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');
      await deleteDoc(doc(db, 'quiz_records', id));
      records = records.filter(function (r) { return r.id !== id; });
      renderList();
    } catch (e) {
      alert('Could not delete record: ' + e.message);
    }
  }

  function showPanel(panelId) {
    ['listPanel', 'reviewPanel'].forEach(function (p) {
      var el = $(p);
      if (el) el.style.display = p === panelId ? 'block' : 'none';
    });
  }

  function showListMsg(msg, isError) {
    var el = $('listMsg');
    if (!el) return;
    el.textContent = msg;
    el.className = 'list-msg' + (isError ? ' list-msg-error' : '');
    el.style.display = 'block';
  }

  function wireEvents() {
    var backBtn = $('backToListBtn');
    if (backBtn) backBtn.addEventListener('click', function () { showPanel('listPanel'); });
    var backBtn2 = $('backToListBtn2');
    if (backBtn2) backBtn2.addEventListener('click', function () { showPanel('listPanel'); });
    var refreshBtn = $('refreshBtn');
    if (refreshBtn) refreshBtn.addEventListener('click', loadRecords);
  }

  document.addEventListener('DOMContentLoaded', function () {
    wireEvents();
    init();
  });
})();
