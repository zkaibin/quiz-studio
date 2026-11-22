/**
 * Shared bootstrap for subject quiz pages that load a single JSON bank
 * (English / Chinese) or multi-bank Science with lazy P6 loading.
 */
(function (global) {
  'use strict';

  function uniqueSorted(values) {
    return Array.from(new Set(values.filter(Boolean))).sort();
  }

  function fillSelect(select, values, valueFn, labelFn) {
    if (!select) return;
    select.querySelectorAll('option:not([value="all"])').forEach(function (opt) { opt.remove(); });
    values.forEach(function (value) {
      var option = document.createElement('option');
      option.value = valueFn ? valueFn(value) : value;
      option.textContent = labelFn ? labelFn(value) : value;
      select.appendChild(option);
    });
  }

  async function fetchJson(url) {
    var response = await fetch(url + (url.indexOf('?') === -1 ? '?' : '&') + 'v=' + Date.now());
    if (!response.ok) throw new Error('Failed to load ' + url);
    return response.json();
  }

  async function bootstrapSubjectQuiz(config) {
    var state = {
      allQuestions: [],
      universes: [],
      characters: [],
      meta: null,
      p6Loaded: false,
      regularLoaded: false
    };

    var bootLoads = [
      fetchJson('data/universes.json'),
      fetchJson('data/characters.json')
    ];
    if (config.metaBank) bootLoads.push(fetchJson(config.metaBank).catch(function () { return null; }));
    if (config.primaryBank) bootLoads.push(fetchJson(config.primaryBank));

    var boot = await Promise.all(bootLoads);
    state.universes = boot[0] || [];
    state.characters = boot[1] || [];
    var cursor = 2;
    if (config.metaBank) {
      state.meta = boot[cursor++];
    }
    if (config.primaryBank) {
      state.allQuestions = boot[cursor] || [];
      state.regularLoaded = true;
    }

    fillSelect(document.getElementById('theme'), state.universes, function (u) { return u.id; }, function (u) { return u.universe_name; });

    function refreshFilters() {
      var cats = state.meta && state.meta.categories
        ? state.meta.categories.slice()
        : uniqueSorted(state.allQuestions.map(function (q) { return q.category; }));
      var diffs = state.meta && state.meta.difficulties
        ? state.meta.difficulties.map(function (d) { return d.id; })
        : uniqueSorted(state.allQuestions.map(function (q) { return q.difficulty; }));
      fillSelect(document.getElementById('category'), cats);
      fillSelect(document.getElementById('difficulty'), diffs, function (d) { return String(d).toLowerCase(); }, function (d) { return d; });
    }

    refreshFilters();

    async function ensureBanksLoaded(filters) {
      var difficulty = String(filters.difficulty || 'all').toLowerCase();
      var category = String(filters.category || 'all');
      var primary = config.lazyPrimaryBank || config.primaryBank;
      var needsP6 = config.subject === 'science' && (
        difficulty === 'all' ||
        difficulty === 'psle' ||
        difficulty === 'p5-p6' ||
        category.toLowerCase().indexOf('p6') !== -1
      );

      if (!state.regularLoaded && primary) {
        var regular = await fetchJson(primary);
        state.allQuestions = state.allQuestions.concat(regular);
        state.regularLoaded = true;
      }
      if (needsP6 && !state.p6Loaded && config.secondaryBank) {
        var p6 = await fetchJson(config.secondaryBank);
        state.allQuestions = state.allQuestions.concat(p6);
        state.p6Loaded = true;
      }
    }

    var engine = new QuizEngine({
      subject: config.subject,
      title: config.title,
      quizPage: config.quizPage,
      getCharacters: function (themeId) {
        if (themeId && themeId !== 'all') {
          var id = parseInt(themeId, 10);
          return state.characters.filter(function (c) { return c.universe_id === id; });
        }
        return state.characters;
      },
      loadPool: async function (filters) {
        await ensureBanksLoaded(filters);
        var pool = state.allQuestions.slice();
        if (filters.category && filters.category !== 'all') {
          pool = pool.filter(function (q) { return q.category === filters.category; });
        }
        if (filters.difficulty && filters.difficulty !== 'all') {
          var target = String(filters.difficulty).toLowerCase();
          pool = pool.filter(function (q) { return String(q.difficulty || '').toLowerCase() === target; });
        }
        return pool;
      }
    });

    engine.applyQueryDefaults();
    global.quizApp = engine;
    return engine;
  }

  global.bootstrapSubjectQuiz = bootstrapSubjectQuiz;
})(window);
