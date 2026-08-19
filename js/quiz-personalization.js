(function (global) {
  'use strict';

  var APPEARANCE_STORAGE_KEY = 'quiz_studio_appearance_preferences';
  var QUESTION_STATS_STORAGE_KEY = 'quiz_studio_question_success_counts';
  var authStatePromise = null;

  var DEFAULT_APPEARANCE = {
    theme: 'default',
    background: 'default'
  };

  var THEME_PRESETS = {
    default: {
      '--primary-color': '#6366f1',
      '--secondary-color': '#ec4899',
      '--light-bg': '#f8fafc',
      '--dark-text': '#1e293b',
      '--surface-background': '#ffffff',
      '--surface-shadow': '0 10px 40px rgba(0, 0, 0, 0.2)'
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
      '--primary-color': '#4f46e5',
      '--secondary-color': '#7c3aed',
      '--light-bg': '#e2e8f0',
      '--dark-text': '#1e293b',
      '--surface-background': '#ffffff',
      '--surface-shadow': '0 10px 45px rgba(15, 23, 42, 0.45)'
    }
  };

  var BACKGROUND_PRESETS = {
    default: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    sunrise: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
    aurora: 'linear-gradient(135deg, #0f766e 0%, #2563eb 100%)',
    meadow: 'linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)',
    night: 'linear-gradient(135deg, #0f172a 0%, #312e81 100%)'
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

  function getQuestionWeight(correctCount) {
    if (!correctCount || correctCount <= 1) return 1;
    return Math.max(0.15, 1 / (correctCount + 2));
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
    return sourceQuestions
      .map(function (question, index) {
        var key = getQuestionKey(subject, question);
        var correctCount = key ? (counts[key] || 0) : 0;
        var weight = getQuestionWeight(correctCount);
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

    var increments = {};
    questions.forEach(function (question, index) {
      if (!question || answers[index] !== question.answer) return;
      var key = getQuestionKey(subject, question);
      if (!key) return;
      increments[key] = (increments[key] || 0) + 1;
    });

    var incrementKeys = Object.keys(increments);
    if (incrementKeys.length === 0) return 0;

    var localCounts = readLocalQuestionStats();
    incrementKeys.forEach(function (key) {
      localCounts[key] = (localCounts[key] || 0) + increments[key];
    });
    writeLocalQuestionStats(localCounts);

    if (!global.FB_DB || !global.FB_AUTH) return incrementKeys.length;
    var user = await waitForCurrentUser();
    if (!user) return incrementKeys.length;

    try {
      var firestore = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');
      var userRef = firestore.doc(global.FB_DB, 'users', user.uid);
      await firestore.runTransaction(global.FB_DB, async function (tx) {
        var snap = await tx.get(userRef);
        var data = snap.exists() ? snap.data() : {};
        var remoteCounts = normalizeCounts(data.question_success_counts);
        incrementKeys.forEach(function (key) {
          remoteCounts[key] = (remoteCounts[key] || 0) + increments[key];
        });
        tx.set(userRef, { question_success_counts: remoteCounts }, { merge: true });
      });
    } catch (e) {
      console.warn('Could not update question success counts:', e);
    }

    return incrementKeys.length;
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
