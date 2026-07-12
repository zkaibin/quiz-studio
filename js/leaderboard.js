/* global FB_AUTH, FB_DB */
(function () {
  'use strict';

  var auth = null;
  var db = null;
  var currentUserId = null;

  function $(id) { return document.getElementById(id); }

  async function init() {
    if (!window.FB_AUTH || !window.FB_DB) {
      showMsg('Firebase configuration not found.', true);
      return;
    }
    auth = window.FB_AUTH;
    db = window.FB_DB;

    var user = auth.currentUser;
    if (user) {
      currentUserId = user.uid;
    } else {
      var { onAuthStateChanged } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js');
      await new Promise(function (resolve) {
        var unsub = onAuthStateChanged(auth, function (u) {
          if (u) currentUserId = u.uid;
          unsub();
          resolve();
        });
      });
    }

    await loadLeaderboard();
  }

  async function loadLeaderboard() {
    showMsg('Loading leaderboard\u2026', false);
    try {
      var { collection, getDocs, orderBy, query, limit } =
        await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');
      var q = query(collection(db, 'users'), orderBy('total_points', 'desc'), limit(100));
      var snap = await getDocs(q);
      var rows = [];
      snap.forEach(function (d) {
        rows.push(Object.assign({ id: d.id }, d.data()));
      });
      hideMsg();
      renderLeaderboard(rows);
    } catch (e) {
      showMsg('Could not load leaderboard: ' + e.message, true);
    }
  }

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
      var rankLabel = rank === 1 ? '\uD83E\uDD47' : rank === 2 ? '\uD83E\uDD48' : rank === 3 ? '\uD83E\uDD49' : '#' + rank;
      var name = row.display_name || row.full_name || 'Anonymous';
      var avatar = row.avatar_url
        ? '<img src="' + escapeHtml(row.avatar_url) + '" alt="" class="lb-avatar-img" onerror="this.style.display=\'none\';this.nextSibling.style.display=\'inline\'">' +
          '<span style="display:none" class="lb-avatar-fallback">\uD83D\uDC64</span>'
        : '<span class="lb-avatar-fallback">\uD83D\uDC64</span>';

      html += '<tr class="' + (isMe ? 'lb-row-me' : '') + '">';
      html += '<td class="lb-rank">' + rankLabel + '</td>';
      html += '<td><div class="lb-avatar">' + avatar + '</div></td>';
      html += '<td class="lb-name">' + escapeHtml(name) + (isMe ? ' <span class="lb-you">You</span>' : '') + '</td>';
      html += '<td class="lb-pts">\u2B50 ' + (row.total_points || 0) + '</td>';
      html += '<td class="lb-quizzes">' + (row.total_quizzes || 0) + '</td>';
      html += '</tr>';
    });
    tbody.innerHTML = html;
  }

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

  document.addEventListener('DOMContentLoaded', function () {
    var refreshBtn = $('refreshBtn');
    if (refreshBtn) refreshBtn.addEventListener('click', loadLeaderboard);
    init();
  });
})();
