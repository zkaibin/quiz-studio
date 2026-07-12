/* global FB_AUTH, FB_DB */
(function () {
  'use strict';

  var auth = null;
  var db = null;
  var currentUser = null;
  var currentProfile = null;

  var $ = function (id) { return document.getElementById(id); };

  function initFirebase() {
    if (!window.FB_AUTH || !window.FB_DB) {
      console.warn('Firebase config not loaded.');
      return false;
    }
    auth = window.FB_AUTH;
    db = window.FB_DB;
    return true;
  }

  async function checkAuthState() {
    if (!auth) return;
    var { onAuthStateChanged } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js');
    onAuthStateChanged(auth, async function (user) {
      currentUser = user || null;
      if (currentUser) await loadProfile();
      showAuthState();
    });
  }

  async function loadProfile() {
    if (!db || !currentUser) return;
    var { getDoc, doc } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');
    var snap = await getDoc(doc(db, 'users', currentUser.uid));
    currentProfile = snap.exists() ? snap.data() : {};
  }

  function showAuthState() {
    var authPanel = $('authPanel');
    var loginForm = $('loginForm');
    var profileSection = $('profileSection');

    if (!authPanel || !loginForm || !profileSection) return;

    if (currentUser) {
      loginForm.style.display = 'none';
      profileSection.style.display = 'block';

      var displayName =
        (currentProfile && currentProfile.display_name) ||
        (currentProfile && currentProfile.full_name) ||
        currentUser.displayName ||
        (currentUser.email && currentUser.email.split('@')[0]) ||
        'User';

      $('displayUserName').textContent = displayName;
      $('displayUserEmail').textContent = currentUser.email || '';

      if (currentProfile && currentProfile.avatar_url && $('userAvatar')) {
        $('userAvatar').src = currentProfile.avatar_url;
        $('userAvatar').style.display = 'inline-block';
      }
    } else {
      loginForm.style.display = 'block';
      profileSection.style.display = 'none';
    }
  }

  async function signUp() {
    var email = $('signupEmail').value.trim();
    var password = $('signupPassword').value;
    var name = $('signupName').value.trim();

    if (!email || !password || !name) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      var { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } =
        await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js');
      var { doc, setDoc } =
        await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');

      var cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });
      await setDoc(doc(db, 'users', cred.user.uid), {
        email: email,
        full_name: name,
        display_name: name,
        total_points: 0,
        total_quizzes: 0,
        created_at: new Date().toISOString()
      }, { merge: true });
      await sendEmailVerification(cred.user);

      alert('Sign up successful! Check your email to verify your account, then sign in.');
      $('signupEmail').value = '';
      $('signupPassword').value = '';
      $('signupName').value = '';
    } catch (error) {
      alert('Sign up failed: ' + error.message);
    }
  }

  async function signIn() {
    var email = $('loginEmail').value.trim();
    var password = $('loginPassword').value;

    if (!email || !password) {
      alert('Please enter email and password.');
      return;
    }

    try {
      var { signInWithEmailAndPassword } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js');
      await signInWithEmailAndPassword(auth, email, password);
      $('loginEmail').value = '';
      $('loginPassword').value = '';
    } catch (error) {
      alert('Sign in failed: ' + error.message);
    }
  }

  async function forgotPassword() {
    var email = $('loginEmail') ? $('loginEmail').value.trim() : '';

    if (!email) {
      alert('Please enter your email address first.');
      return;
    }

    try {
      var { sendPasswordResetEmail } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js');
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent. Check your inbox for the reset link.');
    } catch (error) {
      alert('Reset email failed: ' + error.message);
    }
  }

  async function signOut() {
    try {
      var { signOut: fbSignOut } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js');
      await fbSignOut(auth);
      currentUser = null;
      currentProfile = null;
    } catch (error) {
      alert('Sign out failed: ' + error.message);
    }
  }

  function wireAuthEvents() {
    var signUpTabBtn = $('signUpTabBtn');
    var signInTabBtn = $('signInTabBtn');
    var signUpForm = $('signUpForm');
    var signInForm = $('signInForm');
    var signUpSubmitBtn = $('signUpSubmitBtn');
    var signInSubmitBtn = $('signInSubmitBtn');
    var signOutBtn = $('signOutBtn');
    var editProfileBtn = $('editProfileBtn');
    var forgotPasswordBtn = $('forgotPasswordBtn');

    if (signUpTabBtn) {
      signUpTabBtn.addEventListener('click', function () {
        signUpForm.style.display = 'block';
        signInForm.style.display = 'none';
        signUpTabBtn.classList.add('active');
        signInTabBtn.classList.remove('active');
      });
    }

    if (signInTabBtn) {
      signInTabBtn.addEventListener('click', function () {
        signInForm.style.display = 'block';
        signUpForm.style.display = 'none';
        signInTabBtn.classList.add('active');
        signUpTabBtn.classList.remove('active');
      });
    }

    if (signUpSubmitBtn) signUpSubmitBtn.addEventListener('click', signUp);
    if (signInSubmitBtn) signInSubmitBtn.addEventListener('click', signIn);
    if (forgotPasswordBtn) forgotPasswordBtn.addEventListener('click', forgotPassword);
    if (signOutBtn) signOutBtn.addEventListener('click', signOut);
    if (editProfileBtn) {
      editProfileBtn.addEventListener('click', function () {
        window.location.href = 'profile.html';
      });
    }
  }

  function bootstrap() {
    if (initFirebase()) {
      checkAuthState();
      wireAuthEvents();
    }
  }

  document.addEventListener('DOMContentLoaded', bootstrap);
})();
