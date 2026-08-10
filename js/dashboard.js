/* global FB_AUTH, FB_DB */
(function () {
  'use strict';

  var auth = null;
  var db = null;
  var currentUser = null;

  var SUBJECTS = [
    { key: 'math',    label: '\uD83D\uDD22 Math' },
    { key: 'science', label: '\uD83D\uDD2C Science' },
    { key: 'english', label: '\uD83D\uDCD6 English' },
    { key: 'chinese', label: '\uD83C\uC004 Chinese' }
  ];

  function $(id) { return document.getElementById(id); }

  function getSortableTime(value) {
    if (!value) return 0;
    if (value.toDate) return value.toDate().getTime();
    var parsed = new Date(value);
    return isNaN(parsed.getTime()) ? 0 : parsed.getTime();
  }

  async function init() {
    if (!window.FB_AUTH || !window.FB_DB) {
      showError('Firebase configuration not found.');
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
      await Promise.all([loadProfile(), loadQuizStats()]);
    });
  }

  async function loadProfile() {
    var { getDoc, doc } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');
    var snap = await getDoc(doc(db, 'users', currentUser.uid));
    if (!snap.exists()) return;
    var p = snap.data();

    var nameEl = $('dashName');
    if (nameEl) nameEl.textContent = p.display_name || p.full_name || currentUser.email || 'Learner';

    var ptEl = $('totalPoints');
    if (ptEl) ptEl.textContent = p.total_points || 0;

    var qEl = $('totalQuizzes');
    if (qEl) qEl.textContent = p.total_quizzes || 0;

    await loadRank(p.total_points || 0);
  }

  async function loadRank(userPoints) {
    var rankEl = $('leaderboardRank');
    if (!rankEl) return;
    try {
      var { collection, getDocs, query, where } =
        await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');
      var q = query(collection(db, 'users'), where('total_points', '>', userPoints));
      var snap = await getDocs(q);
      rankEl.textContent = '#' + (snap.size + 1);
    } catch (e) {
      rankEl.textContent = '\u2014';
    }
  }

  async function loadQuizStats() {
    try {
      var { collection, getDocs, query, where } =
        await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');
      var q = query(
        collection(db, 'quiz_records'),
        where('user_id', '==', currentUser.uid)
      );
      var snap = await getDocs(q);
      var records = [];
      snap.forEach(function (d) { records.push(d.data()); });
      records.sort(function (a, b) {
        return getSortableTime(b.completed_at) - getSortableTime(a.completed_at);
      });
      renderSubjectBreakdown(records);
      renderRecentActivity(records.slice(0, 5));
    } catch (e) {
      showError('Could not load quiz stats: ' + e.message);
    }
  }

  function renderSubjectBreakdown(records) {
    var tbody = $('subjectTbody');
    if (!tbody) return;

    var stats = {};
    SUBJECTS.forEach(function (s) {
      stats[s.key] = { label: s.label, count: 0, totalPct: 0, points: 0 };
    });

    records.forEach(function (r) {
      var key = (r.subject || '').toLowerCase();
      if (!stats[key]) {
        stats[key] = { label: key.charAt(0).toUpperCase() + key.slice(1), count: 0, totalPct: 0, points: 0 };
      }
      stats[key].count++;
      stats[key].totalPct += r.percentage || 0;
      stats[key].points += r.points_earned || 0;
    });

    var html = '';
    SUBJECTS.forEach(function (s) {
      var d = stats[s.key];
      var avgPct = d.count > 0 ? Math.round(d.totalPct / d.count) : '\u2014';
      html += '<tr><td>' + d.label + '</td><td>' + d.count + '</td><td>' + (d.count > 0 ? avgPct + '%' : '\u2014') + '</td><td>\u2B50 ' + d.points + '</td></tr>';
    });

    tbody.innerHTML = html || '<tr><td colspan="4">No records yet.</td></tr>';
  }

  function renderRecentActivity(records) {
    var container = $('recentActivity');
    if (!container) return;

    if (records.length === 0) {
      container.innerHTML = '<p class="dash-empty">No quiz records yet. <a href="quiz.html">Start a quiz!</a></p>';
      return;
    }

    var html = '';
    records.forEach(function (r) {
      var ts = r.completed_at;
      var dateStr = ts && ts.toDate ? ts.toDate().toLocaleString() : (ts ? new Date(ts).toLocaleString() : '');
      var subject = r.subject ? r.subject.charAt(0).toUpperCase() + r.subject.slice(1) : 'Unknown';
      var pct = r.percentage || 0;
      var badgeClass = pct >= 80 ? 'badge-excellent' : pct >= 60 ? 'badge-good' : pct >= 40 ? 'badge-ok' : 'badge-poor';
      var pts = r.points_earned || 0;

      html += '<div class="dash-activity-item">';
      html += '<div class="dash-activity-info">';
      html += '<span class="dash-activity-subject">' + subject + '</span>';
      html += '<span class="dash-activity-date">' + dateStr + '</span>';
      html += '</div>';
      html += '<div class="dash-activity-score">';
      html += '<span class="score-badge ' + badgeClass + '">' + pct + '%</span>';
      if (pts > 0) html += '<span class="dash-activity-pts">\u2B50 +' + pts + '</span>';
      html += '</div></div>';
    });

    container.innerHTML = html;
  }

  function showError(msg) {
    var el = $('dashError');
    if (el) { el.textContent = msg; el.style.display = 'block'; }
  }

  document.addEventListener('DOMContentLoaded', function () {
    init();
  });
})();
