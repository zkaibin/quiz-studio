/* global supabase */
(function () {
  'use strict';

  const STORAGE_KEY = 'quizStudioSupabaseConfig';

  let client = null;
  let currentUser = null;

  const $ = (id) => document.getElementById(id);

  function setStatus(elementId, message, kind) {
    const el = $(elementId);
    el.textContent = message;
    el.classList.remove('ok', 'err');
    if (kind) {
      el.classList.add(kind);
    }
  }

  function readConfigFromInputs() {
    return {
      url: $('supabaseUrl').value.trim(),
      anonKey: $('supabaseAnonKey').value.trim()
    };
  }

  function setConfigInputs(config) {
    $('supabaseUrl').value = config?.url || '';
    $('supabaseAnonKey').value = config?.anonKey || '';
  }

  function saveConfig(config) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }

  function loadConfig() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (err) {
      return null;
    }
  }

  function clearConfig() {
    localStorage.removeItem(STORAGE_KEY);
    client = null;
    currentUser = null;
    updateSessionDump(null);
  }

  function updateSessionDump(session) {
    const payload = session
      ? {
          user: {
            id: session.user?.id,
            email: session.user?.email,
            created_at: session.user?.created_at
          },
          expires_at: session.expires_at
        }
      : {};

    $('sessionDump').textContent = JSON.stringify(payload, null, 2);
  }

  async function connectClient() {
    const config = readConfigFromInputs();
    if (!config.url || !config.anonKey) {
      setStatus('configStatus', 'Please provide both Supabase URL and anon key.', 'err');
      return;
    }

    try {
      client = supabase.createClient(config.url, config.anonKey);
      saveConfig(config);

      const { data, error } = await client.auth.getSession();
      if (error) {
        throw error;
      }

      currentUser = data.session?.user || null;
      updateSessionDump(data.session || null);
      setStatus('configStatus', 'Connected to Supabase project successfully.', 'ok');
      setStatus(
        'authStatus',
        currentUser ? `Signed in as ${currentUser.email}` : 'No active session.',
        currentUser ? 'ok' : null
      );

      client.auth.onAuthStateChange((_event, session) => {
        currentUser = session?.user || null;
        updateSessionDump(session || null);
        setStatus(
          'authStatus',
          currentUser ? `Signed in as ${currentUser.email}` : 'No active session.',
          currentUser ? 'ok' : null
        );
      });
    } catch (err) {
      setStatus('configStatus', `Failed to connect: ${err.message}`, 'err');
    }
  }

  function requireClient() {
    if (!client) {
      setStatus('configStatus', 'Connect Supabase first in section 1.', 'err');
      return false;
    }
    return true;
  }

  function requireUser() {
    if (!currentUser) {
      setStatus('authStatus', 'Please sign in first.', 'err');
      return false;
    }
    return true;
  }

  async function signUp() {
    if (!requireClient()) return;
    const email = $('email').value.trim();
    const password = $('password').value;

    if (!email || !password) {
      setStatus('authStatus', 'Email and password are required.', 'err');
      return;
    }

    const { error } = await client.auth.signUp({ email, password });
    if (error) {
      setStatus('authStatus', `Sign up failed: ${error.message}`, 'err');
      return;
    }

    setStatus(
      'authStatus',
      'Sign up submitted. Check your email for confirmation if email verification is enabled.',
      'ok'
    );
  }

  async function signIn() {
    if (!requireClient()) return;
    const email = $('email').value.trim();
    const password = $('password').value;

    if (!email || !password) {
      setStatus('authStatus', 'Email and password are required.', 'err');
      return;
    }

    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error) {
      setStatus('authStatus', `Sign in failed: ${error.message}`, 'err');
      return;
    }

    currentUser = data.user || null;
    setStatus('authStatus', `Signed in as ${currentUser?.email || email}`, 'ok');
  }

  async function signOut() {
    if (!requireClient()) return;
    const { error } = await client.auth.signOut();
    if (error) {
      setStatus('authStatus', `Sign out failed: ${error.message}`, 'err');
      return;
    }

    currentUser = null;
    setStatus('authStatus', 'Signed out successfully.', 'ok');
    setStatus('profileStatus', 'Profile not loaded.', null);
  }

  function fillProfileForm(profile) {
    $('fullName').value = profile?.full_name || '';
    $('displayName').value = profile?.display_name || '';
    $('favouriteSubject').value = profile?.favourite_subject || '';
    $('avatarUrl').value = profile?.avatar_url || '';
    $('bio').value = profile?.bio || '';
  }

  async function loadProfile() {
    if (!requireClient() || !requireUser()) return;

    const { data, error } = await client
      .from('profiles')
      .select('id, email, full_name, display_name, bio, avatar_url, favourite_subject')
      .eq('id', currentUser.id)
      .maybeSingle();

    if (error) {
      setStatus('profileStatus', `Load profile failed: ${error.message}`, 'err');
      return;
    }

    if (!data) {
      fillProfileForm({ email: currentUser.email });
      setStatus('profileStatus', 'No profile row yet. Fill fields and click Save Profile.', null);
      return;
    }

    fillProfileForm(data);
    setStatus('profileStatus', 'Profile loaded.', 'ok');
  }

  async function saveProfile() {
    if (!requireClient() || !requireUser()) return;

    const payload = {
      id: currentUser.id,
      email: currentUser.email,
      full_name: $('fullName').value.trim() || null,
      display_name: $('displayName').value.trim() || null,
      favourite_subject: $('favouriteSubject').value || null,
      avatar_url: $('avatarUrl').value.trim() || null,
      bio: $('bio').value.trim() || null
    };

    const { error } = await client.from('profiles').upsert(payload, { onConflict: 'id' });
    if (error) {
      setStatus('profileStatus', `Save profile failed: ${error.message}`, 'err');
      return;
    }

    setStatus('profileStatus', 'Profile saved successfully.', 'ok');
  }

  function wireEvents() {
    $('saveConfigBtn').addEventListener('click', connectClient);
    $('clearConfigBtn').addEventListener('click', () => {
      clearConfig();
      setConfigInputs({});
      setStatus('configStatus', 'Config cleared.', 'ok');
      setStatus('authStatus', 'No active session.', null);
    });

    $('signUpBtn').addEventListener('click', signUp);
    $('signInBtn').addEventListener('click', signIn);
    $('signOutBtn').addEventListener('click', signOut);

    $('loadProfileBtn').addEventListener('click', loadProfile);
    $('saveProfileBtn').addEventListener('click', saveProfile);
  }

  function bootstrap() {
    wireEvents();

    const existing = loadConfig();
    if (existing) {
      setConfigInputs(existing);
      connectClient();
    }
  }

  document.addEventListener('DOMContentLoaded', bootstrap);
})();
