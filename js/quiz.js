/**
 * Math quiz bootstrap — uses shared QuizEngine + DataManager.
 */
(function () {
  'use strict';

  async function populateDropdowns(engine) {
    const themeSelect = document.getElementById('theme');
    if (themeSelect && dataManager.data.universes) {
      dataManager.data.universes.forEach((universe) => {
        const option = document.createElement('option');
        option.value = universe.id;
        option.textContent = universe.universe_name;
        themeSelect.appendChild(option);
      });
    }

    const categorySelect = document.getElementById('category');
    const difficultySelect = document.getElementById('difficulty');

    async function refreshCategories() {
      if (!categorySelect) return;
      const previous = categorySelect.value || 'all';
      categorySelect.querySelectorAll('option:not([value="all"])').forEach((opt) => opt.remove());
      const difficulty = difficultySelect ? difficultySelect.value : 'all';
      const categories = await dataManager.getCategories(difficulty);
      categories.forEach((category) => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
      });
      if ([...categorySelect.options].some((o) => o.value === previous)) {
        categorySelect.value = previous;
      }
    }

    if (difficultySelect) {
      difficultySelect.querySelectorAll('option:not([value="all"])').forEach((opt) => opt.remove());
      dataManager.getDifficulties().forEach((difficulty) => {
        const option = document.createElement('option');
        option.value = difficulty;
        option.textContent = difficulty;
        difficultySelect.appendChild(option);
      });
      difficultySelect.addEventListener('change', refreshCategories);
    }

    await refreshCategories();
    if (engine && engine.applyQueryDefaults) engine.applyQueryDefaults();
  }

  document.addEventListener('DOMContentLoaded', async function () {
    try {
      localStorage.removeItem('custom_questions');
      localStorage.removeItem('custom_characters');
      await dataManager.loadData();

      const engine = new QuizEngine({
        subject: 'math',
        title: 'Math Quiz',
        quizPage: 'quiz.html',
        getCharacters: function (themeId) {
          return dataManager.getCharacters(themeId);
        },
        loadPool: async function (filters) {
          await dataManager.ensureDifficultyLoaded(filters.difficulty);
          return dataManager.getQuestions(filters.category, filters.difficulty, filters.theme);
        }
      });

      window.quizApp = engine;
      await populateDropdowns(engine);
    } catch (err) {
      console.error('Error initializing math quiz:', err);
    }
  });
})();
