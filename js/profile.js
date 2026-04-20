/* global supabase, SUPABASE_CONFIG */
(function () {
  'use strict';

  let client = null;
  let currentUser = null;

  const $ = (id) => document.getElementById(id);

  function setStatus(elementId, message, kind) {
    const el = $(elementId);
    if (!el) return;
    el.textContent = message;
    el.className = 'status-msg' + (kind ? ' ' + kind : '');
  }

  async function initAndLoad() {
    if (!window.SUPABASE_CLIENT) {
      setStatus('profileStatus', 'Supabase configuration not found.', 'err');
      return;
    }

    client = window.SUPABASE_CLIENT;

    const { data, error } = await client.auth.getSession();
    if (error || !data.session) {
      // Not logged in – redirect to home
      window.location.href = 'index.html';
      return;
    }

    currentUser = data.session.user;
    $('profileEmail').textContent = currentUser.email;
    await loadProfile();

    // Keep session in sync
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
    }
  }

  async function saveProfile(e) {
    e.preventDefault();
    if (!client || !currentUser) return;

    const payload = {
      id: currentUser.id,
      email: currentUser.email,
      full_name: $('fullName').value.trim() || null,
      display_name: $('displayName').value.trim() || null,
      avatar_url: $('avatarUrl').value.trim() || null,
      bio: $('bio').value.trim() || null,
      favourite_subject: $('favouriteSubject').value || null,
    };

    setStatus('profileStatus', 'Saving…', '');
    const { error } = await client.from('profiles').upsert(payload, { onConflict: 'id' });
    if (error) {
      setStatus('profileStatus', 'Save failed: ' + error.message, 'err');
      return;
    }

    setStatus('profileStatus', 'Profile saved successfully!', 'ok');
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
  }

  function bootstrap() {
    wireEvents();
    initAndLoad();
  }

  document.addEventListener('DOMContentLoaded', bootstrap);
})();
