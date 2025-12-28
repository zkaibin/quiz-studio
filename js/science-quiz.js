/**
 * Science Quiz App - Standalone version for science questions
 */

class ScienceQuizApp {
  constructor() {
    this.questions = [];
    this.answers = [];
    this.studentName = '';
    this.score = 0;
    this.category = '';
    this.difficulty = '';
    this.theme = '';
    this.letters = ['A', 'B', 'C', 'D'];
    this.optionClickHandler = null;
    this.allQuestions = [];
    this.universes = [];
    this.characters = [];

    this.setupEventListeners();
    this.initializeApp();
  }

  /**
   * Initialize the app by loading data
   */
  async initializeApp() {
    try {
      console.log('🚀 Science Quiz initializing...');
      await this.loadScienceData();
      await this.populateDropdowns();
      console.log('✓ Science Quiz initialized');
    } catch (err) {
      console.error('❌ Error initializing app:', err);
    }
  }

  /**
   * Load science questions from JSON
   */
  async loadScienceData() {
    try {
      const cacheBuster = new Date().getTime();
      const [questions, universes, characters] = await Promise.all([
        fetch(`data/questions-science.json?v=${cacheBuster}`).then(r => r.json()),
        fetch(`data/universes.json?v=${cacheBuster}`).then(r => r.json()),
        fetch(`data/characters.json?v=${cacheBuster}`).then(r => r.json())
      ]);
      
      this.allQuestions = questions;
      this.universes = universes;
      this.characters = characters;
      
      console.log(`✓ Loaded ${this.allQuestions.length} science questions`);
      console.log(`✓ Loaded ${this.universes.length} themes`);
      console.log(`✓ Loaded ${this.characters.length} characters`);
    } catch (err) {
      console.error('❌ Error loading science data:', err);
      this.allQuestions = [];
      this.universes = [];
      this.characters = [];
    }
  }

