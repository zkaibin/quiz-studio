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
      
      await dataManager.loadData();
      
      console.log('📊 dataManager.loaded after:', dataManager.loaded);
      console.log('❓ dataManager.data.questions.length after:', dataManager.data.questions.length);
      console.log('📚 Questions:', JSON.stringify(dataManager.data.questions.slice(0, 2), null, 2));
      
      this.populateDropdowns();
      console.log('✓ populateDropdowns() completed');
    } catch (err) {
      console.error('❌ Error initializing app:', err);
    }
  }

  /**
   * Populate category and difficulty dropdowns
   */
  populateDropdowns() {
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
    
    const categories = dataManager.getCategories();
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
    document.getElementById('startQuizBtn').addEventListener('click', () => this.startQuiz());
    document.getElementById('submitBtn').addEventListener('click', () => this.finishQuiz());
    document.getElementById('printBtn').addEventListener('click', () => this.printQuiz());
    document.getElementById('retakeQuizBtn').addEventListener('click', () => this.reset());
    document.getElementById('adminBtn').addEventListener('click', () => {
      window.location.href = '/quiz-studio/admin.html';
    });
  }

  /**
   * Start a new quiz
   */
  startQuiz() {
    const studentName = document.getElementById('studentName').value.trim();
    const category = document.getElementById('category').value;
    const difficulty = document.getElementById('difficulty').value;
    const questionCount = parseInt(document.getElementById('questionCount').value);

    if (!studentName) {
      alert('Please enter your name!');
      return;
    }

    this.studentName = studentName;
    this.category = category;
    this.difficulty = difficulty;

    // Get questions based on criteria
    let allQuestions = dataManager.getQuestions(category, difficulty);

    // Shuffle and select random questions
    allQuestions = this.shuffleArray(allQuestions);
    this.questions = allQuestions.slice(0, questionCount);

    if (this.questions.length === 0) {
      alert('No questions available for this criteria');
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

    // Generate HTML for all questions
    this.questions.forEach((question, index) => {
      const options = this.generateOptions(question.id);
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
   * Build question text with placeholders substituted
   */
  buildQuestionText(question) {
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
    return text;
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
      const userAnswer = this.answers[index];
      const correctAnswer = question.answer;
      const isCorrect = userAnswer === correctAnswer;
      
      console.log(`Q${index + 1} (ID: ${question.id}): User=${userAnswer}, Correct=${correctAnswer}, Match=${isCorrect}`);
      console.log(`  Template: ${question.template.substring(0, 50)}...`);
      console.log(`  Options: ${JSON.stringify(question.options)}`);
      console.log(`  User selected option: ${question.options[userAnswer] || 'none'}`);
      console.log(`  Correct option: ${question.options[correctAnswer] || 'none'}`);
      
      if (isCorrect) {
        score++;
      }
    });
    console.log(`Final score: ${score}/${this.questions.length}`);
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

    document.getElementById('finalScore').textContent = this.score;
    document.getElementById('totalQuestions').textContent = this.questions.length;
    document.getElementById('scorePercentage').textContent = `${percentage}%`;

    const resultText = 
      percentage >= 80 ? '🎉 Excellent!' :
      percentage >= 60 ? '👍 Good Job!' :
      percentage >= 40 ? '📚 Keep Practicing!' :
      '💪 Try Again!';

    document.getElementById('resultMessage').textContent = resultText;
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

    // Clean up event listener
    if (this.optionClickHandler) {
      document.getElementById('questionContainer').removeEventListener('click', this.optionClickHandler);
      this.optionClickHandler = null;
    }

    // Reset form
    document.getElementById('studentName').value = '';
    document.getElementById('category').value = '';
    document.getElementById('difficulty').value = '';

    // Show start section
    document.getElementById('setupSection').style.display = 'block';
    document.getElementById('quizSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'none';
  }

  /**
   * Print quiz results
   */
  printQuiz() {
    window.print();
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