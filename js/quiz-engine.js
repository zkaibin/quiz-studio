/**
 * QuizEngine — shared commercial quiz runner for all subjects.
 * Supports step-by-step taking, instant feedback, a11y, explanations, and compact records.
 */
(function (global) {
  'use strict';

  var LETTERS = ['A', 'B', 'C', 'D'];

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function shuffleArray(array) {
    var shuffled = array.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = tmp;
    }
    return shuffled;
  }

  function shuffleOptions(options, correctAnswerIndex) {
    var indices = options.map(function (_, i) { return i; });
    for (var i = indices.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = indices[i];
      indices[i] = indices[j];
      indices[j] = tmp;
    }
    return {
      options: indices.map(function (i) { return options[i]; }),
      answerIndex: indices.indexOf(correctAnswerIndex)
    };
  }

  function QuizEngine(config) {
    this.config = config || {};
    this.subject = this.config.subject || 'math';
    this.title = this.config.title || 'Quiz';
    this.loadPool = this.config.loadPool;
    this.getCharacters = this.config.getCharacters || function () { return []; };
    this.onReady = this.config.onReady || function () {};

    this.questions = [];
    this.answers = [];
    this.revealed = [];
    this.currentIndex = 0;
    this.studentName = '';
    this.score = 0;
    this.category = 'all';
    this.difficulty = 'all';
    this.theme = 'all';
    this.pointsEarned = 0;
    this._boundKeyHandler = this._onKeyDown.bind(this);

    this._bindUi();
  }

  QuizEngine.prototype._el = function (id) {
    return document.getElementById(id);
  };

  QuizEngine.prototype._bindUi = function () {
    var self = this;
    var startBtn = this._el('startQuizBtn');
    if (startBtn) startBtn.addEventListener('click', function () { self.startQuiz(); });

    var prevBtn = this._el('prevQuestionBtn');
    if (prevBtn) prevBtn.addEventListener('click', function () { self.goTo(self.currentIndex - 1); });

    var nextBtn = this._el('nextQuestionBtn');
    if (nextBtn) nextBtn.addEventListener('click', function () { self.goTo(self.currentIndex + 1); });

    var checkBtn = this._el('checkAnswerBtn');
    if (checkBtn) checkBtn.addEventListener('click', function () { self.checkCurrent(); });

    var submitBtn = this._el('submitBtn');
    if (submitBtn) submitBtn.addEventListener('click', function () { self.finishQuiz(); });

    var reviewBtn = this._el('reviewBtn');
    if (reviewBtn) reviewBtn.addEventListener('click', function () { self.showReviewSection(); });

    var retakeBtn = this._el('retakeQuizBtn');
    if (retakeBtn) retakeBtn.addEventListener('click', function () { self.reset(); });

    var backToResultsBtn = this._el('backToResultsBtn');
    if (backToResultsBtn) {
      backToResultsBtn.addEventListener('click', function () {
        self._show('resultsSection');
        self._hide('reviewSection');
      });
    }

    var printBtn = this._el('printBtn');
    if (printBtn) printBtn.addEventListener('click', function () { window.print(); });

    var paperToggle = this._el('paperModeToggle');
    if (paperToggle) {
      paperToggle.addEventListener('change', function () {
        if (self.questions.length) self.renderQuestion();
      });
    }
  };

  QuizEngine.prototype.assignCharactersToRoles = function (roles, themeId) {
    var characters = this.getCharacters(themeId) || [];
    if (!characters.length) characters = this.getCharacters('all') || [];
    var used = {};
    return (roles || []).map(function (role) {
      var matching = characters.filter(function (c) {
        return c.roles && c.roles.indexOf(role) !== -1 && !used[c.name];
      });
      var candidates = matching.length
        ? matching
        : characters.filter(function (c) { return !used[c.name]; });
      if (!candidates.length) candidates = characters;
      var pick = candidates[Math.floor(Math.random() * candidates.length)];
      var name = pick && pick.name ? pick.name : 'Student';
      used[name] = true;
      return name;
    });
  };

  QuizEngine.prototype.buildQuestionText = function (question) {
    var html = '';
    if (question.experiment_setup) {
      var setup = question.experiment_setup;
      if (question.placeholders) {
        question.placeholders.forEach(function (placeholder, index) {
          setup = setup.replace(new RegExp('\\{CHARACTER_' + index + '\\}', 'g'), '<strong>' + escapeHtml(placeholder) + '</strong>');
        });
      }
      html += '<div class="experiment-setup"><strong>Experiment setup</strong><br>' + setup + '</div>';
    }
    if (question.experiment_data) {
      html += '<div class="experiment-data">' + question.experiment_data + '</div>';
    }
    if (question.diagram) {
      var diagram = question.diagram;
      if (question.placeholders) {
        question.placeholders.forEach(function (placeholder, index) {
          diagram = diagram.replace(new RegExp('\\{CHARACTER_' + index + '\\}', 'g'), escapeHtml(placeholder));
        });
      }
      html += '<div class="question-diagram" role="img" aria-label="Question diagram">' + diagram + '</div>';
    }
    var text = question.template || '';
    if (question.placeholders) {
      question.placeholders.forEach(function (placeholder, index) {
        text = text.replace(new RegExp('\\{CHARACTER_' + index + '\\}', 'g'), '<strong>' + escapeHtml(placeholder) + '</strong>');
        text = text.replace(new RegExp('\\{DESCRIPTOR_' + index + '\\}', 'g'), '<strong>' + escapeHtml(placeholder) + '</strong>');
      });
    }
    html += text;
    return html;
  };

  QuizEngine.prototype.prepareQuestion = function (raw, theme) {
    var question = clone(raw);
    if (question.placeholder_roles && question.placeholder_roles.length) {
      question.placeholders = this.assignCharactersToRoles(question.placeholder_roles, theme);
    }
    if ((!question.correct_answer || question.correct_answer === '') && question.options && question.answer != null) {
      question.correct_answer = question.options[question.answer];
    }
    if (!question.explanation) {
      question.explanation = this.fallbackExplanation(question);
    }
    var shuffled = shuffleOptions(question.options || [], question.answer);
    question.options = shuffled.options;
    question.answer = shuffled.answerIndex;
    return question;
  };

  QuizEngine.prototype.fallbackExplanation = function (question) {
    var correct = (question.options && question.options[question.answer]) || question.correct_answer || 'the highlighted option';
    var category = question.category || 'this topic';
    return 'The correct answer is ' + correct + '. Review the ' + category + ' steps and try a similar question to lock in the method.';
  };

  QuizEngine.prototype.startQuiz = async function () {
    var nameInput = this._el('studentName');
    var studentName = nameInput ? nameInput.value.trim() : 'Learner';
    if (!studentName) {
      this._toast('Please enter your name to start.');
      if (nameInput) nameInput.focus();
      return;
    }

    var theme = this._el('theme') ? this._el('theme').value : 'all';
    var category = this._el('category') ? this._el('category').value : 'all';
    var difficulty = this._el('difficulty') ? this._el('difficulty').value : 'all';
    var questionCount = parseInt(this._el('questionCount') ? this._el('questionCount').value : '10', 10) || 10;

    this.studentName = studentName;
    this.theme = theme;
    this.category = category;
    this.difficulty = difficulty;

    var startBtn = this._el('startQuizBtn');
    var originalText = startBtn ? startBtn.textContent : '';
    if (startBtn) {
      startBtn.textContent = 'Loading questions…';
      startBtn.disabled = true;
    }

    try {
      if (typeof this.loadPool !== 'function') throw new Error('Missing loadPool');
      var pool = await this.loadPool({
        category: category,
        difficulty: difficulty,
        theme: theme,
        count: questionCount
      });
      if (!Array.isArray(pool) || !pool.length) {
        this._toast('No questions available for this selection. Try another category or level.');
        return;
      }

      if (window.QuizPersonalization && typeof window.QuizPersonalization.getPrioritizedQuestions === 'function') {
        pool = await window.QuizPersonalization.getPrioritizedQuestions(this.subject, pool);
      } else {
        pool = shuffleArray(pool);
      }

      this.questions = pool.slice(0, questionCount).map(function (q) {
        return this.prepareQuestion(q, theme);
      }.bind(this));

      this.answers = new Array(this.questions.length).fill(null);
      this.revealed = new Array(this.questions.length).fill(false);
      this.currentIndex = 0;
      this.score = 0;
      this.pointsEarned = 0;

      this._showQuiz();
      this.renderQuestion();
      document.addEventListener('keydown', this._boundKeyHandler);
    } catch (err) {
      console.error(err);
      this._toast('Failed to load questions. Please try again.');
    } finally {
      if (startBtn) {
        startBtn.textContent = originalText;
        startBtn.disabled = false;
      }
    }
  };

  QuizEngine.prototype.isPaperMode = function () {
    var toggle = this._el('paperModeToggle');
    return !!(toggle && toggle.checked);
  };

  QuizEngine.prototype.renderQuestion = function () {
    if (this.isPaperMode()) {
      this.renderPaperMode();
      return;
    }

    var container = this._el('questionContainer');
    if (!container || !this.questions.length) return;

    var index = this.currentIndex;
    var question = this.questions[index];
    var selected = this.answers[index];
    var revealed = this.revealed[index];

    this._updateMeta();
    this._updateProgress();

    var optionsHtml = '';
    (question.options || []).forEach(function (option, optIndex) {
      var classes = ['option'];
      if (selected === optIndex) classes.push('selected');
      if (revealed) {
        if (optIndex === question.answer) classes.push('correct');
        else if (selected === optIndex) classes.push('incorrect');
      }
      optionsHtml +=
        '<button type="button" class="' + classes.join(' ') + '" role="radio" aria-checked="' + (selected === optIndex) + '"' +
        ' data-option-index="' + optIndex + '"' + (revealed ? ' disabled' : '') + '>' +
        '<span class="option-letter" aria-hidden="true">' + LETTERS[optIndex] + '</span>' +
        '<span class="option-text">' + escapeHtml(option) + '</span>' +
        '</button>';
    });

    var feedback = '';
    if (revealed) {
      var ok = selected === question.answer;
      feedback =
        '<div class="instant-feedback ' + (ok ? 'is-correct' : 'is-incorrect') + '" role="status">' +
        '<div class="instant-feedback-title">' + (ok ? 'Correct' : 'Not quite') + '</div>' +
        '<p class="instant-feedback-body">' + escapeHtml(question.explanation || this.fallbackExplanation(question)) + '</p>' +
        '</div>';
    }

    container.innerHTML =
      '<div class="question-item question-step" data-question-index="' + index + '">' +
      '<div class="question-number">Question ' + (index + 1) + ' of ' + this.questions.length + '</div>' +
      '<div class="question-text">' + this.buildQuestionText(question) + '</div>' +
      '<div class="options" role="radiogroup" aria-label="Answer choices">' + optionsHtml + '</div>' +
      feedback +
      '</div>';

    container.querySelectorAll('.option').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var opt = parseInt(btn.getAttribute('data-option-index'), 10);
        this.selectAnswer(index, opt);
      }.bind(this));
    }.bind(this));

    this._updateNavButtons();
  };

  QuizEngine.prototype.renderPaperMode = function () {
    var container = this._el('questionContainer');
    if (!container) return;
    this._updateMeta();
    this._updateProgress();

    var html = '';
    this.questions.forEach(function (question, index) {
      var selected = this.answers[index];
      html += '<div class="question-item" data-question-index="' + index + '">';
      html += '<div class="question-number">Question ' + (index + 1) + '</div>';
      html += '<div class="question-text">' + this.buildQuestionText(question) + '</div>';
      html += '<div class="options" role="radiogroup" aria-label="Question ' + (index + 1) + ' choices">';
      (question.options || []).forEach(function (option, optIndex) {
        var selectedClass = selected === optIndex ? ' selected' : '';
        html +=
          '<button type="button" class="option' + selectedClass + '" role="radio" aria-checked="' + (selected === optIndex) + '"' +
          ' data-option-index="' + optIndex + '">' +
          '<span class="option-letter" aria-hidden="true">' + LETTERS[optIndex] + '</span>' +
          '<span class="option-text">' + escapeHtml(option) + '</span></button>';
      });
      html += '</div></div>';
    }.bind(this));
    container.innerHTML = html;

    container.querySelectorAll('.question-item').forEach(function (item) {
      var qIndex = parseInt(item.getAttribute('data-question-index'), 10);
      item.querySelectorAll('.option').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var opt = parseInt(btn.getAttribute('data-option-index'), 10);
          this.selectAnswer(qIndex, opt);
        }.bind(this));
      }.bind(this));
    }.bind(this));

    this._updateNavButtons();
  };

  QuizEngine.prototype.selectAnswer = function (questionIndex, optionIndex) {
    if (this.revealed[questionIndex] && !this.isPaperMode()) return;
    this.answers[questionIndex] = optionIndex;
    this.renderQuestion();
  };

  QuizEngine.prototype.checkCurrent = function () {
    if (this.isPaperMode()) return;
    if (this.answers[this.currentIndex] == null) {
      this._toast('Pick an answer before checking.');
      return;
    }
    this.revealed[this.currentIndex] = true;
    this.renderQuestion();
  };

  QuizEngine.prototype.goTo = function (index) {
    if (index < 0 || index >= this.questions.length) return;
    this.currentIndex = index;
    this.renderQuestion();
  };

  QuizEngine.prototype._onKeyDown = function (e) {
    if (!this.questions.length) return;
    var quizVisible = this._el('quizSection') && this._el('quizSection').style.display !== 'none';
    if (!quizVisible) return;
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA')) return;

    var key = e.key.toLowerCase();
    if (key === 'arrowleft') {
      e.preventDefault();
      this.goTo(this.currentIndex - 1);
    } else if (key === 'arrowright') {
      e.preventDefault();
      this.goTo(this.currentIndex + 1);
    } else if (key === 'enter') {
      e.preventDefault();
      if (!this.revealed[this.currentIndex]) this.checkCurrent();
      else if (this.currentIndex < this.questions.length - 1) this.goTo(this.currentIndex + 1);
    } else if (key.length === 1) {
      var letterIndex = LETTERS.indexOf(key.toUpperCase());
      if (letterIndex >= 0 && letterIndex < (this.questions[this.currentIndex].options || []).length) {
        e.preventDefault();
        this.selectAnswer(this.currentIndex, letterIndex);
      }
    }
  };

  QuizEngine.prototype._updateMeta = function () {
    if (this._el('studentNameDisplay')) this._el('studentNameDisplay').textContent = this.studentName;
    if (this._el('quizCategoryDisplay')) this._el('quizCategoryDisplay').textContent = this.category === 'all' ? 'All categories' : this.category;
    if (this._el('quizDifficultyDisplay')) this._el('quizDifficultyDisplay').textContent = this.difficulty === 'all' ? 'All levels' : this.difficulty;
    if (this._el('quizThemeDisplay')) this._el('quizThemeDisplay').textContent = this.theme === 'all' ? 'All themes' : ('Theme ' + this.theme);
    if (this._el('quizTitle')) this._el('quizTitle').textContent = this.title;
  };

  QuizEngine.prototype._updateProgress = function () {
    var answered = this.answers.filter(function (a) { return a != null; }).length;
    var pct = this.questions.length ? Math.round((answered / this.questions.length) * 100) : 0;
    var fill = this._el('progressFill');
    var text = this._el('progressText');
    if (fill) fill.style.width = pct + '%';
    if (text) text.textContent = answered + ' of ' + this.questions.length + ' answered';
  };

  QuizEngine.prototype._updateNavButtons = function () {
    var prevBtn = this._el('prevQuestionBtn');
    var nextBtn = this._el('nextQuestionBtn');
    var checkBtn = this._el('checkAnswerBtn');
    var paper = this.isPaperMode();

    if (prevBtn) {
      prevBtn.disabled = paper || this.currentIndex <= 0;
      prevBtn.style.display = paper ? 'none' : '';
    }
    if (nextBtn) {
      nextBtn.disabled = paper || this.currentIndex >= this.questions.length - 1;
      nextBtn.style.display = paper ? 'none' : '';
    }
    if (checkBtn) checkBtn.style.display = paper ? 'none' : '';
  };

  QuizEngine.prototype.unansweredCount = function () {
    return this.answers.filter(function (a) { return a == null; }).length;
  };

  QuizEngine.prototype.finishQuiz = async function () {
    var unanswered = this.unansweredCount();
    if (unanswered > 0) {
      var ok = window.confirm(unanswered + ' question' + (unanswered === 1 ? '' : 's') + ' still unanswered. Submit anyway? Unanswered items count as incorrect.');
      if (!ok) return;
    }

    this.score = 0;
    this.questions.forEach(function (question, index) {
      if (this.answers[index] === question.answer) this.score += 1;
    }.bind(this));

    var percentage = Math.round((this.score / this.questions.length) * 100);
    if (window.dataManager && typeof window.dataManager.saveSession === 'function') {
      window.dataManager.saveSession(this.studentName, this.score, this.questions.length);
    } else if (typeof dataManager !== 'undefined' && dataManager.saveSession) {
      dataManager.saveSession(this.studentName, this.score, this.questions.length);
    }

    this.pointsEarned = await this.saveQuizRecord(percentage);
    document.removeEventListener('keydown', this._boundKeyHandler);
    this.showResultsSection(percentage);
  };

  QuizEngine.prototype.buildCompactPayload = function (percentage) {
    return {
      user_id: null,
      student_name: this.studentName,
      subject: this.subject,
      category: this.category || 'all',
      difficulty: this.difficulty || 'all',
      theme: this.theme || 'all',
      score: this.score,
      total_questions: this.questions.length,
      percentage: isNaN(percentage) ? 0 : percentage,
      answers: this.answers.slice(),
      question_summaries: this.questions.map(function (q) {
        return {
          id: q.id,
          category: q.category || null,
          difficulty: q.difficulty || null,
          answer: q.answer,
          correct_answer: q.correct_answer || (q.options ? q.options[q.answer] : null),
          options: q.options,
          template: q.template,
          placeholders: q.placeholders || [],
          explanation: q.explanation || null,
          has_diagram: !!q.diagram
        };
      }),
      // Keep thin legacy fields for personalization without shipping SVG blobs
      questions: this.questions.map(function (q) {
        return {
          id: q.id,
          category: q.category,
          difficulty: q.difficulty,
          answer: q.answer,
          options: q.options,
          template: q.template,
          placeholders: q.placeholders || [],
          explanation: q.explanation || null
        };
      }),
      skill_stats: this.buildSkillStats()
    };
  };

  QuizEngine.prototype.buildSkillStats = function () {
    var map = {};
    this.questions.forEach(function (q, index) {
      var key = q.category || 'General';
      if (!map[key]) map[key] = { correct: 0, total: 0 };
      map[key].total += 1;
      if (this.answers[index] === q.answer) map[key].correct += 1;
    }.bind(this));
    return map;
  };

  QuizEngine.prototype.saveQuizRecord = async function (percentage) {
    if (!window.FB_AUTH || !window.QuizRewards) return 0;
    try {
      var user = window.FB_AUTH.currentUser;
      if (!user) return 0;
      var payload = this.buildCompactPayload(percentage);
      payload.user_id = user.uid;
      return await window.QuizRewards.saveQuizWithPoints(null, null, payload);
    } catch (e) {
      console.warn('Could not save quiz record:', e);
      return 0;
    }
  };

  QuizEngine.prototype.showResultsSection = function (percentage) {
    this._hide('quizSection');
    this._show('resultsSection');
    this._hide('reviewSection');

    if (this._el('finalScore')) this._el('finalScore').textContent = this.score;
    if (this._el('totalQuestions')) this._el('totalQuestions').textContent = this.questions.length;
    if (this._el('scorePercentage')) this._el('scorePercentage').textContent = (isNaN(percentage) ? 0 : percentage) + '%';

    var resultText =
      percentage >= 80 ? 'Excellent work — keep stretching with harder sets.' :
      percentage >= 60 ? 'Solid effort — review the misses and try again.' :
      percentage >= 40 ? 'Good start — focus on the weak topics below.' :
      'Keep going — short daily practice builds mastery.';
    if (this._el('resultMessage')) this._el('resultMessage').textContent = resultText;

    var pointsEl = this._el('pointsEarned');
    if (pointsEl) {
      var pts = this.pointsEarned || 0;
      pointsEl.textContent = pts > 0 ? '+' + pts + ' points earned' : '';
      pointsEl.style.display = pts > 0 ? 'block' : 'none';
    }

    var weakEl = this._el('weakTopicsSummary');
    if (weakEl) {
      var stats = this.buildSkillStats();
      var weak = Object.keys(stats)
        .map(function (k) { return { category: k, rate: stats[k].correct / stats[k].total, total: stats[k].total, correct: stats[k].correct }; })
        .filter(function (s) { return s.rate < 0.7; })
        .sort(function (a, b) { return a.rate - b.rate; })
        .slice(0, 3);
      if (!weak.length) {
        weakEl.innerHTML = '<p class="weak-topics-empty">No weak topics this round — nice consistency.</p>';
      } else {
        weakEl.innerHTML = '<h3>Focus next</h3><ul class="weak-topics-list">' + weak.map(function (w) {
          var href = this._practiceHref(w.category);
          return '<li><span>' + escapeHtml(w.category) + ' (' + w.correct + '/' + w.total + ')</span>' +
            (href ? ' <a class="practice-link" href="' + href + '">Practice</a>' : '') + '</li>';
        }.bind(this)).join('') + '</ul>';
      }
    }
  };

  QuizEngine.prototype._practiceHref = function (category) {
    var page = this.config.quizPage || (this.subject + '-quiz.html');
    if (this.subject === 'math') page = 'quiz.html';
    return page + '?category=' + encodeURIComponent(category);
  };

  QuizEngine.prototype.showReviewSection = function () {
    this._hide('resultsSection');
    this._show('reviewSection');
    var reviewContainer = this._el('reviewContainer');
    if (!reviewContainer) return;
    reviewContainer.innerHTML = '';

    this.questions.forEach(function (question, index) {
      var userAnswer = this.answers[index];
      var isCorrect = userAnswer === question.answer;
      var userAnswerText = userAnswer == null ? 'Not answered' : (question.options[userAnswer] || 'Not answered');
      var correctAnswerText = question.options[question.answer];
      var letterUser = userAnswer == null ? '—' : LETTERS[userAnswer];

      var item = document.createElement('div');
      item.className = 'review-item ' + (isCorrect ? 'correct' : 'incorrect');
      item.innerHTML =
        '<div class="review-header">' +
        '<span class="review-question-num">Question ' + (index + 1) + '</span>' +
        '<span class="review-status ' + (isCorrect ? 'correct' : 'incorrect') + '">' +
        (isCorrect ? 'Correct' : 'Incorrect') + '</span></div>' +
        '<div class="review-question-text">' + this.buildQuestionText(question) + '</div>' +
        '<div class="review-answer-section">' +
        '<div class="review-answer-box user-answer ' + (isCorrect ? 'correct' : 'incorrect') + '">' +
        '<div class="review-answer-label">Your answer</div>' +
        '<div class="review-answer-value">' + letterUser + ' — ' + escapeHtml(userAnswerText) + '</div></div>' +
        '<div class="review-answer-box correct-answer">' +
        '<div class="review-answer-label">Correct answer</div>' +
        '<div class="review-answer-value">' + LETTERS[question.answer] + ' — ' + escapeHtml(correctAnswerText) + '</div></div>' +
        '</div>' +
        '<div class="review-explanation"><strong>Why</strong><p>' + escapeHtml(question.explanation || this.fallbackExplanation(question)) + '</p></div>';
      reviewContainer.appendChild(item);
    }.bind(this));
  };

  QuizEngine.prototype.reset = function () {
    document.removeEventListener('keydown', this._boundKeyHandler);
    this.questions = [];
    this.answers = [];
    this.revealed = [];
    this.currentIndex = 0;
    this.score = 0;
    this.pointsEarned = 0;

    var nameInput = this._el('studentName');
    if (nameInput && !nameInput.readOnly) nameInput.value = '';
    ['category', 'difficulty', 'theme'].forEach(function (id) {
      var el = this._el(id);
      if (el) el.value = 'all';
    }.bind(this));

    this._show('setupSection');
    this._hide('quizSection');
    this._hide('resultsSection');
    this._hide('reviewSection');
    this.applyQueryDefaults();
  };

  QuizEngine.prototype.applyQueryDefaults = function () {
    try {
      var params = new URLSearchParams(window.location.search);
      var category = params.get('category');
      var difficulty = params.get('difficulty');
      if (category && this._el('category')) this._el('category').value = category;
      if (difficulty && this._el('difficulty')) this._el('difficulty').value = difficulty;
    } catch (e) { /* ignore */ }
  };

  QuizEngine.prototype._showQuiz = function () {
    this._hide('setupSection');
    this._show('quizSection');
    this._hide('resultsSection');
    this._hide('reviewSection');
  };

  QuizEngine.prototype._show = function (id) {
    var el = this._el(id);
    if (!el) return;
    el.classList.remove('hidden');
    el.style.display = 'block';
  };

  QuizEngine.prototype._hide = function (id) {
    var el = this._el(id);
    if (!el) return;
    el.classList.add('hidden');
    el.style.display = 'none';
  };

  QuizEngine.prototype._toast = function (message) {
    var existing = document.querySelector('.qs-toast');
    if (existing) existing.remove();
    var toast = document.createElement('div');
    toast.className = 'qs-toast';
    toast.setAttribute('role', 'alert');
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(function () { toast.classList.add('is-visible'); }, 10);
    setTimeout(function () {
      toast.classList.remove('is-visible');
      setTimeout(function () { toast.remove(); }, 250);
    }, 2800);
  };

  global.QuizEngine = QuizEngine;
  global.QuizEngineUtils = {
    shuffleArray: shuffleArray,
    shuffleOptions: shuffleOptions,
    escapeHtml: escapeHtml,
    LETTERS: LETTERS
  };
})(window);
