/* global FB_AUTH, FB_DB */
/**
 * Shared user-auth helper loaded on quiz pages.
 * Checks if a user is logged in via Firebase and pre-fills #studentName.
 */
(function () {
  'use strict';

  async function applyUserProfile() {
    if (!window.FB_AUTH || !window.FB_DB) return;

    var auth = window.FB_AUTH;
    var db = window.FB_DB;

    var { onAuthStateChanged } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js');

    onAuthStateChanged(auth, async function (user) {
      if (!user) return;

      var nameInput = document.getElementById('studentName');
      if (!nameInput) return;

      var displayName = null;
      try {
        var { getDoc, doc } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');
        var snap = await getDoc(doc(db, 'users', user.uid));
        if (snap.exists()) {
          var data = snap.data();
          displayName = data.display_name || data.full_name || null;
        }
      } catch (e) {
        // fall through to defaults
      }

      if (!displayName) {
        displayName = user.displayName || (user.email && user.email.split('@')[0]) || 'User';
      }

      nameInput.value = displayName;
      nameInput.readOnly = true;
      nameInput.title = 'Logged in as ' + user.email + ' \u2014 edit your profile to change your name.';
      nameInput.style.background = '#f0f4ff';
      nameInput.style.cursor = 'not-allowed';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyUserProfile);
  } else {
    applyUserProfile();
  }
})();