  /**
   * Populate category and difficulty dropdowns
   */
  async populateDropdowns() {
    console.log('📋 Populating dropdowns...');
    
    // Populate themes
    const themeSelect = document.getElementById('theme');
    if (themeSelect) {
      console.log(`  Adding ${this.universes.length} themes`);
      this.universes.forEach(universe => {
        const option = document.createElement('option');
        option.value = universe.id;
        option.textContent = universe.universe_name;
        themeSelect.appendChild(option);
      });
      console.log('  ✓ Themes populated');
    } else {
      console.error('  ❌ Theme select not found!');
    }

    // Populate categories
    const categorySelect = document.getElementById('category');
    if (categorySelect) {
      const categories = [...new Set(this.allQuestions.map(q => q.category))].sort();
      console.log(`  Adding ${categories.length} categories:`, categories);
      
      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
      });
      console.log('  ✓ Categories populated');
    } else {
      console.error('  ❌ Category select not found!');
    }

    // Populate difficulties
    const difficultySelect = document.getElementById('difficulty');
    if (difficultySelect) {
      const difficulties = [...new Set(this.allQuestions.map(q => q.difficulty))].sort();
      console.log(`  Adding ${difficulties.length} difficulties:`, difficulties);
      
      difficulties.forEach(difficulty => {
        const option = document.createElement('option');
        option.value = difficulty.toLowerCase();
        option.textContent = difficulty;
        difficultySelect.appendChild(option);
      });
      console.log('  ✓ Difficulties populated');
    } else {
      console.error('  ❌ Difficulty select not found!');
    }
    
    console.log('✓ All dropdowns populated');
  }

  setupEventListeners() {
    const startBtn = document.getElementById('startQuizBtn');
    if (startBtn) {
      startBtn.addEventListener('click', () => this.startQuiz());
    }
    
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => this.finishQuiz());
    }
    
    const reviewBtn = document.getElementById('reviewBtn');
    if (reviewBtn) {
      reviewBtn.addEventListener('click', () => this.showReviewSection());
    }
    
    const printBtn = document.getElementById('printBtn');
    if (printBtn) {
      printBtn.addEventListener('click', () => this.printQuiz());
    }
    
    const retakeBtn = document.getElementById('retakeQuizBtn');
    if (retakeBtn) {
      retakeBtn.addEventListener('click', () => this.reset());
    }
    
    const backToResultsBtn = document.getElementById('backToResultsBtn');
    if (backToResultsBtn) {
      backToResultsBtn.addEventListener('click', () => {
        document.getElementById('resultsSection').style.display = 'block';
        document.getElementById('reviewSection').style.display = 'none';
      });
    }
  }

  /**
   * Get filtered questions
   */
  getFilteredQuestions(category, difficulty) {
    return this.allQuestions.filter(q => {
      const categoryMatch = category === 'all' || q.category === category;
      const difficultyMatch = difficulty === 'all' || q.difficulty.toLowerCase() === difficulty.toLowerCase();
      return categoryMatch && difficultyMatch;
    });
  }

  /**
   * Start a new quiz
   */
  async startQuiz() {
    const studentName = document.getElementById('studentName').value.trim();
    const theme = document.getElementById('theme').value;
    const category = document.getElementById('category').value;
    const difficulty = document.getElementById('difficulty').value;
    const questionCount = parseInt(document.getElementById('questionCount').value);

    if (!studentName) {
      alert('Please enter your name!');
      return;
    }

    this.studentName = studentName;
    this.theme = theme;
    this.category = category;
    this.difficulty = difficulty;

    // Get questions based on criteria
    let allQuestions = this.getFilteredQuestions(category, difficulty);
    
    // Shuffle and select random questions
    allQuestions = this.shuffleArray(allQuestions);
    this.questions = allQuestions.slice(0, questionCount).map(q => {
      // Clone question object
      const question = JSON.parse(JSON.stringify(q));
      
      // Assign characters dynamically based on theme and placeholder_roles
      if (question.placeholder_roles && question.placeholder_roles.length > 0) {
        question.placeholders = this.assignCharactersToRoles(
          question.placeholder_roles,
          theme
        );
      }
      
      // Shuffle options for each question and update answer index
      const shuffledData = this.shuffleOptions(question.options, question.answer);
      question.options = shuffledData.options;
      question.answer = shuffledData.answerIndex;
      
      return question;
    });

    if (this.questions.length === 0) {
      alert('No questions available for this criteria. Please try different filters.');
      return;
    }

    this.answers = new Array(this.questions.length).fill(null);
    this.score = 0;

    this.showQuizSection();
    this.displayAllQuestions();
  }

  /**
   * Display all questions on the page
   */
  displayAllQuestions() {
    const container = document.getElementById('questionContainer');
    let html = '';

    // Clean up old event listener
    if (this.optionClickHandler) {
      container.removeEventListener('click', this.optionClickHandler);
      this.optionClickHandler = null;
    }

    // Update header info
    document.getElementById('studentNameDisplay').textContent = `Student: ${this.studentName}`;
    document.getElementById('quizCategoryDisplay').textContent = 
      `Topic: ${this.category === 'all' ? 'All Topics' : this.category}`;
    document.getElementById('quizDifficultyDisplay').textContent = 
      `Level: ${this.difficulty === 'all' ? 'All Levels' : this.difficulty.toUpperCase()}`;
    if (document.getElementById('quizThemeDisplay')) {
      const themeName = this.theme === 'all' ? 'All Themes' : 
        this.universes.find(u => u.id === parseInt(this.theme))?.universe_name || 'All Themes';
      document.getElementById('quizThemeDisplay').textContent = `Theme: ${themeName}`;
    }

    // Generate HTML for all questions
    this.questions.forEach((question, index) => {
      const options = question.options;
      const selectedAnswer = this.answers[index];

      html += `
        <div class="question-item" data-question-index="${index}">
          <div class="question-number">Question ${index + 1}</div>
          <div class="question-text">${this.buildQuestionText(question)}</div>
          <div class="options">
      `;

      options.forEach((option, optIndex) => {
        const isSelected = selectedAnswer === optIndex;
        const selectedClass = isSelected ? 'selected' : '';
        html += `
          <div class="option ${selectedClass}" data-option-index="${optIndex}">
            <span class="option-letter">${this.letters[optIndex]}</span>
            <span class="option-text">${option}</span>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    // Attach new event listener
    this.optionClickHandler = (e) => this.selectAnswer(e);
    container.addEventListener('click', this.optionClickHandler);
  }

  /**
   * Assign characters to placeholder roles based on theme
   */
  assignCharactersToRoles(roles, themeId) {
    let availableCharacters;
    
    if (themeId && themeId !== 'all') {
      // Filter characters by selected theme/universe
      const themeUniverseId = parseInt(themeId);
      availableCharacters = this.characters.filter(
        c => c.universe_id === themeUniverseId
      );
    } else {
      // Use all characters if no theme selected
      availableCharacters = this.characters;
    }
    
    // Track already used characters to prevent duplicates
    const usedCharacters = new Set();
    
    // Assign characters to each role
    return roles.map(role => {
      // Find characters that have this role and haven't been used yet
      const matchingChars = availableCharacters.filter(c => 
        c.roles && c.roles.includes(role) && !usedCharacters.has(c.name)
      );
      
      // If no exact role match, use any unused character from the theme
      const candidates = matchingChars.length > 0 
        ? matchingChars 
        : availableCharacters.filter(c => !usedCharacters.has(c.name));
      
      // If all characters are used, reuse any character
      const finalCandidates = candidates.length > 0 ? candidates : availableCharacters;
      
      // Pick a random character
      const randomIndex = Math.floor(Math.random() * finalCandidates.length);
      const selectedChar = finalCandidates[randomIndex].name;
      
      // Mark this character as used
      usedCharacters.add(selectedChar);
      
      return selectedChar;
    });
  }

  /**
   * Build question text with placeholders substituted
   */
  buildQuestionText(question) {
    let text = question.template;
    
    // Substitute character placeholders if present
    if (question.placeholders && question.placeholders.length > 0) {
      question.placeholders.forEach((placeholder, index) => {
        const charRegex = new RegExp(`{CHARACTER_${index}}`, 'g');
        const descRegex = new RegExp(`{DESCRIPTOR_${index}}`, 'g');
        text = text.replace(charRegex, `<strong>${placeholder}</strong>`);
        text = text.replace(descRegex, `<strong>${placeholder}</strong>`);
      });
    }
    
    return text;
  }

  /**
   * Handle answer selection
   */
  selectAnswer(e) {
    const optionEl = e.target.closest('.option');
    if (!optionEl) return;

    const questionEl = optionEl.closest('.question-item');
    const questionIndex = parseInt(questionEl.dataset.questionIndex);
    const optionIndex = parseInt(optionEl.dataset.optionIndex);

    // Remove previous selection
    questionEl.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));

    // Select new option
    optionEl.classList.add('selected');
    this.answers[questionIndex] = optionIndex;
  }

  /**
   * Calculate score
   */
  calculateScore() {
    let score = 0;
    this.questions.forEach((question, index) => {
      if (this.answers[index] === question.answer) {
        score++;
      }
    });
    return score;
  }

  /**
   * Finish the quiz and show results
   */
  finishQuiz() {
    this.score = this.calculateScore();
    const percentage = Math.round((this.score / this.questions.length) * 100);
    this.showResultsSection(percentage);
  }

  /**
   * Show quiz section
   */
  showQuizSection() {
    document.getElementById('setupSection').style.display = 'none';
    document.getElementById('quizSection').style.display = 'block';
    document.getElementById('resultsSection').style.display = 'none';
  }

  /**
   * Show results section
   */
  showResultsSection(percentage) {
    document.getElementById('quizSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'block';
    document.getElementById('reviewSection').style.display = 'none';

    // Set score and total
    document.getElementById('finalScore').textContent = this.score;
    document.getElementById('totalQuestions').textContent = this.questions.length;
    document.getElementById('scorePercentage').textContent = `${isNaN(percentage) ? 0 : percentage}%`;

    let resultText = 
      percentage >= 80 ? '🎉 Excellent!' :
      percentage >= 60 ? '👍 Good Job!' :
      percentage >= 40 ? '📚 Keep Practicing!' :
      '💪 Try Again!';

    document.getElementById('resultMessage').textContent = resultText;
  }

  /**
   * Show review section with detailed answers
   */
  showReviewSection() {
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('reviewSection').style.display = 'block';
    
    const reviewContainer = document.getElementById('reviewContainer');
    reviewContainer.innerHTML = '';

    // Build review items for each question
    this.questions.forEach((question, index) => {
      const userAnswer = this.answers[index];
      const correctAnswer = question.answer;
      const isCorrect = userAnswer === correctAnswer;

      // Build question text with placeholders filled
      const questionText = this.buildQuestionText(question);

      // Get answer text
      const userAnswerText = userAnswer !== null ? question.options[userAnswer] : 'Not answered';
      const correctAnswerText = question.options[correctAnswer];

      // Create review item HTML
      const reviewItem = document.createElement('div');
      reviewItem.className = `review-item ${isCorrect ? 'correct' : 'incorrect'}`;
      
      reviewItem.innerHTML = `
        <div class="review-header">
          <span class="review-question-num">Question ${index + 1}</span>
          <span class="review-status ${isCorrect ? 'correct' : 'incorrect'}">
            ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
          </span>
        </div>
        
        <div class="review-question-text">${questionText}</div>
        
        <div class="review-answer-section">
          <div class="review-answer-box user-answer ${isCorrect ? 'correct' : 'incorrect'}">
            <div class="review-answer-label">Your Answer</div>
            <div class="review-answer-value">${userAnswer !== null ? this.letters[userAnswer] : 'N/A'} - ${userAnswerText}</div>
          </div>
          
          <div class="review-answer-box correct-answer">
            <div class="review-answer-label">Correct Answer</div>
            <div class="review-answer-value">${this.letters[correctAnswer]} - ${correctAnswerText}</div>
          </div>
        </div>
      `;

      reviewContainer.appendChild(reviewItem);
    });
  }

  /**
   * Reset quiz to start
   */
  reset() {
    this.questions = [];
    this.answers = [];
    this.studentName = '';
    this.score = 0;
    this.category = '';
    this.difficulty = '';
    this.theme = '';

    // Clean up event listener
    if (this.optionClickHandler) {
      document.getElementById('questionContainer').removeEventListener('click', this.optionClickHandler);
      this.optionClickHandler = null;
    }

    // Reset form
    document.getElementById('studentName').value = '';
    document.getElementById('category').value = 'all';
    document.getElementById('difficulty').value = 'all';
    document.getElementById('theme').value = 'all';

    // Show start section and hide all others
    document.getElementById('setupSection').style.display = 'block';
    document.getElementById('quizSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('reviewSection').style.display = 'none';
  }

  /**
   * Print quiz results
   */
  printQuiz() {
    window.print();
  }

  /**
   * Shuffle options and track the new correct answer index
   */
  shuffleOptions(options, correctAnswerIndex) {
    // Create array of indices [0, 1, 2, 3]
    const indices = options.map((_, i) => i);
    
    // Shuffle the indices
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    
    // Create new shuffled options array
    const shuffledOptions = indices.map(i => options[i]);
    
    // Find where the correct answer moved to
    const newAnswerIndex = indices.indexOf(correctAnswerIndex);
    
    return {
      options: shuffledOptions,
      answerIndex: newAnswerIndex
    };
  }

  /**
   * Utility: Shuffle array
   */
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.scienceQuizApp = new ScienceQuizApp();
});
