/**
 * Quiz App - Frontend only, uses JSON data loaded from data-loader.js
 */

class QuizApp {
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

    this.setupEventListeners();
    this.initializeApp();
  }

  /**
   * Initialize the app by loading data
   */
  async initializeApp() {
    try {
      console.log('🚀 initializeApp() starting');
      console.log('📊 dataManager.loaded before:', dataManager.loaded);
      console.log('❓ dataManager.data.questions.length before:', dataManager.data.questions.length);
      
      // Clear out any old cached questions from localStorage
      localStorage.removeItem('custom_questions');
      localStorage.removeItem('custom_characters');
      
      await dataManager.loadData();
      
      console.log('📊 dataManager.loaded after:', dataManager.loaded);
      console.log('❓ dataManager.data.questions.length after:', dataManager.data.questions.length);
      console.log('📚 Questions:', JSON.stringify(dataManager.data.questions.slice(0, 2), null, 2));
      
      await this.populateDropdowns();
      console.log('✓ populateDropdowns() completed');
    } catch (err) {
      console.error('❌ Error initializing app:', err);
    }
  }

  /**
   * Populate category and difficulty dropdowns
   */
  async populateDropdowns() {
    // Populate themes (universes)
    const themeSelect = document.getElementById('theme');
    if (themeSelect && dataManager.data.universes) {
      dataManager.data.universes.forEach(universe => {
        const option = document.createElement('option');
        option.value = universe.id;
        option.textContent = universe.universe_name;
        themeSelect.appendChild(option);
      });
    }
    console.log('🔍 populateDropdowns() called');
    
    // Populate categories
    const categorySelect = document.getElementById('category');
    console.log('📋 categorySelect:', categorySelect);
    console.log('📋 Initial options:', categorySelect.options.length);
    
    // Remove hardcoded options except the "all" option
    const allOptions = categorySelect.querySelectorAll('option:not([value="all"])');
    console.log('🗑️ Removing', allOptions.length, 'hardcoded options');
    allOptions.forEach(opt => {
      console.log('  Removing option:', opt.value);
      opt.remove();
    });
    
    const categories = await dataManager.getCategories();
    console.log('✅ Categories from dataManager:', categories);
    
    categories.forEach(category => {
      console.log('➕ Adding category option:', category);
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });

    // Populate difficulties
    const difficultySelect = document.getElementById('difficulty');
    console.log('📋 difficultySelect:', difficultySelect);
    
    // Remove hardcoded options except the "all" option
    const diffOptions = difficultySelect.querySelectorAll('option:not([value="all"])');
    console.log('🗑️ Removing', diffOptions.length, 'hardcoded difficulty options');
    diffOptions.forEach(opt => {
      console.log('  Removing option:', opt.value);
      opt.remove();
    });
    
    const difficulties = dataManager.getDifficulties();
    console.log('✅ Difficulties from dataManager:', difficulties);
    
    difficulties.forEach(difficulty => {
      console.log('➕ Adding difficulty option:', difficulty);
      const option = document.createElement('option');
      option.value = difficulty;
      option.textContent = difficulty;
      difficultySelect.appendChild(option);
    });
  }

  setupEventListeners() {
    console.log('🔌 setupEventListeners() called');
    
    const startBtn = document.getElementById('startQuizBtn');
    console.log('  startQuizBtn:', startBtn);
    if (startBtn) {
      startBtn.addEventListener('click', (e) => {
        console.log('🖱️ START QUIZ BUTTON CLICKED!', e);
        try {
          this.startQuiz(e);
        } catch (err) {
          console.error('❌ Error in startQuiz():', err);
        }
      });
      console.log('  ✓ startQuizBtn listener attached');
    } else {
      console.log('  ❌ startQuizBtn NOT FOUND!');
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
    
    const retakeFromReviewBtn = document.getElementById('retakeFromReviewBtn');
    if (retakeFromReviewBtn) {
      retakeFromReviewBtn.addEventListener('click', () => this.reset());
    }
    
    const adminBtn = document.getElementById('adminBtn');
    if (adminBtn) {
      adminBtn.addEventListener('click', () => {
        window.location.href = 'admin.html';
      });
    }
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

    // Show loading message
    const startBtn = document.getElementById('startQuizBtn');
    const originalText = startBtn.textContent;
    startBtn.textContent = 'Loading questions...';
    startBtn.disabled = true;

    try {
      // Load questions for selected difficulty
      await dataManager.ensureDifficultyLoaded(difficulty);
      
      // Get questions based on criteria
      let allQuestions = dataManager.getQuestions(category, difficulty);
    
    // Shuffle and select random questions
    allQuestions = this.shuffleArray(allQuestions);
    this.questions = allQuestions.slice(0, questionCount).map(q => {
      // Clone question object to avoid mutating global data
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
      alert('No questions available for this criteria');
      startBtn.textContent = originalText;
      startBtn.disabled = false;
      return;
    }

    this.answers = new Array(this.questions.length).fill(null);
    this.score = 0;

    // Restore button state
    startBtn.textContent = originalText;
    startBtn.disabled = false;

    this.showQuizSection();
    this.displayAllQuestions();
    } catch (error) {
      console.error('Error starting quiz:', error);
      alert('Failed to load questions. Please try again.');
      startBtn.textContent = originalText;
      startBtn.disabled = false;
    }
  }

  /**
   * Display all questions on the page
   */
  displayAllQuestions() {
    const container = document.getElementById('questionContainer');
    let html = '';

    // Clean up old event listener BEFORE resetting innerHTML
    if (this.optionClickHandler) {
      container.removeEventListener('click', this.optionClickHandler);
      this.optionClickHandler = null;
    }

    // Update header info
    document.getElementById('studentNameDisplay').textContent = `Student: ${this.studentName}`;
    document.getElementById('quizCategoryDisplay').textContent = 
      `Category: ${this.category || 'All Categories'}`;
    document.getElementById('quizDifficultyDisplay').textContent = 
      `Level: ${this.difficulty || 'All Levels'}`;
    // Optionally show theme
    if (document.getElementById('quizThemeDisplay')) {
      document.getElementById('quizThemeDisplay').textContent = `Theme: ${this.theme || 'All Themes'}`;
    }

    // Generate HTML for all questions
    this.questions.forEach((question, index) => {
      const options = question.options; // Use shuffled options from this.questions
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
   * Ensures different characters are assigned to different roles
   */
  assignCharactersToRoles(roles, themeId) {
    let availableCharacters;
    
    if (themeId && themeId !== 'all') {
      // Filter characters by selected theme/universe
      const themeUniverseId = parseInt(themeId);
      availableCharacters = dataManager.data.characters.filter(
        c => c.universe_id === themeUniverseId
      );
    } else {
      // Use all characters if no theme selected
      availableCharacters = dataManager.data.characters;
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
      
      // If all characters are used (shouldn't happen), reuse any character
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
    let html = '';
    
    // Add diagram if present
    if (question.diagram) {
      let diagram = question.diagram;
      // Substitute character placeholders in SVG text elements
      if (question.placeholders && question.placeholders.length > 0) {
        question.placeholders.forEach((placeholder, index) => {
          const charRegex = new RegExp(`{CHARACTER_${index}}`, 'g');
          diagram = diagram.replace(charRegex, placeholder);
        });
      }
      html += `<div class="question-diagram">${diagram}</div>`;
    }
    
    // Build question text
    let text = question.template;
    if (question.placeholders && question.placeholders.length > 0) {
      question.placeholders.forEach((placeholder, index) => {
        // Replace all occurrences of the placeholder (not just the first one)
        const charRegex = new RegExp(`{CHARACTER_${index}}`, 'g');
        const descRegex = new RegExp(`{DESCRIPTOR_${index}}`, 'g');
        text = text.replace(charRegex, `<strong>${placeholder}</strong>`);
        text = text.replace(descRegex, `<strong>${placeholder}</strong>`);
      });
    }
    
    html += text;
    return html;
  }

  /**
   * Generate shuffled options
   */
  generateOptions(questionId) {
    const question = dataManager.getQuestion(questionId);
    if (!question) return ['A', 'B', 'C', 'D'];
    return question.options;
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

    // Save session to localStorage
    dataManager.saveSession(this.studentName, this.score, this.questions.length);

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
      console.log('🔎 showReviewSection() called');
      const userAnswer = this.answers[index];
      const correctAnswer = question.answer;
      const isCorrect = userAnswer === correctAnswer;

      // Build question text with placeholders filled (use correct index)
      let questionText = question.template;
      questionText = questionText.replace(/\{(CHARACTER|DESCRIPTOR|NUMBER)_(\d+)\}/g, (match, type, idx) => {
        const value = question.placeholders && question.placeholders[parseInt(idx, 10)];
        return value !== undefined ? value : match;
      });
      console.log('Final questionText:', questionText);

      // Get answer text
      const userAnswerText = question.options[userAnswer] || 'Not answered';
      const correctAnswerText = question.options[correctAnswer];
      console.log('User answer index:', userAnswer, 'text:', userAnswerText);
      console.log('Correct answer index:', correctAnswer, 'text:', correctAnswerText);

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
            <div class="review-answer-value">${this.letters[userAnswer]} - ${userAnswerText}</div>
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
    document.getElementById('resultsSection').style.display = 'none';
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
  window.quizApp = new QuizApp();
});