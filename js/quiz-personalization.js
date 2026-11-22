(function (global) {
  'use strict';

  var APPEARANCE_STORAGE_KEY = 'quiz_studio_appearance_preferences';
  var QUESTION_STATS_STORAGE_KEY = 'quiz_studio_question_success_counts';
  var QUESTION_ATTEMPTS_STORAGE_KEY = 'quiz_studio_question_attempt_counts';
  var authStatePromise = null;

  var DEFAULT_APPEARANCE = {
    theme: 'default',
    background: 'default'
  };

  var THEME_PRESETS = {
    default: {
      '--primary-color': '#0f766e',
      '--secondary-color': '#e25c3d',
      '--light-bg': '#f3faf8',
      '--dark-text': '#0b2a3a',
      '--surface-background': '#ffffff',
      '--surface-shadow': '0 18px 50px rgba(8, 51, 68, 0.22)'
    },
    ocean: {
      '--primary-color': '#0f766e',
      '--secondary-color': '#0284c7',
      '--light-bg': '#ecfeff',
      '--dark-text': '#164e63',
      '--surface-background': '#ffffff',
      '--surface-shadow': '0 10px 38px rgba(15, 118, 110, 0.18)'
    },
    sunset: {
      '--primary-color': '#ea580c',
      '--secondary-color': '#db2777',
      '--light-bg': '#fff7ed',
      '--dark-text': '#7c2d12',
      '--surface-background': '#ffffff',
      '--surface-shadow': '0 10px 38px rgba(234, 88, 12, 0.18)'
    },
    forest: {
      '--primary-color': '#15803d',
      '--secondary-color': '#65a30d',
      '--light-bg': '#f0fdf4',
      '--dark-text': '#14532d',
      '--surface-background': '#ffffff',
      '--surface-shadow': '0 10px 38px rgba(21, 128, 61, 0.18)'
    },
    midnight: {
      '--primary-color': '#0f766e',
      '--secondary-color': '#334155',
      '--light-bg': '#e2e8f0',
      '--dark-text': '#0f172a',
      '--surface-background': '#ffffff',
      '--surface-shadow': '0 10px 45px rgba(15, 23, 42, 0.45)'
    }
  };

  var BACKGROUND_PRESETS = {
    default: 'radial-gradient(circle at 12% 18%, rgba(20, 184, 166, 0.22), transparent 36%), radial-gradient(circle at 88% 8%, rgba(226, 92, 61, 0.16), transparent 28%), linear-gradient(160deg, #083344 0%, #0f766e 48%, #115e59 100%)',
    sunrise: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
    aurora: 'linear-gradient(135deg, #0f766e 0%, #2563eb 100%)',
    meadow: 'linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)',
    night: 'linear-gradient(135deg, #0f172a 0%, #134e4a 100%)'
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function safeParse(raw, fallback) {
    if (!raw) return clone(fallback);
    try {
      return JSON.parse(raw);
    } catch (e) {
      return clone(fallback);
    }
  }

  function normalizeAppearance(preferences) {
    var normalized = preferences || {};
    var theme = THEME_PRESETS[normalized.theme] ? normalized.theme : DEFAULT_APPEARANCE.theme;
    var background = BACKGROUND_PRESETS[normalized.background] ? normalized.background : DEFAULT_APPEARANCE.background;
    return { theme: theme, background: background };
  }

  function normalizeCounts(counts) {
    var normalized = {};
    var source = counts || {};
    Object.keys(source).forEach(function (key) {
      var value = parseInt(source[key], 10);
      if (!isNaN(value) && value > 0) {
        normalized[key] = value;
      }
    });
    return normalized;
  }

  function readLocalAppearance() {
    return normalizeAppearance(safeParse(global.localStorage && global.localStorage.getItem(APPEARANCE_STORAGE_KEY), DEFAULT_APPEARANCE));
  }

  function cacheAppearancePreferences(preferences) {
    var normalized = normalizeAppearance(preferences);
    if (global.localStorage) {
      global.localStorage.setItem(APPEARANCE_STORAGE_KEY, JSON.stringify(normalized));
    }
    return normalized;
  }

  function getAppearancePreferences() {
    return readLocalAppearance();
  }

  function applyAppearance(preferences) {
    if (!global.document || !global.document.documentElement) return normalizeAppearance(preferences);
    var normalized = normalizeAppearance(preferences);
    var rootStyle = global.document.documentElement.style;
    var themePreset = THEME_PRESETS[normalized.theme];
    Object.keys(themePreset).forEach(function (key) {
      rootStyle.setProperty(key, themePreset[key]);
    });
    rootStyle.setProperty('--body-background', BACKGROUND_PRESETS[normalized.background]);
    return normalized;
  }

  function readLocalQuestionStats() {
    return normalizeCounts(safeParse(global.localStorage && global.localStorage.getItem(QUESTION_STATS_STORAGE_KEY), {}));
  }

  function writeLocalQuestionStats(counts) {
    var normalized = normalizeCounts(counts);
    if (global.localStorage) {
      global.localStorage.setItem(QUESTION_STATS_STORAGE_KEY, JSON.stringify(normalized));
    }
    return normalized;
  }

  function readLocalAttemptStats() {
    return normalizeCounts(safeParse(global.localStorage && global.localStorage.getItem(QUESTION_ATTEMPTS_STORAGE_KEY), {}));
  }

  function writeLocalAttemptStats(counts) {
    var normalized = normalizeCounts(counts);
    if (global.localStorage) {
      global.localStorage.setItem(QUESTION_ATTEMPTS_STORAGE_KEY, JSON.stringify(normalized));
    }
    return normalized;
  }

  function mergeCounts(baseCounts, extraCounts) {
    var merged = {};
    var base = normalizeCounts(baseCounts);
    var extra = normalizeCounts(extraCounts);
    Object.keys(base).forEach(function (key) { merged[key] = base[key]; });
    Object.keys(extra).forEach(function (key) {
      merged[key] = Math.max(merged[key] || 0, extra[key]);
    });
    return merged;
  }

  async function waitForCurrentUser() {
    if (!global.FB_AUTH) return null;
    if (global.FB_AUTH.currentUser) return global.FB_AUTH.currentUser;
    if (!authStatePromise) {
      authStatePromise = import('https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js')
        .then(function (authModule) {
          return new Promise(function (resolve) {
            var unsubscribe = authModule.onAuthStateChanged(global.FB_AUTH, function (user) {
              unsubscribe();
              resolve(user || null);
            }, function () {
              resolve(null);
            });
          });
        })
        .catch(function () {
          return null;
        })
        .finally(function () {
          authStatePromise = null;
        });
    }
    return authStatePromise;
  }

  async function getUserDocData() {
    if (!global.FB_DB || !global.FB_AUTH) return null;
    var user = await waitForCurrentUser();
    if (!user) return null;
    try {
      var firestore = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');
      var snap = await firestore.getDoc(firestore.doc(global.FB_DB, 'users', user.uid));
      return snap.exists() ? snap.data() : null;
    } catch (e) {
      return null;
    }
  }

  async function loadAppearancePreferences() {
    var localPrefs = readLocalAppearance();
    applyAppearance(localPrefs);
    var userData = await getUserDocData();
    if (!userData || !userData.appearance_preferences) return localPrefs;
    var remotePrefs = normalizeAppearance(userData.appearance_preferences);
    cacheAppearancePreferences(remotePrefs);
    applyAppearance(remotePrefs);
    return remotePrefs;
  }

  async function saveAppearancePreferences(preferences) {
    var normalized = cacheAppearancePreferences(preferences);
    applyAppearance(normalized);
    if (!global.FB_DB || !global.FB_AUTH) return normalized;
    var user = await waitForCurrentUser();
    if (!user) return normalized;
    try {
      var firestore = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');
      await firestore.setDoc(
        firestore.doc(global.FB_DB, 'users', user.uid),
        {
          appearance_preferences: normalized,
          updated_at: new Date().toISOString()
        },
        { merge: true }
      );
    } catch (e) {
      console.warn('Could not save appearance preferences:', e);
    }
    return normalized;
  }

  function getQuestionKey(subject, question) {
    if (!subject || !question || question.id === undefined || question.id === null) return null;
    return String(subject) + ':' + String(question.id);
  }

  function getQuestionWeight(correctCount, attemptCount) {
    // Down-weight mastered items; boost items seen but frequently missed.
    var correct = correctCount || 0;
    var attempts = attemptCount || 0;
    var misses = Math.max(0, attempts - correct);
    if (misses > 0 && correct === 0) return 2.4;
    if (misses > correct) return 1.8;
    if (!correct || correct <= 1) return 1;
    return Math.max(0.15, 1 / (correct + 2));
  }

  function getRandomUnit() {
    if (global.crypto && typeof global.crypto.getRandomValues === 'function') {
      var values = new Uint32Array(1);
      global.crypto.getRandomValues(values);
      return (values[0] + 1) / 4294967297;
    }
    return Math.max(Math.random(), Number.MIN_VALUE);
  }

  async function loadQuestionSuccessCounts() {
    var localCounts = readLocalQuestionStats();
    var userData = await getUserDocData();
    if (!userData || !userData.question_success_counts) return localCounts;
    var merged = mergeCounts(localCounts, userData.question_success_counts);
    writeLocalQuestionStats(merged);
    return merged;
  }

  async function getPrioritizedQuestions(subject, questions) {
    var sourceQuestions = Array.isArray(questions) ? questions.slice() : [];
    if (sourceQuestions.length <= 1) return sourceQuestions;
    var counts = await loadQuestionSuccessCounts();
    var attempts = readLocalAttemptStats();
    return sourceQuestions
      .map(function (question, index) {
        var key = getQuestionKey(subject, question);
        var correctCount = key ? (counts[key] || 0) : 0;
        var attemptCount = key ? (attempts[key] || 0) : 0;
        var weight = getQuestionWeight(correctCount, attemptCount);
        return {
          question: question,
          index: index,
          rank: -Math.log(getRandomUnit()) / weight
        };
      })
      .sort(function (a, b) {
        if (a.rank !== b.rank) return a.rank - b.rank;
        return a.index - b.index;
      })
      .map(function (entry) { return entry.question; });
  }

  async function recordQuestionResults(subject, questions, answers) {
    if (!Array.isArray(questions) || !Array.isArray(answers) || !subject) return 0;

    var successIncrements = {};
    var attemptIncrements = {};
    questions.forEach(function (question, index) {
      if (!question) return;
      var key = getQuestionKey(subject, question);
      if (!key) return;
      attemptIncrements[key] = (attemptIncrements[key] || 0) + 1;
      if (answers[index] === question.answer) {
        successIncrements[key] = (successIncrements[key] || 0) + 1;
      }
    });

    var attemptKeys = Object.keys(attemptIncrements);
    if (attemptKeys.length === 0) return 0;

    var localCounts = readLocalQuestionStats();
    Object.keys(successIncrements).forEach(function (key) {
      localCounts[key] = (localCounts[key] || 0) + successIncrements[key];
    });
    writeLocalQuestionStats(localCounts);

    var localAttempts = readLocalAttemptStats();
    attemptKeys.forEach(function (key) {
      localAttempts[key] = (localAttempts[key] || 0) + attemptIncrements[key];
    });
    writeLocalAttemptStats(localAttempts);

    if (!global.FB_DB || !global.FB_AUTH) return attemptKeys.length;
    var user = await waitForCurrentUser();
    if (!user) return attemptKeys.length;

    try {
      var firestore = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');
      var userRef = firestore.doc(global.FB_DB, 'users', user.uid);
      await firestore.runTransaction(global.FB_DB, async function (tx) {
        var snap = await tx.get(userRef);
        var data = snap.exists() ? snap.data() : {};
        var remoteCounts = normalizeCounts(data.question_success_counts);
        var remoteAttempts = normalizeCounts(data.question_attempt_counts);
        Object.keys(successIncrements).forEach(function (key) {
          remoteCounts[key] = (remoteCounts[key] || 0) + successIncrements[key];
        });
        attemptKeys.forEach(function (key) {
          remoteAttempts[key] = (remoteAttempts[key] || 0) + attemptIncrements[key];
        });
        tx.set(userRef, {
          question_success_counts: remoteCounts,
          question_attempt_counts: remoteAttempts
        }, { merge: true });
      });
    } catch (e) {
      console.warn('Could not update question success counts:', e);
    }

    return attemptKeys.length;
  }

  function initializeAppearance() {
    applyAppearance(readLocalAppearance());
    setTimeout(function () {
      loadAppearancePreferences().catch(function () {});
    }, 0);
  }

  global.QuizPersonalization = {
    DEFAULT_APPEARANCE: clone(DEFAULT_APPEARANCE),
    THEME_PRESETS: clone(THEME_PRESETS),
    BACKGROUND_PRESETS: clone(BACKGROUND_PRESETS),
    applyAppearance: applyAppearance,
    getAppearancePreferences: getAppearancePreferences,
    cacheAppearancePreferences: cacheAppearancePreferences,
    loadAppearancePreferences: loadAppearancePreferences,
    saveAppearancePreferences: saveAppearancePreferences,
    loadQuestionSuccessCounts: loadQuestionSuccessCounts,
    getPrioritizedQuestions: getPrioritizedQuestions,
    recordQuestionResults: recordQuestionResults,
    getQuestionWeight: getQuestionWeight
  };

  initializeAppearance();
})(window);
