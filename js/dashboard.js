/* global supabase, SUPABASE_CLIENT */
(function () {
  'use strict';

  var client = null;
  var currentUser = null;

  var SUBJECTS = [
    { key: 'math',    label: '🔢 Math' },
    { key: 'science', label: '🔬 Science' },
    { key: 'english', label: '📖 English' },
    { key: 'chinese', label: '🀄 Chinese' }
  ];

  function $(id) { return document.getElementById(id); }

  // ── Init ─────────────────────────────────────────────────────────────────
  async function init() {
    if (!window.SUPABASE_CLIENT) {
      showError('Supabase configuration not found.');
      return;
    }
    client = window.SUPABASE_CLIENT;

    var result = await client.auth.getSession();
    if (!result.data.session) {
      window.location.href = 'index.html';
      return;
    }
    currentUser = result.data.session.user;

    client.auth.onAuthStateChange(function (_event, session) {
      if (!session) window.location.href = 'index.html';
    });

    await Promise.all([loadProfile(), loadQuizStats()]);
  }

  // ── Load profile totals ───────────────────────────────────────────────────
  async function loadProfile() {
    var res = await client
      .from('profiles')
      .select('display_name, total_points, total_quizzes')
      .eq('id', currentUser.id)
      .maybeSingle();

    if (res.error || !res.data) return;
    var p = res.data;

    var nameEl = $('dashName');
    if (nameEl) nameEl.textContent = p.display_name || currentUser.email || 'Learner';

    var ptEl = $('totalPoints');
    if (ptEl) ptEl.textContent = p.total_points || 0;

    var qEl = $('totalQuizzes');
    if (qEl) qEl.textContent = p.total_quizzes || 0;

    // Fetch leaderboard rank
    await loadRank(p.total_points || 0);
  }

  async function loadRank(userPoints) {
    var rankEl = $('leaderboardRank');
    if (!rankEl) return;

    var res = await client
      .from('profiles')
      .select('total_points', { count: 'exact', head: false })
      .gt('total_points', userPoints)
      .gt('total_quizzes', 0);

    if (res.error) {
      rankEl.textContent = '—';
      return;
    }
    var rank = (res.data ? res.data.length : 0) + 1;
    rankEl.textContent = '#' + rank;
  }

  // ── Load quiz records and compute per-subject stats ───────────────────────
  async function loadQuizStats() {
    var res = await client
      .from('quiz_records')
      .select('subject, score, total_questions, percentage, points_earned, completed_at')
      .eq('user_id', currentUser.id)
      .order('completed_at', { ascending: false });

    if (res.error) {
      showError('Could not load quiz stats: ' + res.error.message);
      return;
    }

    var records = res.data || [];
    renderSubjectBreakdown(records);
    renderRecentActivity(records.slice(0, 5));
  }

  // ── Subject breakdown ─────────────────────────────────────────────────────
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
      var avgPct = d.count > 0 ? Math.round(d.totalPct / d.count) : '—';
      html += '<tr>';
      html += '<td>' + d.label + '</td>';
      html += '<td>' + d.count + '</td>';
      html += '<td>' + (d.count > 0 ? avgPct + '%' : '—') + '</td>';
      html += '<td>⭐ ' + d.points + '</td>';
      html += '</tr>';
    });

    tbody.innerHTML = html || '<tr><td colspan="4">No records yet.</td></tr>';
  }

  // ── Recent activity ───────────────────────────────────────────────────────
  function renderRecentActivity(records) {
    var container = $('recentActivity');
    if (!container) return;

    if (records.length === 0) {
      container.innerHTML = '<p class="dash-empty">No quiz records yet. <a href="quiz.html">Start a quiz!</a></p>';
      return;
    }

    var html = '';
    records.forEach(function (r) {
      var date = new Date(r.completed_at).toLocaleString();
      var subject = r.subject ? r.subject.charAt(0).toUpperCase() + r.subject.slice(1) : 'Unknown';
      var pct = r.percentage || 0;
      var badgeClass = pct >= 80 ? 'badge-excellent' : pct >= 60 ? 'badge-good' : pct >= 40 ? 'badge-ok' : 'badge-poor';
      var pts = r.points_earned || 0;

      html += '<div class="dash-activity-item">';
      html += '<div class="dash-activity-info">';
      html += '<span class="dash-activity-subject">' + subject + '</span>';
      html += '<span class="dash-activity-date">' + date + '</span>';
      html += '</div>';
      html += '<div class="dash-activity-score">';
      html += '<span class="score-badge ' + badgeClass + '">' + pct + '%</span>';
      if (pts > 0) html += '<span class="dash-activity-pts">⭐ +' + pts + '</span>';
      html += '</div>';
      html += '</div>';
    });

    container.innerHTML = html;
  }

  // ── Error helper ──────────────────────────────────────────────────────────
  function showError(msg) {
    var el = $('dashError');
    if (el) { el.textContent = msg; el.style.display = 'block'; }
  }

  // ── Bootstrap ─────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    init();
  });
})();
