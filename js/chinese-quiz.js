/**
 * Chinese Quiz App - Standalone version for Chinese language questions
 */

class ChineseQuizApp {
  constructor() {
    this.questions = [];
    this.answers = [];
    this.studentName = '';
    this.score = 0;
    this.category = '';
    this.difficulty = '';
    this.letters = ['A', 'B', 'C', 'D'];
    this.optionClickHandler = null;
    this.allQuestions = [];

    this.setupEventListeners();
    this.initializeApp();
  }

  /**
   * Initialize the app by loading data
   */
  async initializeApp() {
    try {
      console.log('🚀 Chinese Quiz initializing...');
      await this.loadChineseData();
      await this.populateDropdowns();
      console.log('✓ Chinese Quiz initialized');
    } catch (err) {
      console.error('❌ Error initializing app:', err);
    }
  }

  /**
   * Load Chinese questions from JSON
   */
  async loadChineseData() {
    try {
      const cacheBuster = new Date().getTime();
      const questions = await fetch(`data/questions-chinese.json?v=${cacheBuster}`).then(r => r.json());

      this.allQuestions = questions;

      console.log(`✓ Loaded ${this.allQuestions.length} Chinese questions`);
    } catch (err) {
      console.error('❌ Error loading Chinese data:', err);
      this.allQuestions = [];
    }
  }

  /**
   * Populate category and difficulty dropdowns
   */
  async populateDropdowns() {
    console.log('📋 Populating dropdowns...');

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
    const category = document.getElementById('category').value;
    const difficulty = document.getElementById('difficulty').value;
    const questionCount = parseInt(document.getElementById('questionCount').value);

    if (!studentName) {
      alert('Please enter your name! 请输入姓名！');
      return;
    }

    this.studentName = studentName;
    this.category = category;
    this.difficulty = difficulty;

    // Get questions based on criteria
    let allQuestions = this.getFilteredQuestions(category, difficulty);

    // Shuffle and select random questions
    allQuestions = this.shuffleArray(allQuestions);
    this.questions = allQuestions.slice(0, questionCount).map(q => {
      // Clone question object
      const question = JSON.parse(JSON.stringify(q));

      // Shuffle options for each question and update answer index
      const shuffledData = this.shuffleOptions(question.options, question.answer);
      question.options = shuffledData.options;
      question.answer = shuffledData.answerIndex;

      return question;
    });

    if (this.questions.length === 0) {
      alert('No questions available for this criteria. Please try different filters.\n所选条件下没有题目，请更换筛选条件。');
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

    // Generate HTML for all questions
    this.questions.forEach((question, index) => {
      const options = question.options;
      const selectedAnswer = this.answers[index];

      html += `
        <div class="question-item" data-question-index="${index}">
          <div class="question-number">Question ${index + 1} 第${index + 1}题</div>
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
   * Build question text (convert newlines to <br> for display)
   */
  buildQuestionText(question) {
    return question.template.replace(/\n/g, '<br>');
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

    document.getElementById('finalScore').textContent = this.score;
    document.getElementById('totalQuestions').textContent = this.questions.length;
    document.getElementById('scorePercentage').textContent = `${isNaN(percentage) ? 0 : percentage}%`;

    let resultText =
      percentage >= 80 ? '🎉 太棒了！Excellent!' :
      percentage >= 60 ? '👍 做得好！Good Job!' :
      percentage >= 40 ? '📚 继续加油！Keep Practicing!' :
      '💪 再试一次！Try Again!';

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

    this.questions.forEach((question, index) => {
      const userAnswer = this.answers[index];
      const correctAnswer = question.answer;
      const isCorrect = userAnswer === correctAnswer;

      const questionText = this.buildQuestionText(question);

      const userAnswerText = userAnswer !== null ? question.options[userAnswer] : 'Not answered 未作答';
      const correctAnswerText = question.options[correctAnswer];

      const reviewItem = document.createElement('div');
      reviewItem.className = `review-item ${isCorrect ? 'correct' : 'incorrect'}`;

      reviewItem.innerHTML = `
        <div class="review-header">
          <span class="review-question-num">Question ${index + 1} 第${index + 1}题</span>
          <span class="review-status ${isCorrect ? 'correct' : 'incorrect'}">
            ${isCorrect ? '✓ Correct 正确' : '✗ Incorrect 错误'}
          </span>
        </div>

        <div class="review-question-text">${questionText}</div>

        <div class="review-answer-section">
          <div class="review-answer-box user-answer ${isCorrect ? 'correct' : 'incorrect'}">
            <div class="review-answer-label">Your Answer 你的答案</div>
            <div class="review-answer-value">${userAnswer !== null ? this.letters[userAnswer] : 'N/A'} - ${userAnswerText}</div>
          </div>

          <div class="review-answer-box correct-answer">
            <div class="review-answer-label">Correct Answer 正确答案</div>
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

    // Clean up event listener
    if (this.optionClickHandler) {
      document.getElementById('questionContainer').removeEventListener('click', this.optionClickHandler);
      this.optionClickHandler = null;
    }

    // Reset form
    document.getElementById('studentName').value = '';
    document.getElementById('category').value = 'all';
    document.getElementById('difficulty').value = 'all';

    // Show start section and hide all others
    document.getElementById('setupSection').style.display = 'block';
    document.getElementById('quizSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('reviewSection').style.display = 'none';
  }

  /**
   * Print quiz
   */
  printQuiz() {
    window.print();
  }

  /**
   * Shuffle options and track the new correct answer index
   */
  shuffleOptions(options, correctAnswerIndex) {
    const indices = options.map((_, i) => i);

    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    const shuffledOptions = indices.map(i => options[i]);
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
  window.chineseQuizApp = new ChineseQuizApp();
});
