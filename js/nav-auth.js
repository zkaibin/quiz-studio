/* global supabase, SUPABASE_CONFIG */
/**
 * nav-auth.js — Injects a fixed top-right user-auth widget on every page.
 *
 * Not logged in → shows "Sign In" button that opens a dropdown with
 *                 Sign In / Register tabs.
 * Logged in     → shows the user's display name; clicking opens a dropdown
 *                 with Edit Profile and Sign Out.
 */
(function () {
  'use strict';

  // ── Injected CSS ─────────────────────────────────────────────────────────
  var CSS = [
    '#qs-auth-widget{',
    '  position:fixed;top:14px;right:18px;z-index:9999;',
    '  font-family:"Segoe UI",Tahoma,Geneva,Verdana,sans-serif;',
    '}',
    '#qs-auth-btn{',
    '  display:flex;align-items:center;gap:7px;',
    '  padding:8px 16px;',
    '  background:rgba(255,255,255,0.18);',
    '  backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);',
    '  border:1px solid rgba(255,255,255,0.35);border-radius:24px;',
    '  color:#fff;font-size:0.92rem;font-weight:600;',
    '  cursor:pointer;transition:background 0.2s;white-space:nowrap;',
    '}',
    '#qs-auth-btn:hover{background:rgba(255,255,255,0.3);}',
    '#qs-auth-dropdown{',
    '  display:none;position:absolute;right:0;top:calc(100% + 8px);',
    '  background:#fff;border-radius:14px;',
    '  box-shadow:0 8px 32px rgba(0,0,0,0.18);',
    '  padding:20px;min-width:290px;color:#2c3e50;',
    '}',
    '#qs-auth-dropdown.open{display:block;}',
    '.qs-tabs{display:flex;border-bottom:2px solid #eee;margin-bottom:14px;}',
    '.qs-tab{',
    '  flex:1;padding:9px;background:none;border:none;',
    '  font-size:0.9rem;font-weight:600;color:#7f8c8d;',
    '  cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-2px;',
    '  transition:color 0.15s;',
    '}',
    '.qs-tab.active{color:#667eea;border-bottom-color:#667eea;}',
    '.qs-form{display:none;}',
    '.qs-form.active{display:block;}',
    '.qs-form input{',
    '  display:block;width:100%;padding:9px 12px;margin-bottom:9px;',
    '  border:1px solid #ddd;border-radius:7px;font-size:0.9rem;',
    '  box-sizing:border-box;',
    '}',
    '.qs-form input:focus{outline:none;border-color:#667eea;}',
    '.qs-submit-btn{',
    '  width:100%;padding:10px;',
    '  background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);',
    '  color:#fff;border:none;border-radius:8px;',
    '  font-weight:600;font-size:0.95rem;cursor:pointer;transition:opacity 0.2s;',
    '}',
    '.qs-submit-btn:hover{opacity:0.9;}',
    '.qs-submit-btn:disabled{opacity:0.6;cursor:not-allowed;}',
    '.qs-helper-row{display:flex;justify-content:flex-end;margin:2px 0 10px;}',
    '.qs-link-btn{background:none;border:none;padding:0;color:#667eea;font-size:0.82rem;cursor:pointer;text-decoration:underline;}',
    '.qs-link-btn:hover{opacity:0.85;}',
    '.qs-profile-header{',
    '  display:flex;align-items:center;gap:12px;',
    '  margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid #eee;',
    '}',
    '.qs-avatar{',
    '  width:42px;height:42px;border-radius:50%;flex-shrink:0;',
    '  background:linear-gradient(135deg,#667eea,#764ba2);',
    '  display:flex;align-items:center;justify-content:center;',
    '  color:#fff;font-size:1.1rem;font-weight:700;overflow:hidden;',
    '}',
    '.qs-avatar img{width:100%;height:100%;object-fit:cover;}',
    '.qs-profile-name{font-weight:600;font-size:0.97rem;}',
    '.qs-profile-email{font-size:0.8rem;color:#7f8c8d;}',
    '.qs-menu-btn{',
    '  display:block;width:100%;padding:9px 12px;text-align:left;',
    '  background:none;border:none;border-radius:7px;',
    '  font-size:0.9rem;cursor:pointer;transition:background 0.15s;',
    '  color:#2c3e50;margin-bottom:4px;',
    '}',
    '.qs-menu-btn:hover{background:#f4f6ff;}',
    '.qs-menu-btn.qs-danger{color:#e74c3c;}',
    '.qs-menu-btn.qs-danger:hover{background:#fff0f0;}',
    '.qs-msg{',
    '  font-size:0.82rem;margin-bottom:10px;padding:7px 10px;border-radius:6px;',
    '}',
    '.qs-msg.qs-error{background:#fff0f0;color:#e74c3c;}',
    '.qs-msg.qs-success{background:#f0fff4;color:#27ae60;}'
  ].join('\n');

  // ── Widget HTML ───────────────────────────────────────────────────────────
  var WIDGET_HTML = [
    '<button id="qs-auth-btn" aria-haspopup="true" aria-expanded="false">',
    '  <span id="qs-auth-icon">👤</span>',
    '  <span id="qs-auth-label">Sign In</span>',
    '  <span style="font-size:0.7em;opacity:0.75">▾</span>',
    '</button>',
    '<div id="qs-auth-dropdown" role="dialog" aria-label="Authentication">',
    '  <!-- Logged-out view -->',
    '  <div id="qs-logged-out">',
    '    <div class="qs-tabs">',
    '      <button class="qs-tab active" data-qs-tab="signin">Sign In</button>',
    '      <button class="qs-tab" data-qs-tab="register">Register</button>',
    '    </div>',
    '    <div id="qs-msg" class="qs-msg" style="display:none"></div>',
    '    <div class="qs-form active" data-qs-form="signin">',
    '      <input id="qs-login-email" type="email" placeholder="Email address" autocomplete="email" />',
    '      <input id="qs-login-password" type="password" placeholder="Password" autocomplete="current-password" />',
    '      <div class="qs-helper-row"><button type="button" class="qs-link-btn" id="qs-forgot-btn">Forgot password?</button></div>',
    '      <button class="qs-submit-btn" id="qs-signin-btn">Sign In</button>',
    '    </div>',
    '    <div class="qs-form" data-qs-form="register">',
    '      <input id="qs-signup-name" type="text" placeholder="Your name" autocomplete="name" />',
    '      <input id="qs-signup-email" type="email" placeholder="Email address" autocomplete="email" />',
    '      <input id="qs-signup-password" type="password" placeholder="Password (min 6 chars)" autocomplete="new-password" />',
    '      <button class="qs-submit-btn" id="qs-signup-btn">Create Account</button>',
    '    </div>',
    '  </div>',
    '  <!-- Logged-in view -->',
    '  <div id="qs-logged-in" style="display:none">',
    '    <div class="qs-profile-header">',
    '      <div class="qs-avatar" id="qs-avatar-circle"></div>',
    '      <div>',
    '        <div class="qs-profile-name" id="qs-profile-name"></div>',
    '        <div class="qs-profile-email" id="qs-profile-email"></div>',
    '      </div>',
    '    </div>',
    '    <button class="qs-menu-btn" id="qs-profile-btn">✏️ Edit Profile</button>',
    '    <button class="qs-menu-btn" id="qs-records-btn">📋 My Quiz Records</button>',
    '    <button class="qs-menu-btn qs-danger" id="qs-signout-btn">🚪 Sign Out</button>',
    '  </div>',
    '</div>'
  ].join('\n');

  // ── State ─────────────────────────────────────────────────────────────────
  var client = null;
  var currentUser = null;
  var currentProfile = null;

  // ── DOM helpers ───────────────────────────────────────────────────────────
  function $(id) { return document.getElementById(id); }

  function injectStyles() {
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  function injectWidget() {
    var widget = document.createElement('div');
    widget.id = 'qs-auth-widget';
    widget.innerHTML = WIDGET_HTML;
    document.body.appendChild(widget);
  }

  // ── Supabase init ─────────────────────────────────────────────────────────
  function initSupabase() {
    if (window.SUPABASE_CLIENT) {
      client = window.SUPABASE_CLIENT;
      return true;
    }
    if (window.SUPABASE_CONFIG && window.supabase && window.supabase.createClient) {
      client = window.supabase.createClient(
        window.SUPABASE_CONFIG.url,
        window.SUPABASE_CONFIG.anonKey
      );
      window.SUPABASE_CLIENT = client;
      return true;
    }
    return false;
  }

  async function loadProfile() {
    if (!client || !currentUser) return;
    try {
      var result = await client
        .from('profiles')
        .select('full_name, display_name, avatar_url')
        .eq('id', currentUser.id)
        .maybeSingle();
      currentProfile = result.data || {};
    } catch (e) {
      currentProfile = {};
    }
  }

  function getDisplayName() {
    if (!currentUser) return 'Guest';
    return (
      (currentProfile && currentProfile.display_name) ||
      (currentProfile && currentProfile.full_name) ||
      (currentUser.user_metadata && currentUser.user_metadata.full_name) ||
      (currentUser.email && currentUser.email.split('@')[0]) ||
      'User'
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────
  function renderWidget() {
    var label = $('qs-auth-label');
    var loggedOut = $('qs-logged-out');
    var loggedIn = $('qs-logged-in');
    if (!label) return;

    if (currentUser) {
      var name = getDisplayName();
      label.textContent = name;
      loggedOut.style.display = 'none';
      loggedIn.style.display = 'block';
      $('qs-profile-name').textContent = name;
      $('qs-profile-email').textContent = currentUser.email;

      var avatarEl = $('qs-avatar-circle');
      if (currentProfile && currentProfile.avatar_url) {
        var img = document.createElement('img');
        img.setAttribute('src', currentProfile.avatar_url);
        img.setAttribute('alt', 'avatar');
        avatarEl.innerHTML = '';
        avatarEl.appendChild(img);
      } else {
        avatarEl.textContent = name.charAt(0).toUpperCase();
      }
    } else {
      label.textContent = 'Sign In';
      loggedOut.style.display = 'block';
      loggedIn.style.display = 'none';
    }
  }

  // ── Message helpers ───────────────────────────────────────────────────────
  function showMsg(text, type) {
    var el = $('qs-msg');
    if (!el) return;
    el.textContent = text;
    el.className = 'qs-msg qs-' + type;
    el.style.display = 'block';
  }

  function clearMsg() {
    var el = $('qs-msg');
    if (el) { el.style.display = 'none'; el.textContent = ''; }
  }

  function getEmailRedirectUrl() {
    return new URL('auth-callback.html', window.location.href).href;
  }

  function getPasswordResetRedirectUrl() {
    return new URL('reset-password.html', window.location.href).href;
  }

  // ── Auth actions ──────────────────────────────────────────────────────────
  async function doSignIn() {
    if (!client) { showMsg('Authentication service not available.', 'error'); return; }
    var email = $('qs-login-email').value.trim();
    var password = $('qs-login-password').value;
    if (!email || !password) { showMsg('Please enter email and password.', 'error'); return; }
    clearMsg();
    var btn = $('qs-signin-btn');
    btn.disabled = true;
    btn.textContent = 'Signing in…';
    var result = await client.auth.signInWithPassword({ email: email, password: password });
    btn.disabled = false;
    btn.textContent = 'Sign In';
    if (result.error) { showMsg(result.error.message, 'error'); return; }
    $('qs-login-email').value = '';
    $('qs-login-password').value = '';
    closeDropdown();
  }

  async function doSignUp() {
    if (!client) { showMsg('Authentication service not available.', 'error'); return; }
    var name = $('qs-signup-name').value.trim();
    var email = $('qs-signup-email').value.trim();
    var password = $('qs-signup-password').value;
    if (!name || !email || !password) { showMsg('Please fill in all fields.', 'error'); return; }
    clearMsg();
    var btn = $('qs-signup-btn');
    btn.disabled = true;
    btn.textContent = 'Creating account…';
    var result = await client.auth.signUp({
      email: email,
      password: password,
      options: {
        data: { full_name: name },
        emailRedirectTo: getEmailRedirectUrl()
      }
    });
    btn.disabled = false;
    btn.textContent = 'Create Account';
    if (result.error) { showMsg(result.error.message, 'error'); return; }
    if (result.data && result.data.user) {
      await client.from('profiles').upsert(
        { id: result.data.user.id, email: email, full_name: name, display_name: name },
        { onConflict: 'id' }
      );
    }
    showMsg('Account created! Check your email to confirm, then sign in.', 'success');
    $('qs-signup-name').value = '';
    $('qs-signup-email').value = '';
    $('qs-signup-password').value = '';
  }

  async function doForgotPassword() {
    if (!client) { showMsg('Authentication service not available.', 'error'); return; }
    var email = $('qs-login-email').value.trim();
    if (!email) { showMsg('Enter your email address first, then click Forgot password.', 'error'); return; }
    clearMsg();
    var result = await client.auth.resetPasswordForEmail(email, {
      redirectTo: getPasswordResetRedirectUrl()
    });
    if (result.error) { showMsg(result.error.message, 'error'); return; }
    showMsg('Password reset email sent. Check your inbox for the reset link.', 'success');
  }

  async function doSignOut() {
    if (!client) return;
    await client.auth.signOut();
    currentUser = null;
    currentProfile = null;
    renderWidget();
    closeDropdown();
  }

  // ── Dropdown toggle ───────────────────────────────────────────────────────
  function openDropdown() {
    var dd = $('qs-auth-dropdown');
    var btn = $('qs-auth-btn');
    if (dd) { dd.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
  }

  function closeDropdown() {
    var dd = $('qs-auth-dropdown');
    var btn = $('qs-auth-btn');
    if (dd) { dd.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
  }

  function toggleDropdown() {
    var dd = $('qs-auth-dropdown');
    if (dd && dd.classList.contains('open')) closeDropdown();
    else openDropdown();
  }

  // ── Event wiring ──────────────────────────────────────────────────────────
  function wireEvents() {
    var authBtn = $('qs-auth-btn');
    if (authBtn) {
      authBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleDropdown();
      });
    }

    // Close on outside click
    document.addEventListener('click', function (e) {
      var widget = $('qs-auth-widget');
      if (widget && !widget.contains(e.target)) closeDropdown();
    });

    // Tab switching
    var tabs = document.querySelectorAll('#qs-auth-dropdown .qs-tab');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var tabName = tab.getAttribute('data-qs-tab');
        var allowedTabs = ['signin', 'register'];
        if (allowedTabs.indexOf(tabName) === -1) return;
        document.querySelectorAll('#qs-auth-dropdown .qs-tab').forEach(function (t) {
          t.classList.remove('active');
        });
        document.querySelectorAll('#qs-auth-dropdown .qs-form').forEach(function (f) {
          f.classList.remove('active');
        });
        tab.classList.add('active');
        var form = document.querySelector('.qs-form[data-qs-form="' + tabName + '"]');
        if (form) form.classList.add('active');
        clearMsg();
      });
    });

    // Enter-key support
    var loginPassword = $('qs-login-password');
    if (loginPassword) loginPassword.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') doSignIn();
    });
    var loginEmail = $('qs-login-email');
    if (loginEmail) loginEmail.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') doSignIn();
    });
    var signupPassword = $('qs-signup-password');
    if (signupPassword) signupPassword.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') doSignUp();
    });

    var signinBtn = $('qs-signin-btn');
    if (signinBtn) signinBtn.addEventListener('click', doSignIn);

    var forgotBtn = $('qs-forgot-btn');
    if (forgotBtn) forgotBtn.addEventListener('click', doForgotPassword);

    var signupBtn = $('qs-signup-btn');
    if (signupBtn) signupBtn.addEventListener('click', doSignUp);

    var signoutBtn = $('qs-signout-btn');
    if (signoutBtn) signoutBtn.addEventListener('click', doSignOut);

    var profileBtn = $('qs-profile-btn');
    if (profileBtn) profileBtn.addEventListener('click', function () {
      window.location.href = 'profile.html';
    });

    var recordsBtn = $('qs-records-btn');
    if (recordsBtn) recordsBtn.addEventListener('click', function () {
      window.location.href = 'quiz-records.html';
    });
  }

  // ── Auth state ────────────────────────────────────────────────────────────
  async function checkAuthState() {
    if (!client) return;
    var result = await client.auth.getSession();
    currentUser = (result.data.session && result.data.session.user) || null;
    if (currentUser) await loadProfile();
    renderWidget();

    client.auth.onAuthStateChange(async function (_event, session) {
      currentUser = (session && session.user) || null;
      if (currentUser) await loadProfile();
      else currentProfile = null;
      renderWidget();
    });
  }

  // ── Bootstrap ─────────────────────────────────────────────────────────────
  async function bootstrap() {
    injectStyles();
    injectWidget();
    wireEvents();
    if (initSupabase()) {
      await checkAuthState();
    } else {
      renderWidget(); // shows "Sign In" or "Guest" without Supabase
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
