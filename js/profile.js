/* global FB_AUTH, FB_DB, FB_STORAGE */
(function () {
  'use strict';

  var auth = null;
  var db = null;
  var storage = null;
  var currentUser = null;
  var selectedAvatarFile = null;

  var MAX_AVATAR_SIZE = 2 * 1024 * 1024;
  var $ = function (id) { return document.getElementById(id); };

  function getAppearancePayload() {
    return {
      theme: $('appearanceTheme') ? $('appearanceTheme').value : 'default',
      background: $('backgroundStyle') ? $('backgroundStyle').value : 'default'
    };
  }

  function syncAppearanceFields(preferences) {
    var resolved = preferences || {};
    if ($('appearanceTheme')) $('appearanceTheme').value = resolved.theme || 'default';
    if ($('backgroundStyle')) $('backgroundStyle').value = resolved.background || 'default';
  }

  function setStatus(elementId, message, kind) {
    var el = $(elementId);
    if (!el) return;
    el.textContent = message;
    el.className = 'status-msg' + (kind ? ' ' + kind : '');
  }

  function getDisplayName() {
    return (
      $('displayName') && $('displayName').value.trim() ||
      $('fullName') && $('fullName').value.trim() ||
      (currentUser && currentUser.email && currentUser.email.split('@')[0]) ||
      'User'
    );
  }

  function updateAvatarPreview(url) {
    var img = $('avatarPreviewImg');
    var fallback = $('avatarFallback');
    if (!img || !fallback) return;

    var name = getDisplayName();
    fallback.textContent = name ? name.charAt(0).toUpperCase() : '\uD83D\uDC64';

    if (url) {
      img.src = url;
      img.style.display = 'block';
      fallback.style.display = 'none';
      img.onerror = function () {
        img.style.display = 'none';
        fallback.style.display = 'inline';
      };
    } else {
      img.removeAttribute('src');
      img.style.display = 'none';
      fallback.style.display = 'inline';
    }
  }

  function handleAvatarSelection(e) {
    var file = e.target.files && e.target.files[0];
    if (!file) { selectedAvatarFile = null; return; }

    if (!file.type.startsWith('image/')) {
      e.target.value = '';
      selectedAvatarFile = null;
      setStatus('profileStatus', 'Please choose an image file.', 'err');
      return;
    }
    if (file.size > MAX_AVATAR_SIZE) {
      e.target.value = '';
      selectedAvatarFile = null;
      setStatus('profileStatus', 'Image must be 2 MB or smaller.', 'err');
      return;
    }
    selectedAvatarFile = file;
    $('avatarUrl').value = '';
    updateAvatarPreview(URL.createObjectURL(file));
    setStatus('profileStatus', 'Picture selected. Click Save Profile to upload it.', '');
  }

  function removeAvatarSelection() {
    selectedAvatarFile = null;
    if ($('avatarFile')) $('avatarFile').value = '';
    if ($('avatarUrl')) $('avatarUrl').value = '';
    updateAvatarPreview('');
    setStatus('profileStatus', 'Profile picture will be removed when you save.', '');
  }

  async function uploadAvatarIfNeeded() {
    if (!selectedAvatarFile) {
      return $('avatarUrl').value.trim() || null;
    }
    var extension = (selectedAvatarFile.name.split('.').pop() || 'png').toLowerCase();
    var filePath = 'profile-pictures/' + currentUser.uid + '/avatar-' + Date.now() + '.' + extension;

    var { ref, uploadBytes, getDownloadURL } =
      await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-storage.js');

    var storageRef = ref(storage, filePath);
    await uploadBytes(storageRef, selectedAvatarFile, { contentType: selectedAvatarFile.type });
    return await getDownloadURL(storageRef);
  }

  async function initAndLoad() {
    if (!window.FB_AUTH || !window.FB_DB) {
      setStatus('profileStatus', 'Firebase configuration not found.', 'err');
      return;
    }
    auth = window.FB_AUTH;
    db = window.FB_DB;
    storage = window.FB_STORAGE || null;

    var { onAuthStateChanged } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js');

    onAuthStateChanged(auth, async function (user) {
      if (!user) {
        window.location.href = 'index.html';
        return;
      }
      currentUser = user;
      $('profileEmail').textContent = currentUser.email;
      await loadProfile();
    });
  }

  async function loadProfile() {
    if (!db || !currentUser) return;
    var { getDoc, doc } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');
    var snap = await getDoc(doc(db, 'users', currentUser.uid));
    if (snap.exists()) {
      var data = snap.data();
      $('fullName').value = data.full_name || '';
      $('displayName').value = data.display_name || '';
      $('avatarUrl').value = data.avatar_url || '';
      if ($('bio')) $('bio').value = data.bio || '';
      if ($('favouriteSubject')) $('favouriteSubject').value = data.favourite_subject || '';
      if ($('schoolLevel')) $('schoolLevel').value = data.school_level || '';
      syncAppearanceFields(
        data.appearance_preferences ||
        (window.QuizPersonalization && window.QuizPersonalization.getAppearancePreferences
          ? window.QuizPersonalization.getAppearancePreferences()
          : null)
      );
      updateAvatarPreview(data.avatar_url || '');
    } else {
      syncAppearanceFields(
        window.QuizPersonalization && window.QuizPersonalization.getAppearancePreferences
          ? window.QuizPersonalization.getAppearancePreferences()
          : null
      );
      updateAvatarPreview('');
    }
  }

  async function saveProfile(e) {
    e.preventDefault();
    if (!db || !currentUser) return;

    try {
      setStatus('profileStatus', selectedAvatarFile ? 'Uploading picture\u2026' : 'Saving\u2026', '');
      var avatarUrl = await uploadAvatarIfNeeded();

      var payload = {
        email: currentUser.email,
        full_name: $('fullName').value.trim() || null,
        display_name: $('displayName').value.trim() || null,
        avatar_url: avatarUrl || null,
        bio: $('bio') ? ($('bio').value.trim() || null) : null,
        favourite_subject: $('favouriteSubject') ? ($('favouriteSubject').value || null) : null,
        school_level: $('schoolLevel') ? ($('schoolLevel').value || null) : null,
        appearance_preferences: getAppearancePayload(),
        updated_at: new Date().toISOString()
      };

      var { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');
      await setDoc(doc(db, 'users', currentUser.uid), payload, { merge: true });

      if (window.QuizPersonalization) {
        window.QuizPersonalization.cacheAppearancePreferences(payload.appearance_preferences);
        window.QuizPersonalization.applyAppearance(payload.appearance_preferences);
      }

      selectedAvatarFile = null;
      if ($('avatarFile')) $('avatarFile').value = '';
      $('avatarUrl').value = avatarUrl || '';
      updateAvatarPreview(avatarUrl || '');
      setStatus('profileStatus', 'Profile saved successfully!', 'ok');
    } catch (error) {
      setStatus('profileStatus', 'Save failed: ' + error.message, 'err');
    }
  }

  async function changePassword(e) {
    e.preventDefault();
    if (!auth) return;

    var newPassword = $('newPassword').value;
    var confirmPassword = $('confirmPassword').value;

    if (!newPassword || newPassword.length < 6) {
      setStatus('passwordStatus', 'Password must be at least 6 characters.', 'err');
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatus('passwordStatus', 'Passwords do not match.', 'err');
      return;
    }

    setStatus('passwordStatus', 'Updating password\u2026', '');
    try {
      var { updatePassword } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js');
      await updatePassword(auth.currentUser, newPassword);
      $('newPassword').value = '';
      $('confirmPassword').value = '';
      setStatus('passwordStatus', 'Password changed successfully!', 'ok');
    } catch (error) {
      setStatus('passwordStatus', 'Password update failed: ' + error.message, 'err');
    }
  }

  async function signOut() {
    if (!auth) return;
    var { signOut: fbSignOut } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js');
    await fbSignOut(auth);
    window.location.href = 'index.html';
  }

  function wireEvents() {
    var profileForm = $('profileForm');
    if (profileForm) profileForm.addEventListener('submit', saveProfile);

    var passwordForm = $('passwordForm');
    if (passwordForm) passwordForm.addEventListener('submit', changePassword);

    var signOutBtn = $('signOutBtn');
    if (signOutBtn) signOutBtn.addEventListener('click', signOut);

    var avatarFile = $('avatarFile');
    if (avatarFile) avatarFile.addEventListener('change', handleAvatarSelection);

    var avatarUrl = $('avatarUrl');
    if (avatarUrl) {
      avatarUrl.addEventListener('input', function (e) {
        if (e.target.value.trim()) {
          selectedAvatarFile = null;
          if ($('avatarFile')) $('avatarFile').value = '';
        }
        updateAvatarPreview(e.target.value.trim());
      });
    }

    var removeAvatarBtn = $('removeAvatarBtn');
    if (removeAvatarBtn) removeAvatarBtn.addEventListener('click', removeAvatarSelection);

    ['appearanceTheme', 'backgroundStyle'].forEach(function (id) {
      var field = $(id);
      if (field) {
        field.addEventListener('change', function () {
          if (window.QuizPersonalization) {
            window.QuizPersonalization.applyAppearance(getAppearancePayload());
          }
        });
      }
    });

    ['fullName', 'displayName'].forEach(function (id) {
      var field = $(id);
      if (field) {
        field.addEventListener('input', function () {
          if (!$('avatarUrl').value.trim() && !selectedAvatarFile) {
            updateAvatarPreview('');
          }
        });
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    wireEvents();
    initAndLoad();
  });
})();
