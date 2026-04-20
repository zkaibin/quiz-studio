/* global supabase, SUPABASE_CONFIG */
(function () {
  'use strict';

  let client = null;
  let currentUser = null;
  let selectedAvatarFile = null;

  const STORAGE_BUCKET = 'profile-pictures';
  const MAX_AVATAR_SIZE = 2 * 1024 * 1024;
  const $ = (id) => document.getElementById(id);

  function setStatus(elementId, message, kind) {
    const el = $(elementId);
    if (!el) return;
    el.textContent = message;
    el.className = 'status-msg' + (kind ? ' ' + kind : '');
  }

  function getDisplayName() {
    return (
      $('displayName')?.value.trim() ||
      $('fullName')?.value.trim() ||
      currentUser?.email?.split('@')[0] ||
      'User'
    );
  }

  function updateAvatarPreview(url) {
    const img = $('avatarPreviewImg');
    const fallback = $('avatarFallback');
    if (!img || !fallback) return;

    const name = getDisplayName();
    fallback.textContent = name ? name.charAt(0).toUpperCase() : '👤';

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
    const file = e.target.files && e.target.files[0];
    if (!file) {
      selectedAvatarFile = null;
      return;
    }

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

    const extension = (selectedAvatarFile.name.split('.').pop() || 'png').toLowerCase();
    const filePath = currentUser.id + '/avatar-' + Date.now() + '.' + extension;

    const { error: uploadError } = await client.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, selectedAvatarFile, {
        upsert: true,
        cacheControl: '3600',
        contentType: selectedAvatarFile.type,
      });

    if (uploadError) {
      if (/bucket/i.test(uploadError.message)) {
        throw new Error('Image uploads are not configured yet. Run the updated Supabase SQL setup first.');
      }
      throw uploadError;
    }

    const { data } = client.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);
    return data?.publicUrl || null;
  }

  async function initAndLoad() {
    if (!window.SUPABASE_CLIENT) {
      setStatus('profileStatus', 'Supabase configuration not found.', 'err');
      return;
    }

    client = window.SUPABASE_CLIENT;

    const { data, error } = await client.auth.getSession();
    if (error || !data.session) {
      window.location.href = 'index.html';
      return;
    }

    currentUser = data.session.user;
    $('profileEmail').textContent = currentUser.email;
    await loadProfile();

    client.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        window.location.href = 'index.html';
      }
    });
  }

  async function loadProfile() {
    if (!client || !currentUser) return;

    const { data, error } = await client
      .from('profiles')
      .select('full_name, display_name, avatar_url, bio, favourite_subject')
      .eq('id', currentUser.id)
      .maybeSingle();

    if (error) {
      setStatus('profileStatus', 'Could not load profile: ' + error.message, 'err');
      return;
    }

    if (data) {
      $('fullName').value = data.full_name || '';
      $('displayName').value = data.display_name || '';
      $('avatarUrl').value = data.avatar_url || '';
      $('bio').value = data.bio || '';
      $('favouriteSubject').value = data.favourite_subject || '';
      updateAvatarPreview(data.avatar_url || '');
    } else {
      updateAvatarPreview('');
    }
  }

  async function saveProfile(e) {
    e.preventDefault();
    if (!client || !currentUser) return;

    try {
      setStatus('profileStatus', selectedAvatarFile ? 'Uploading picture…' : 'Saving…', '');
      const avatarUrl = await uploadAvatarIfNeeded();

      const payload = {
        id: currentUser.id,
        email: currentUser.email,
        full_name: $('fullName').value.trim() || null,
        display_name: $('displayName').value.trim() || null,
        avatar_url: avatarUrl,
        bio: $('bio').value.trim() || null,
        favourite_subject: $('favouriteSubject').value || null,
      };

      const { error } = await client.from('profiles').upsert(payload, { onConflict: 'id' });
      if (error) {
        setStatus('profileStatus', 'Save failed: ' + error.message, 'err');
        return;
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
    if (!client) return;

    const newPassword = $('newPassword').value;
    const confirmPassword = $('confirmPassword').value;

    if (!newPassword || newPassword.length < 6) {
      setStatus('passwordStatus', 'Password must be at least 6 characters.', 'err');
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus('passwordStatus', 'Passwords do not match.', 'err');
      return;
    }

    setStatus('passwordStatus', 'Updating password…', '');
    const { error } = await client.auth.updateUser({ password: newPassword });
    if (error) {
      setStatus('passwordStatus', 'Password update failed: ' + error.message, 'err');
      return;
    }

    $('newPassword').value = '';
    $('confirmPassword').value = '';
    setStatus('passwordStatus', 'Password changed successfully!', 'ok');
  }

  async function signOut() {
    if (!client) return;
    await client.auth.signOut();
    window.location.href = 'index.html';
  }

  function wireEvents() {
    const profileForm = $('profileForm');
    if (profileForm) profileForm.addEventListener('submit', saveProfile);

    const passwordForm = $('passwordForm');
    if (passwordForm) passwordForm.addEventListener('submit', changePassword);

    const signOutBtn = $('signOutBtn');
    if (signOutBtn) signOutBtn.addEventListener('click', signOut);

    const avatarFile = $('avatarFile');
    if (avatarFile) avatarFile.addEventListener('change', handleAvatarSelection);

    const avatarUrl = $('avatarUrl');
    if (avatarUrl) {
      avatarUrl.addEventListener('input', function (e) {
        if (e.target.value.trim()) {
          selectedAvatarFile = null;
          if ($('avatarFile')) $('avatarFile').value = '';
        }
        updateAvatarPreview(e.target.value.trim());
      });
    }

    const removeAvatarBtn = $('removeAvatarBtn');
    if (removeAvatarBtn) removeAvatarBtn.addEventListener('click', removeAvatarSelection);

    const nameFields = ['fullName', 'displayName'];
    nameFields.forEach(function (id) {
      const field = $(id);
      if (field) {
        field.addEventListener('input', function () {
          if (!$('avatarUrl').value.trim() && !selectedAvatarFile) {
            updateAvatarPreview('');
          }
        });
      }
    });
  }

  function bootstrap() {
    wireEvents();
    initAndLoad();
  }

  document.addEventListener('DOMContentLoaded', bootstrap);
})();
