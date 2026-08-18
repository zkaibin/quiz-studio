/* global window */
/**
 * daily-challenge.js — Daily Challenge module for Quiz Studio
 *
 * Rules:
 *  - Each logged-in user may take 1 daily challenge per subject per calendar day.
 *  - Difficulty tiers: easy (5 Q), intermediate (10 Q), advanced (15 Q).
 *  - Perfect score (100%) earns 10× the normal point total for that quiz size.
 *  - Non-perfect score earns normal points (1 pt/correct + size bonus).
 *  - Completing 7 consecutive days of daily challenges for a subject earns
 *    1 000 bonus points for that subject (tracked per subject independently).
 *
 * Firestore layout
 *  daily_challenges/{uid}_{subject}_{YYYY-MM-DD}
 *    user_id, subject, date, difficulty, score, total_questions,
 *    points_earned, perfect, streak_at_save, completed_at
 *
 *  users/{uid}  (merged fields)
 *    {subject}_streak          : number  — current consecutive-day streak
 *    {subject}_streak_last_date: string  — YYYY-MM-DD of last completed challenge
 */

(function (global) {
  'use strict';

  var SUBJECTS = ['math', 'science', 'english', 'chinese'];

  var DIFFICULTY_Q_COUNT = { easy: 5, intermediate: 10, advanced: 15 };

  /* Normal bonus map (matches rewards.js) */
  var BONUS_MAP = { 5: 3, 10: 8, 15: 15 };

  /* JSON data sources per subject */
  var SUBJECT_DATA_FILES = {
    math: [
      'data/questions-p1-p2.json',
      'data/questions-p3-p4.json',
      'data/questions-p5-p6.json',
      'data/questions-psle.json',
      'data/questions-challenging.json'
    ],
    science: [
      'data/questions-science.json',
      'data/questions-science-p6.json'
    ],
    english: ['data/questions-english.json'],
    chinese: ['data/questions-chinese.json']
  };

  /**
   * For each school level, the set of question difficulty values that are
   * appropriate.  Questions whose difficulty is not in the set are excluded
   * when a user level is known.  Null means "no filter" (guest / unset).
   */
  var LEVEL_ALLOWED_DIFFICULTIES = {
    'P1-P2': ['P1-P2'],
    'P3-P4': ['P1-P2', 'P3-P4'],
    'P5-P6': ['P1-P2', 'P3-P4', 'P5-P6'],
    'PSLE':  ['P1-P2', 'P3-P4', 'P5-P6', 'PSLE', 'Challenging']
  };

  /* Fallback names used only when no theme data is available */
  var PLACEHOLDER_NAMES = ['Alex', 'Ben', 'Chloe', 'David', 'Emma'];

  /* Cached theme data (loaded once per page session) */
  var _themeData = null; // { universes: [], characters: [] }

  /* ------------------------------------------------------------------ */
  /* Theme / character helpers                                            */
  /* ------------------------------------------------------------------ */

  /** Fetch and cache universes + characters JSON files */
  async function loadThemeData() {
    if (_themeData) return _themeData;
    try {
      var ts = new Date().getTime();
      var [univResp, charResp] = await Promise.all([
        fetch('data/universes.json?v=' + ts),
        fetch('data/characters.json?v=' + ts)
      ]);
      var universes = univResp.ok ? await univResp.json() : [];
      var characters = charResp.ok ? await charResp.json() : [];
      _themeData = { universes: universes, characters: characters };
    } catch (e) {
      console.warn('Could not load theme data:', e);
      _themeData = { universes: [], characters: [] };
    }
    return _themeData;
  }

  function getRandomIndex(max) {
    if (!max || max <= 0) return 0;
    var cryptoObj = global.crypto || global.msCrypto;
    if (!cryptoObj || typeof cryptoObj.getRandomValues !== 'function') {
      throw new Error('Secure randomness unavailable');
    }
    var values = new Uint32Array(1);
    cryptoObj.getRandomValues(values);
    return values[0] % max;
  }

  /**
   * Pick a random universe from the loaded theme data.
   * Returns the universe object, or null if none available.
   */
  function pickRandomUniverse(universes) {
    if (!universes || universes.length === 0) return null;
    return universes[getRandomIndex(universes.length)];
  }

  /**
   * Assign characters to placeholder roles for a given universe.
   * Mirrors the logic in quiz.js assignCharactersToRoles().
   * @param {string[]} roles        – e.g. ['protagonist', 'helper']
   * @param {number}   universeId   – universe_id to filter characters by
   * @param {object[]} allCharacters
   * @returns {string[]}            – parallel array of character names
   */
  function assignCharactersToRoles(roles, universeId, allCharacters) {
    var available = universeId
      ? allCharacters.filter(function (c) { return c.universe_id === universeId; })
      : allCharacters;

    if (available.length === 0) available = allCharacters;

    var used = {};
    return roles.map(function (role) {
      var matching = available.filter(function (c) {
        return c.roles && c.roles.indexOf(role) !== -1 && !used[c.name];
      });
      var candidates = matching.length > 0
        ? matching
        : available.filter(function (c) { return !used[c.name]; });
      var final = candidates.length > 0 ? candidates : available;
      if (final.length === 0) {
        return { name: PLACEHOLDER_NAMES[0], gender: 'male' };
      }
      var chosen = final[getRandomIndex(final.length)];
      used[chosen.name] = true;
      return { name: chosen.name, gender: chosen.gender || 'male' };
    });
  }

  function replaceThemePlaceholders(text, placeholders) {
    if (typeof text !== 'string' || !placeholders || placeholders.length === 0) return text;

    var resolvedText = text;
    placeholders.forEach(function (placeholder, idx) {
      var name = typeof placeholder === 'string' ? placeholder : placeholder.name;
      var isFemale = !!(placeholder && typeof placeholder === 'object' && placeholder.gender === 'female');
      resolvedText = resolvedText.replace(new RegExp('\\{CHARACTER_' + idx + '\\}', 'gi'), name);
      resolvedText = resolvedText.replace(new RegExp('\\{DESCRIPTOR_' + idx + '\\}', 'gi'), name);
      resolvedText = resolvedText.replace(new RegExp('\\{HE_SHE_CAP_' + idx + '\\}', 'gi'), isFemale ? 'She' : 'He');
      resolvedText = resolvedText.replace(new RegExp('\\{HIS_HER_CAP_' + idx + '\\}', 'gi'), isFemale ? 'Her' : 'His');
      resolvedText = resolvedText.replace(new RegExp('\\{HE_SHE_' + idx + '\\}', 'gi'), isFemale ? 'she' : 'he');
      resolvedText = resolvedText.replace(new RegExp('\\{HIM_HER_' + idx + '\\}', 'gi'), isFemale ? 'her' : 'him');
      resolvedText = resolvedText.replace(new RegExp('\\{HIS_HER_' + idx + '\\}', 'gi'), isFemale ? 'her' : 'his');
      resolvedText = resolvedText.replace(new RegExp('\\{HIS_HERS_' + idx + '\\}', 'gi'), isFemale ? 'hers' : 'his');
      resolvedText = resolvedText.replace(new RegExp('\\{HIMSELF_HERSELF_' + idx + '\\}', 'gi'), isFemale ? 'herself' : 'himself');
    });

    return resolvedText.replace(/\{NUMBER_(\d+)\}/gi, function (m, i) {
      return String(parseInt(i, 10) + 1);
    });
  }

  /**
   * Apply themed character substitution to a single question object.
   * Populates question.placeholders and builds question.question text.
   * @param {object}   q           – raw question from JSON
   * @param {number}   universeId  – universe to use (0 / null = all)
   * @param {object[]} allCharacters
   * @returns {object} new question object with .question set
   */
  function applyThemeToQuestion(q, universeId, allCharacters) {
    var resolved = Object.assign({}, q);
    var template = q.template || '';

    /* Assign themed characters if the question has placeholder_roles */
    if (q.placeholder_roles && q.placeholder_roles.length > 0 && allCharacters.length > 0) {
      var placeholders = assignCharactersToRoles(q.placeholder_roles, universeId, allCharacters);
      resolved.placeholders = placeholders;
      resolved.question = replaceThemePlaceholders(template, placeholders);
      resolved.options = Array.isArray(q.options)
        ? q.options.map(function (option) { return replaceThemePlaceholders(option, placeholders); })
        : q.options;
      if (typeof q.correct_answer === 'string') {
        resolved.correct_answer = replaceThemePlaceholders(q.correct_answer, placeholders);
      }
      /* Also replace placeholders in experiment context fields */
      if (typeof q.experiment_setup === 'string') {
        resolved.experiment_setup = replaceThemePlaceholders(q.experiment_setup, placeholders);
      }
      if (typeof q.experiment_data === 'string') {
        resolved.experiment_data = replaceThemePlaceholders(q.experiment_data, placeholders);
      }
    } else {
      /* Fallback: use the original resolveTemplate logic */
      resolved.question = resolveTemplate(template);
      resolved.options = Array.isArray(q.options)
        ? q.options.map(function (option) { return resolveTemplate(option); })
        : q.options;
      if (typeof q.correct_answer === 'string') {
        resolved.correct_answer = resolveTemplate(q.correct_answer);
      }
      if (typeof q.experiment_setup === 'string') {
        resolved.experiment_setup = resolveTemplate(q.experiment_setup);
      }
      if (typeof q.experiment_data === 'string') {
        resolved.experiment_data = resolveTemplate(q.experiment_data);
      }
    }

    /* Shuffle answer options so the correct answer appears in a random position */
    if (Array.isArray(resolved.options) && resolved.options.length > 1 && typeof resolved.answer === 'number') {
      var origAnswer = resolved.answer;
      var indices = resolved.options.map(function (_, i) { return i; });
      /* Fisher-Yates shuffle */
      for (var si = indices.length - 1; si > 0; si--) {
        var sj = getRandomIndex(si + 1);
        var tmp = indices[si]; indices[si] = indices[sj]; indices[sj] = tmp;
      }
      resolved.options = indices.map(function (i) { return resolved.options[i]; });
      resolved.answer = indices.indexOf(origAnswer);
    }

    return resolved;
  }

  /* ------------------------------------------------------------------ */
  /* Helpers                                                              */
  /* ------------------------------------------------------------------ */

  function getTodayString() {
    var d = new Date();
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
  }

  function getYesterdayString() {
    var d = new Date();
    d.setDate(d.getDate() - 1);
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
  }

  function docId(uid, subject, date) {
    return uid + '_' + subject + '_' + date;
  }

  /** Replace {CHARACTER_0}, {CHARACTER_1}, {NUMBER_0} etc. with generic values */
  function resolveTemplate(template) {
    if (!template) return '';
    return template.replace(/\{(CHARACTER|DESCRIPTOR|NUMBER|HE_SHE|HIM_HER|HIS_HER|HIS_HERS|HIMSELF_HERSELF|HE_SHE_CAP|HIS_HER_CAP)_(\d+)\}/gi, function (match, type, idx) {
      var i = parseInt(idx, 10);
      switch (type.toUpperCase()) {
        case 'NUMBER': return String(i + 1);
        case 'HE_SHE': return 'he';
        case 'HIM_HER': return 'him';
        case 'HIS_HER': return 'his';
        case 'HIS_HERS': return 'his';
        case 'HIMSELF_HERSELF': return 'himself';
        case 'HE_SHE_CAP': return 'He';
        case 'HIS_HER_CAP': return 'His';
        default: break;
      }
      return PLACEHOLDER_NAMES[i % PLACEHOLDER_NAMES.length] || ('P' + (i + 1));
    });
  }

  /** Calculate points for a daily-challenge attempt */
  function calculateChallengePoints(score, totalQuestions) {
    var base = score;
    var bonus = score === totalQuestions ? (BONUS_MAP[totalQuestions] || 0) : 0;
    var normal = base + bonus;
    if (score === totalQuestions) {
      return normal * 10; // 10× for perfect score
    }
    return normal;
  }

  /* ------------------------------------------------------------------ */
  /* Firebase helpers (lazy-imported)                                     */
  /* ------------------------------------------------------------------ */

  var _firestoreModule = null;
  async function getFirestore() {
    if (!_firestoreModule) {
      _firestoreModule = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');
    }
    return _firestoreModule;
  }

  /* ------------------------------------------------------------------ */
  /* Public API                                                           */
  /* ------------------------------------------------------------------ */

  /**
   * Check whether the current user has already completed today's challenge
   * for the given subject.
   * @param {string} subject  – 'math'|'science'|'english'|'chinese'
   * @returns {Promise<{done:boolean, record:object|null}>}
   */
  async function hasDoneToday(subject) {
    var db = global.FB_DB;
    var auth = global.FB_AUTH;
    if (!db || !auth || !auth.currentUser) return { done: false, record: null };
    try {
      var fs = await getFirestore();
      var id = docId(auth.currentUser.uid, subject, getTodayString());
      var snap = await fs.getDoc(fs.doc(db, 'daily_challenges', id));
      if (snap.exists()) return { done: true, record: snap.data() };
      return { done: false, record: null };
    } catch (e) {
      console.warn('hasDoneToday error:', e);
      return { done: false, record: null };
    }
  }

  /**
   * Get streak info for all subjects for the current user.
   * @returns {Promise<Object>} map of subject -> {streak, lastDate}
   */
  async function getAllStreaks() {
    var result = {};
    SUBJECTS.forEach(function (s) { result[s] = { streak: 0, lastDate: null }; });
    var db = global.FB_DB;
    var auth = global.FB_AUTH;
    if (!db || !auth || !auth.currentUser) return result;
    try {
      var fs = await getFirestore();
      var snap = await fs.getDoc(fs.doc(db, 'users', auth.currentUser.uid));
      if (!snap.exists()) return result;
      var data = snap.data();
      SUBJECTS.forEach(function (s) {
        result[s] = {
          streak: data[s + '_streak'] || 0,
          lastDate: data[s + '_streak_last_date'] || null
        };
      });
    } catch (e) {
      console.warn('getAllStreaks error:', e);
    }
    return result;
  }

  /**
   * Get the school_level stored in the current user's profile.
   * @returns {Promise<string|null>}  e.g. 'P3-P4' or null if not set / not logged in
   */
  async function getUserLevel() {
    var db = global.FB_DB;
    var auth = global.FB_AUTH;
    if (!db || !auth || !auth.currentUser) return null;
    try {
      var fs = await getFirestore();
      var snap = await fs.getDoc(fs.doc(db, 'users', auth.currentUser.uid));
      if (!snap.exists()) return null;
      return snap.data().school_level || null;
    } catch (e) {
      console.warn('getUserLevel error:', e);
      return null;
    }
  }

  /**
   * Load and shuffle questions for a subject.
   * @param {string}      subject
   * @param {number}      count   – number of questions to return
   * @param {string|null} [level] – school level (e.g. 'P3-P4'); filters questions
   *                                by the LEVEL_ALLOWED_DIFFICULTIES map when set.
   * @returns {Promise<Array>}
   */
  async function loadQuestions(subject, count, level) {
    var files = SUBJECT_DATA_FILES[subject] || [];
    var all = [];
    /* Load question files and theme data in parallel */
    var [themeData] = await Promise.all([
      loadThemeData(),
      Promise.all(files.map(async function (path) {
        try {
          var ts = new Date().getTime();
          var r = await fetch(path + '?v=' + ts);
          if (!r.ok) return;
          var qs = await r.json();
          all = all.concat(qs);
        } catch (e) {
          console.warn('Could not load', path, e);
        }
      }))
    ]);

    /* Pick a random theme for this session */
    var universe = pickRandomUniverse(themeData.universes);
    var universeId = universe ? universe.id : null;
    var allCharacters = themeData.characters || [];

    /* Filter by school level when one is provided */
    var allowedDifficulties = level ? LEVEL_ALLOWED_DIFFICULTIES[level] : null;
    if (allowedDifficulties) {
      all = all.filter(function (q) { return allowedDifficulties.indexOf(q.difficulty) !== -1; });
    }

    /* Shuffle */
    for (var i = all.length - 1; i > 0; i--) {
      var j = getRandomIndex(i + 1);
      var tmp = all[i]; all[i] = all[j]; all[j] = tmp;
    }

    var selected = all.slice(0, count).map(function (q) {
      return applyThemeToQuestion(q, universeId, allCharacters);
    });

    /* Attach theme metadata to the result for display purposes */
    selected.theme = universe
      ? { id: universeId, name: universe.universe_name }
      : null;

    return selected;
  }

  /**
   * Save a completed daily-challenge attempt.
   * Updates daily_challenges doc, user streak, and user total_points.
   * @param {string} subject
   * @param {string} difficulty  – 'easy'|'intermediate'|'advanced'
   * @param {number} score
   * @param {number} total
   * @returns {Promise<{points:number, streakBonus:number, streak:number}>}
   */
  async function saveChallenge(subject, difficulty, score, total) {
    var db = global.FB_DB;
    var auth = global.FB_AUTH;
    if (!db || !auth || !auth.currentUser) return { points: 0, streakBonus: 0, streak: 0 };
    var uid = auth.currentUser.uid;
    var today = getTodayString();
    var yesterday = getYesterdayString();

    try {
      var fs = await getFirestore();
      var challengeRef = fs.doc(db, 'daily_challenges', docId(uid, subject, today));
      var userRef = fs.doc(db, 'users', uid);

      var pts = calculateChallengePoints(score, total);
      var perfect = score === total;
      var streakBonus = 0;
      var newStreak = 1;

      var result = await fs.runTransaction(db, async function (tx) {
        var challengeSnap = await tx.get(challengeRef);
        if (challengeSnap.exists()) {
          /* Already saved today – idempotent: return stored values */
          var stored = challengeSnap.data();
          return { points: stored.points_earned, streakBonus: 0, streak: stored.streak_at_save };
        }

        var userSnap = await tx.get(userRef);
        var userData = userSnap.exists() ? userSnap.data() : {};

        var lastDate = userData[subject + '_streak_last_date'] || null;
        var currentStreak = userData[subject + '_streak'] || 0;

        if (lastDate === yesterday) {
          newStreak = currentStreak + 1;
        } else if (lastDate === today) {
          newStreak = currentStreak; // shouldn't reach here due to early exit, but safe
        } else {
          newStreak = 1; // broke streak or first time
        }

        /* 7-day streak bonus (triggers on multiples of 7) */
        if (newStreak > 0 && newStreak % 7 === 0) {
          streakBonus = 1000;
        }

        var totalPtsGain = pts + streakBonus;

        tx.set(challengeRef, {
          user_id: uid,
          subject: subject,
          date: today,
          difficulty: difficulty,
          score: score,
          total_questions: total,
          points_earned: pts,
          streak_bonus: streakBonus,
          perfect: perfect,
          streak_at_save: newStreak,
          completed_at: fs.serverTimestamp()
        });

        var currentTotal = userData.total_points || 0;
        var currentQuizzes = userData.total_quizzes || 0;
        var streakUpdate = {};
        streakUpdate[subject + '_streak'] = newStreak;
        streakUpdate[subject + '_streak_last_date'] = today;

        tx.set(userRef, Object.assign({
          total_points: currentTotal + totalPtsGain,
          total_quizzes: currentQuizzes + 1
        }, streakUpdate), { merge: true });

        return { points: pts, streakBonus: streakBonus, streak: newStreak };
      });

      return result;
    } catch (e) {
      console.warn('saveChallenge error:', e);
      return { points: 0, streakBonus: 0, streak: 0 };
    }
  }

  /* ------------------------------------------------------------------ */
  /* Exports                                                              */
  /* ------------------------------------------------------------------ */

  global.DailyChallenge = {
    SUBJECTS: SUBJECTS,
    DIFFICULTY_Q_COUNT: DIFFICULTY_Q_COUNT,
    getTodayString: getTodayString,
    resolveTemplate: resolveTemplate,
    calculateChallengePoints: calculateChallengePoints,
    hasDoneToday: hasDoneToday,
    getAllStreaks: getAllStreaks,
    getUserLevel: getUserLevel,
    loadQuestions: loadQuestions,
    saveChallenge: saveChallenge,
    loadThemeData: loadThemeData,
    pickRandomUniverse: pickRandomUniverse
  };
})(window);
