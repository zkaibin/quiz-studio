/**
 * Data Loader - Manages loading and caching quiz data from JSON files
 */

class DataManager {
  constructor() {
    this.data = {
      universes: [],
      characters: [],
      questions: [], // Will be populated on-demand by difficulty
      sessions: []
    };
    this.loaded = false;
    this.loadedDifficulties = {
      'p1-p2': false,
      'p3-p4': false,
      'p5-p6': false,
      'challenging': false,
      'psle': false,
      // Legacy support
      easy: false,
      medium: false,
      hard: false
    };
  }

  /**
   * Load initial data (universes and characters only, skip questions)
   */
  async loadData() {
    console.log('📥 DataManager.loadData() called');
    console.log('  Loading universes and characters only (lazy-load questions)');

    try {
      console.log('  🔗 Fetching JSON files...');
      const [universes, characters] = await Promise.all([
        this.loadJSON('data/universes.json'),
        this.loadJSON('data/characters.json')
      ]);

      console.log('  ✓ Fetches completed');
      console.log('    - universes:', universes?.length || 0);
      console.log('    - characters:', characters?.length || 0);

      this.data = {
        universes: universes || [],
        characters: characters || [],
        questions: [],
        sessions: this.loadSessions() // Load from localStorage
      };

      this.loaded = true;
      console.log('  ✓ Data loaded successfully');
      return this.data;
    } catch (err) {
      console.error('❌ Error loading data:', err);
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
   * Load questions for a specific difficulty level
   */
  async loadQuestionsByDifficulty(difficulty) {
    const difficultyKey = difficulty.toLowerCase();
    
    if (this.loadedDifficulties[difficultyKey]) {
      console.log(`  ✓ Questions for ${difficulty} already loaded`);
      return;
    }

    console.log(`  📥 Loading ${difficulty} questions...`);
    const questions = await this.loadJSON(`data/questions-${difficultyKey}.json`);
    
    // Add to questions array
    this.data.questions = this.data.questions.concat(questions);
    this.loadedDifficulties[difficultyKey] = true;
    
    console.log(`  ✓ Loaded ${questions.length} ${difficulty} questions`);
  }

  /**
   * Ensure questions for the selected difficulty are loaded
   */
  async ensureDifficultyLoaded(difficulty) {
    if (difficulty === 'all') {
      // Load all difficulties
      await Promise.all([
        this.loadQuestionsByDifficulty('p1-p2'),
        this.loadQuestionsByDifficulty('p3-p4'),
        this.loadQuestionsByDifficulty('p5-p6'),
        this.loadQuestionsByDifficulty('challenging'),
        this.loadQuestionsByDifficulty('psle')
      ]);
    } else {
      // Load specific difficulty
      await this.loadQuestionsByDifficulty(difficulty);
    }
  }

  /**
   * Get all questions, optionally filtered by category and difficulty
   */
  /**
   * Get all questions, optionally filtered by category, difficulty, and theme (universe)
   */
  getQuestions(category = null, difficulty = null, theme = null) {
    let questions = this.data.questions;

    if (category && category !== 'all') {
      questions = questions.filter(q => q.category === category);
    }

    if (difficulty && difficulty !== 'all') {
      questions = questions.filter(q => q.difficulty === difficulty);
    }

    // Theme filter: map theme to universe_id(s) and filter by character placeholders
    if (theme && theme !== 'all') {
      const themeMap = {
        kpop: [4,5,6,7],
        disney: [1],
        pixar: [2],
        cartoon: [3],
        avengers: [8] // Example, update as needed
      };
      const universeIds = themeMap[theme];
      if (universeIds) {
        // Only include questions where all placeholder characters are from the selected universe(s)
        questions = questions.filter(q => {
          if (!q.placeholders || q.placeholders.length === 0) return false;
          // Find all character objects for placeholders
          const chars = q.placeholders.map(name => this.data.characters.find(c => c.name === name));
          // If any character is not found or not in the universe, exclude
          return chars.every(c => c && universeIds.includes(c.universe_id));
        });
      }
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
   * Get categories (dynamically from all questions)
   */
  async getCategories() {
    // Ensure all questions are loaded first
    if (this.data.questions.length === 0) {
      await this.ensureDifficultyLoaded('all');
    }
    
    // Extract unique categories from all loaded questions
    const categories = [...new Set(this.data.questions.map(q => q.category))];
    return categories.sort();
  }

  /**
   * Get difficulties (predefined list)
   */
  getDifficulties() {
    // Return PSLE-aligned difficulty levels
    return ['P1-P2', 'P3-P4', 'P5-P6', 'Challenging', 'PSLE'];
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
