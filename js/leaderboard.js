/* global window */
(function () {
  'use strict';

  var client = null;
  var currentUserId = null;

  function $(id) { return document.getElementById(id); }

  // ── Init ─────────────────────────────────────────────────────────────────
  async function init() {
    if (!window.SUPABASE_CLIENT) {
      showMsg('Supabase configuration not found.', true);
      return;
    }
    client = window.SUPABASE_CLIENT;

    // Check if a user is logged in (to highlight their row)
    var sessionResult = await client.auth.getSession();
    if (sessionResult.data.session) {
      currentUserId = sessionResult.data.session.user.id;
    }

    await loadLeaderboard();
  }

  // ── Load leaderboard ──────────────────────────────────────────────────────
  async function loadLeaderboard() {
    showMsg('Loading leaderboard…', false);

    var res = await client
      .from('leaderboard')
      .select('id, display_name, avatar_url, total_points, total_quizzes');

    if (res.error) {
      showMsg('Could not load leaderboard: ' + res.error.message, true);
      return;
    }

    hideMsg();
    renderLeaderboard(res.data || []);
  }

  // ── Render ────────────────────────────────────────────────────────────────
  function renderLeaderboard(rows) {
    var tbody = $('lbTbody');
    if (!tbody) return;

    if (rows.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" class="lb-empty">No entries yet. Take a quiz to appear here!</td></tr>';
      return;
    }

    var html = '';
    rows.forEach(function (row, index) {
      var rank = index + 1;
      var isMe = row.id === currentUserId;
      var rankLabel = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '#' + rank;
      var name = row.display_name || 'Anonymous';
      var avatar = row.avatar_url
        ? '<img src="' + escapeHtml(row.avatar_url) + '" alt="" class="lb-avatar-img" onerror="this.style.display=\'none\';this.nextSibling.style.display=\'inline\'">' +
          '<span style="display:none" class="lb-avatar-fallback">👤</span>'
        : '<span class="lb-avatar-fallback">👤</span>';

      html += '<tr class="' + (isMe ? 'lb-row-me' : '') + '">';
      html += '<td class="lb-rank">' + rankLabel + '</td>';
      html += '<td><div class="lb-avatar">' + avatar + '</div></td>';
      html += '<td class="lb-name">' + escapeHtml(name) + (isMe ? ' <span class="lb-you">You</span>' : '') + '</td>';
      html += '<td class="lb-pts">⭐ ' + (row.total_points || 0) + '</td>';
      html += '<td class="lb-quizzes">' + (row.total_quizzes || 0) + '</td>';
      html += '</tr>';
    });

    tbody.innerHTML = html;
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  function showMsg(msg, isError) {
    var el = $('lbMsg');
    if (!el) return;
    el.textContent = msg;
    el.className = 'lb-msg' + (isError ? ' lb-msg-error' : '');
    el.style.display = 'block';
  }

  function hideMsg() {
    var el = $('lbMsg');
    if (el) el.style.display = 'none';
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ── Bootstrap ─────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    var refreshBtn = $('refreshBtn');
    if (refreshBtn) refreshBtn.addEventListener('click', loadLeaderboard);

    init();
  });
})();
