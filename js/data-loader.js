/**
 * Data Loader - Manages loading and caching quiz data from JSON files
 * Uses math-meta.json so category lists do not force a full bank download.
 */

class DataManager {
  constructor() {
    this.data = {
      universes: [],
      characters: [],
      questions: [],
      sessions: [],
      mathMeta: null
    };
    this.loaded = false;
    this.loadedDifficulties = {
      'p1-p2': false,
      'p3-p4': false,
      'p5-p6': false,
      'challenging': false,
      'psle': false,
      easy: false,
      medium: false,
      hard: false
    };
  }

  async loadData() {
    try {
      const [universes, characters, mathMeta] = await Promise.all([
        this.loadJSON('data/universes.json'),
        this.loadJSON('data/characters.json'),
        this.loadJSON('data/math-meta.json')
      ]);

      this.data = {
        universes: universes || [],
        characters: characters || [],
        questions: [],
        sessions: this.loadSessions(),
        mathMeta: mathMeta && !Array.isArray(mathMeta) ? mathMeta : null
      };

      this.loaded = true;
      return this.data;
    } catch (err) {
      console.error('Error loading data:', err);
      return this.data;
    }
  }

  async loadJSON(url) {
    try {
      const cacheBuster = new Date().getTime();
      const urlWithBuster = url.includes('?') ? `${url}&v=${cacheBuster}` : `${url}?v=${cacheBuster}`;
      const response = await fetch(urlWithBuster);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      console.warn(`Could not load ${url}:`, err.message);
      return Array.isArray(arguments[0]) ? [] : [];
    }
  }

  async loadQuestionsByDifficulty(difficulty) {
    const difficultyKey = String(difficulty || '').toLowerCase();
    if (!difficultyKey || this.loadedDifficulties[difficultyKey]) return;

    const questions = await this.loadJSON(`data/questions-${difficultyKey}.json`);
    if (!Array.isArray(questions)) return;

    const existingIds = new Set(this.data.questions.map((q) => String(q.id) + '|' + (q.difficulty || '')));
    questions.forEach((q) => {
      const key = String(q.id) + '|' + (q.difficulty || '');
      if (!existingIds.has(key)) {
        this.data.questions.push(q);
        existingIds.add(key);
      }
    });
    this.loadedDifficulties[difficultyKey] = true;
  }

  async ensureDifficultyLoaded(difficulty) {
    if (difficulty === 'all') {
      await Promise.all([
        this.loadQuestionsByDifficulty('p1-p2'),
        this.loadQuestionsByDifficulty('p3-p4'),
        this.loadQuestionsByDifficulty('p5-p6'),
        this.loadQuestionsByDifficulty('challenging'),
        this.loadQuestionsByDifficulty('psle')
      ]);
      return;
    }
    await this.loadQuestionsByDifficulty(difficulty);
  }

  getQuestions(category = null, difficulty = null, theme = null) {
    let questions = this.data.questions;

    if (category && category !== 'all') {
      questions = questions.filter((q) => q.category === category);
    }

    if (difficulty && difficulty !== 'all') {
      const target = String(difficulty).toLowerCase();
      questions = questions.filter((q) => String(q.difficulty || '').toLowerCase() === target);
    }

    // Theme filtering is applied at character-substitution time in QuizEngine.
    // Keep signature for compatibility; theme param intentionally unused here.
    void theme;

    return questions;
  }

  getQuestion(id) {
    return this.data.questions.find((q) => q.id === id);
  }

  getCharacters(universeId = null) {
    if (universeId && universeId !== 'all') {
      const numericId = parseInt(universeId, 10);
      if (!isNaN(numericId)) {
        return this.data.characters.filter((c) => c.universe_id === numericId);
      }
    }
    return this.data.characters;
  }

  getUniverses() {
    return this.data.universes;
  }

  async getCategories(difficulty = 'all') {
    if (this.data.mathMeta && Array.isArray(this.data.mathMeta.categories)) {
      if (!difficulty || difficulty === 'all') {
        return this.data.mathMeta.categories.slice().sort();
      }
      const match = (this.data.mathMeta.difficulties || []).find((d) => {
        return d.key === String(difficulty).toLowerCase() || d.id === difficulty;
      });
      if (match && match.categories) return match.categories.slice().sort();
    }

    if (difficulty && difficulty !== 'all') {
      await this.ensureDifficultyLoaded(difficulty);
      const target = String(difficulty).toLowerCase();
      const cats = [
        ...new Set(
          this.data.questions
            .filter((q) => String(q.difficulty || '').toLowerCase() === target)
            .map((q) => q.category)
        )
      ];
      return cats.sort();
    }

    await this.ensureDifficultyLoaded('all');
    return [...new Set(this.data.questions.map((q) => q.category))].sort();
  }

  getDifficulties() {
    if (this.data.mathMeta && Array.isArray(this.data.mathMeta.difficulties)) {
      return this.data.mathMeta.difficulties.map((d) => d.id);
    }
    return ['P1-P2', 'P3-P4', 'P5-P6', 'Challenging', 'PSLE'];
  }

  getMetaSummary() {
    return this.data.mathMeta || null;
  }

  saveSession(studentName, score, totalQuestions) {
    const session = {
      id: Date.now(),
      student_name: studentName,
      score: score,
      total_questions: totalQuestions,
      timestamp: new Date().toISOString()
    };

    const sessions = this.loadSessions();
    sessions.push(session);
    localStorage.setItem('quiz_sessions', JSON.stringify(sessions));
    this.data.sessions = sessions;
    return session;
  }

  loadSessions() {
    try {
      const stored = localStorage.getItem('quiz_sessions');
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error('Error loading sessions:', err);
      return [];
    }
  }

  getSessions() {
    return this.data.sessions;
  }

  clearSessions() {
    localStorage.removeItem('quiz_sessions');
    this.data.sessions = [];
  }

  addQuestion(question) {
    if (!question.id) {
      question.id = Math.max(...this.data.questions.map((q) => q.id || 0), 0) + 1;
    }
    const index = this.data.questions.findIndex((q) => q.id === question.id);
    if (index >= 0) this.data.questions[index] = question;
    else this.data.questions.push(question);
    localStorage.setItem('custom_questions', JSON.stringify(this.data.questions));
    return question;
  }

  deleteQuestion(id) {
    this.data.questions = this.data.questions.filter((q) => q.id !== id);
    localStorage.setItem('custom_questions', JSON.stringify(this.data.questions));
  }

  addCharacter(character) {
    if (!character.id) {
      character.id = Math.max(...this.data.characters.map((c) => c.id || 0), 0) + 1;
    }
    const index = this.data.characters.findIndex((c) => c.id === character.id);
    if (index >= 0) this.data.characters[index] = character;
    else this.data.characters.push(character);
    localStorage.setItem('custom_characters', JSON.stringify(this.data.characters));
    return character;
  }

  deleteCharacter(id) {
    this.data.characters = this.data.characters.filter((c) => c.id !== id);
    localStorage.setItem('custom_characters', JSON.stringify(this.data.characters));
  }

  exportData() {
    return JSON.stringify(this.data, null, 2);
  }

  importData(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      this.data = { ...this.data, ...imported };
      localStorage.setItem('custom_questions', JSON.stringify(this.data.questions));
      localStorage.setItem('custom_characters', JSON.stringify(this.data.characters));
      return true;
    } catch (err) {
      console.error('Error importing data:', err);
      return false;
    }
  }
}

const dataManager = new DataManager();
window.dataManager = dataManager;
