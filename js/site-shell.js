/**
 * Shared site chrome: top navigation + brand mark for product pages.
 */
(function (global) {
  'use strict';

  var LINKS = [
    { href: 'index.html', label: 'Home' },
    { href: 'quiz.html', label: 'Math' },
    { href: 'science-quiz.html', label: 'Science' },
    { href: 'english-quiz.html', label: 'English' },
    { href: 'chinese-quiz.html', label: 'Chinese' },
    { href: 'games.html', label: 'Games' },
    { href: 'daily-challenge.html', label: 'Daily' },
    { href: 'leaderboard.html', label: 'Leaderboard' },
    { href: 'dashboard.html', label: 'Dashboard', auth: true },
    { href: 'profile.html', label: 'Profile', auth: true }
  ];

  // Fullscreen / WebGL game pages manage their own chrome.
  var SKIP_SHELL = {
    'city-driving.html': true,
    'car-racing.html': true,
    'driving-sim.html': true,
    'monster-siege.html': true,
    'rubiks-cube.html': true
  };

  function currentPage() {
    var path = (global.location && global.location.pathname) || '';
    var parts = path.split('/');
    return parts[parts.length - 1] || 'index.html';
  }

  function injectShell() {
    if (document.getElementById('qsSiteNav')) return;
    var page = currentPage();
    if (SKIP_SHELL[page] || document.body.classList.contains('no-site-shell')) return;
    var nav = document.createElement('nav');
    nav.id = 'qsSiteNav';
    nav.className = 'qs-site-nav';
    nav.setAttribute('aria-label', 'Primary');

    var brand = document.createElement('a');
    brand.className = 'qs-brand';
    brand.href = 'index.html';
    brand.innerHTML = '<span class="qs-brand-mark" aria-hidden="true"></span><span class="qs-brand-text">Quiz Studio</span>';
    nav.appendChild(brand);

    var list = document.createElement('div');
    list.className = 'qs-site-links';
    LINKS.forEach(function (link) {
      var a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.label;
      if (link.auth) a.setAttribute('data-auth-only', 'true');
      if (link.href === page) {
        a.setAttribute('aria-current', 'page');
        a.classList.add('is-active');
      }
      list.appendChild(a);
    });
    nav.appendChild(list);
    document.body.insertBefore(nav, document.body.firstChild);
    document.body.classList.add('has-site-nav');

    syncAuthLinks(false);
    waitForAuth();
  }

  function syncAuthLinks(hasSession) {
    document.querySelectorAll('[data-auth-only="true"]').forEach(function (el) {
      el.style.display = hasSession ? '' : 'none';
    });
  }

  async function waitForAuth() {
    if (!global.FB_AUTH) {
      syncAuthLinks(false);
      return;
    }
    try {
      var authModule = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js');
      authModule.onAuthStateChanged(global.FB_AUTH, function (user) {
        syncAuthLinks(!!user);
      });
    } catch (e) {
      syncAuthLinks(!!(global.FB_AUTH && global.FB_AUTH.currentUser));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectShell);
  } else {
    injectShell();
  }

  global.QuizSiteShell = { inject: injectShell };
})(window);
