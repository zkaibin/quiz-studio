/**
 * Data Loader - Manages loading and caching quiz data from JSON files
 */

class DataManager {
  constructor() {
    this.data = {
      universes: [],
      characters: [],
      questions: [],
      sessions: []
    };
    this.loaded = false;
  }

  /**
   * Load all data from JSON files
   */
  async loadData() {
    // Don't use cached data - always reload from JSON files
    try {
      const [universes, characters, questions] = await Promise.all([
        this.loadJSON('/quiz-studio/data/universes.json'),
        this.loadJSON('/quiz-studio/data/characters.json'),
        this.loadJSON('/quiz-studio/data/questions.json')
      ]);

      this.data = {
        universes: universes || [],
        characters: characters || [],
        questions: questions || [],
        sessions: this.loadSessions() // Load from localStorage
      };

      this.loaded = true;
      return this.data;
    } catch (err) {
      console.error('Error loading data:', err);
      return this.data;
    }
  }

  /**
   * Load a JSON file
   */
  async loadJSON(url) {
    try {
      // Add cache-busting parameter to force fresh data
      const cacheBuster = new Date().getTime();
      const urlWithBuster = url.includes('?') ? `${url}&v=${cacheBuster}` : `${url}?v=${cacheBuster}`;
      const response = await fetch(urlWithBuster);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      console.warn(`Could not load ${url}:`, err.message);
      return [];
    }
  }

  /**
   * Get all questions, optionally filtered by category and difficulty
   */
  getQuestions(category = null, difficulty = null) {
    let questions = this.data.questions;

    if (category) {
      questions = questions.filter(q => q.category === category);
    }

    if (difficulty) {
      questions = questions.filter(q => q.difficulty === difficulty);
    }

    return questions;
  }

  /**
   * Get a specific question by ID
   */
  getQuestion(id) {
    return this.data.questions.find(q => q.id === id);
  }

  /**
   * Get all characters, optionally filtered by universe
   */
  getCharacters(universeId = null) {
    if (universeId) {
      return this.data.characters.filter(c => c.universe_id === universeId);
    }
    return this.data.characters;
  }

  /**
   * Get all universes
   */
  getUniverses() {
    return this.data.universes;
  }

  /**
   * Get categories (unique from questions)
   */
  getCategories() {
    const categories = new Set(this.data.questions.map(q => q.category));
    return Array.from(categories).sort();
  }

  /**
   * Get difficulties (unique from questions)
   */
  getDifficulties() {
    const difficulties = new Set(this.data.questions.map(q => q.difficulty));
    return Array.from(difficulties).sort();
  }

  /**
   * Save quiz session to localStorage
   */
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

  /**
   * Load sessions from localStorage
   */
  loadSessions() {
    try {
      const stored = localStorage.getItem('quiz_sessions');
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error('Error loading sessions:', err);
      return [];
    }
  }

  /**
   * Get all saved sessions
   */
  getSessions() {
    return this.data.sessions;
  }

  /**
   * Clear all sessions from localStorage
   */
  clearSessions() {
    localStorage.removeItem('quiz_sessions');
    this.data.sessions = [];
  }

  /**
   * Add or update a question (stored in localStorage, not persisted to server)
   */
  addQuestion(question) {
    // Generate ID if not provided
    if (!question.id) {
      question.id = Math.max(...this.data.questions.map(q => q.id || 0), 0) + 1;
    }

    // Check if question exists
    const index = this.data.questions.findIndex(q => q.id === question.id);
    if (index >= 0) {
      this.data.questions[index] = question;
    } else {
      this.data.questions.push(question);
    }

    // Save to localStorage
    localStorage.setItem('custom_questions', JSON.stringify(this.data.questions));
    return question;
  }

  /**
   * Delete a question
   */
  deleteQuestion(id) {
    this.data.questions = this.data.questions.filter(q => q.id !== id);
    localStorage.setItem('custom_questions', JSON.stringify(this.data.questions));
  }

  /**
   * Add or update a character
   */
  addCharacter(character) {
    if (!character.id) {
      character.id = Math.max(...this.data.characters.map(c => c.id || 0), 0) + 1;
    }

    const index = this.data.characters.findIndex(c => c.id === character.id);
    if (index >= 0) {
      this.data.characters[index] = character;
    } else {
      this.data.characters.push(character);
    }

    localStorage.setItem('custom_characters', JSON.stringify(this.data.characters));
    return character;
  }

  /**
   * Delete a character
   */
  deleteCharacter(id) {
    this.data.characters = this.data.characters.filter(c => c.id !== id);
    localStorage.setItem('custom_characters', JSON.stringify(this.data.characters));
  }

  /**
   * Export data as JSON string (for backup)
   */
  exportData() {
    return JSON.stringify(this.data, null, 2);
  }

  /**
   * Import data from JSON string
   */
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

// Create global instance
const dataManager = new DataManager();
