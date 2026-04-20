/* global supabase, SUPABASE_CONFIG */
(function () {
  'use strict';

  let client = null;
  let currentUser = null;
  let currentProfile = null;

  const $ = (id) => document.getElementById(id);

  function getEmailRedirectUrl() {
    return new URL('auth-callback.html', window.location.href).href;
  }

  function getPasswordResetRedirectUrl() {
    return new URL('reset-password.html', window.location.href).href;
  }

  function initSupabase() {
    if (!window.SUPABASE_CONFIG) {
      console.warn('Supabase config not loaded.');
      return false;
    }

    client = supabase.createClient(
      window.SUPABASE_CONFIG.url,
      window.SUPABASE_CONFIG.anonKey
    );

    return true;
  }

  async function checkAuthState() {
    if (!client) return;

    const { data, error } = await client.auth.getSession();
    if (error) {
      console.error('Auth session check failed:', error);
      return;
    }

    currentUser = data.session?.user || null;
    if (currentUser) {
      await loadProfile();
      showAuthState();
    } else {
      showAuthState();
    }

    client.auth.onAuthStateChange((_event, session) => {
      currentUser = session?.user || null;
      if (currentUser) {
        loadProfile();
      }
      showAuthState();
    });
  }

  async function loadProfile() {
    if (!client || !currentUser) return;

    const { data } = await client
      .from('profiles')
      .select('id, full_name, display_name, avatar_url')
      .eq('id', currentUser.id)
      .maybeSingle();

    currentProfile = data || {};
  }

  function showAuthState() {
    const authPanel = $('authPanel');
    const loginForm = $('loginForm');
    const profileSection = $('profileSection');

    if (!authPanel) return;

    if (currentUser) {
      loginForm.style.display = 'none';
      profileSection.style.display = 'block';

      const displayName = currentProfile?.display_name || currentProfile?.full_name || currentUser.email.split('@')[0];
      $('displayUserName').textContent = displayName;
      $('displayUserEmail').textContent = currentUser.email;

      if (currentProfile?.avatar_url) {
        $('userAvatar').src = currentProfile.avatar_url;
        $('userAvatar').style.display = 'inline-block';
      }
    } else {
      loginForm.style.display = 'block';
      profileSection.style.display = 'none';
    }
  }

  async function signUp() {
    const email = $('signupEmail').value.trim();
    const password = $('signupPassword').value;
    const name = $('signupName').value.trim();

    if (!email || !password || !name) {
      alert('Please fill in all fields.');
      return;
    }

    const { data: signUpData, error } = await client.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: getEmailRedirectUrl()
      }
    });
    if (error) {
      alert(`Sign up failed: ${error.message}`);
      return;
    }

    // Upsert a profile row with the display name so it's available immediately
    if (signUpData?.user) {
      await client.from('profiles').upsert(
        { id: signUpData.user.id, email, full_name: name, display_name: name },
        { onConflict: 'id' }
      );
    }

    alert('Sign up successful! Check your email to confirm your account, then sign in.');
    $('signupEmail').value = '';
    $('signupPassword').value = '';
    $('signupName').value = '';
  }

  async function signIn() {
    const email = $('loginEmail').value.trim();
    const password = $('loginPassword').value;

    if (!email || !password) {
      alert('Please enter email and password.');
      return;
    }

    const { error } = await client.auth.signInWithPassword({ email, password });
    if (error) {
      alert(`Sign in failed: ${error.message}`);
      return;
    }

    $('loginEmail').value = '';
    $('loginPassword').value = '';
  }

  async function forgotPassword() {
    const email = $('loginEmail')?.value.trim();

    if (!email) {
      alert('Please enter your email address first.');
      return;
    }

    const { error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: getPasswordResetRedirectUrl()
    });

    if (error) {
      alert(`Reset email failed: ${error.message}`);
      return;
    }

    alert('Password reset email sent. Check your inbox for the reset link.');
  }

  async function signOut() {
    const { error } = await client.auth.signOut();
    if (error) {
      alert(`Sign out failed: ${error.message}`);
      return;
    }

    currentUser = null;
    currentProfile = null;
  }

  function wireAuthEvents() {
    const signUpTabBtn = $('signUpTabBtn');
    const signInTabBtn = $('signInTabBtn');
    const signUpForm = $('signUpForm');
    const signInForm = $('signInForm');
    const signUpSubmitBtn = $('signUpSubmitBtn');
    const signInSubmitBtn = $('signInSubmitBtn');
    const signOutBtn = $('signOutBtn');
    const editProfileBtn = $('editProfileBtn');
    const forgotPasswordBtn = $('forgotPasswordBtn');

    if (signUpTabBtn) {
      signUpTabBtn.addEventListener('click', () => {
        signUpForm.style.display = 'block';
        signInForm.style.display = 'none';
        signUpTabBtn.classList.add('active');
        signInTabBtn.classList.remove('active');
      });
    }

    if (signInTabBtn) {
      signInTabBtn.addEventListener('click', () => {
        signInForm.style.display = 'block';
        signUpForm.style.display = 'none';
        signInTabBtn.classList.add('active');
        signUpTabBtn.classList.remove('active');
      });
    }

    if (signUpSubmitBtn) {
      signUpSubmitBtn.addEventListener('click', signUp);
    }

    if (signInSubmitBtn) {
      signInSubmitBtn.addEventListener('click', signIn);
    }

    if (forgotPasswordBtn) {
      forgotPasswordBtn.addEventListener('click', forgotPassword);
    }

    if (signOutBtn) {
      signOutBtn.addEventListener('click', signOut);
    }

    if (editProfileBtn) {
      editProfileBtn.addEventListener('click', () => {
        window.location.href = 'profile.html';
      });
    }
  }

  function bootstrap() {
    if (initSupabase()) {
      checkAuthState();
      wireAuthEvents();
    }
  }

  document.addEventListener('DOMContentLoaded', bootstrap);
})();
