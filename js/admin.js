/**
 * Admin App - Frontend only, manages quiz data using JSON and localStorage
 */

class AdminApp {
  constructor() {
    this.setupEventListeners();
    this.initializeApp();
  }

  async initializeApp() {
    try {
      await dataManager.loadData();
      this.loadQuestions();
      this.loadSessions();
    } catch (err) {
      console.error('Error initializing admin:', err);
    }
  }

  setupEventListeners() {
    // Navigation
    document.querySelectorAll('[data-section]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchSection(btn.dataset.section);
      });
    });

    // Question form
    document.getElementById('addQuestionBtn')?.addEventListener('click', () => this.addQuestion());
    document.getElementById('deleteAllBtn')?.addEventListener('click', () => this.deleteAllSessions());
    document.getElementById('exportBtn')?.addEventListener('click', () => this.exportData());
    document.getElementById('importBtn')?.addEventListener('click', () => this.importData());
    document.getElementById('backBtn')?.addEventListener('click', () => {
      window.location.href = '/quiz-studio/index.html';
    });
  }

  switchSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
      section.style.display = 'none';
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionName + 'Section');
    if (selectedSection) {
      selectedSection.style.display = 'block';
    }

    // Update active nav
    document.querySelectorAll('[data-section]').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionName}"]`)?.classList.add('active');

    // Load section-specific data
    if (sectionName === 'questions') {
      this.loadQuestions();
    } else if (sectionName === 'sessions') {
      this.loadSessions();
    }
  }

  /**
   * Load and display all questions
   */
  loadQuestions() {
    const questions = dataManager.getQuestions();
    const container = document.getElementById('questionsList');

    if (!container) return;

    if (questions.length === 0) {
      container.innerHTML = '<p>No questions yet. Add one below!</p>';
      return;
    }

    let html = '<table class="data-table"><thead><tr><th>ID</th><th>Category</th><th>Difficulty</th><th>Template</th><th>Action</th></tr></thead><tbody>';

    questions.forEach(q => {
      html += `
        <tr>
          <td>${q.id}</td>
          <td>${q.category}</td>
          <td>${q.difficulty}</td>
          <td>${q.template.substring(0, 40)}...</td>
          <td><button class="btn-small" onclick="adminApp.deleteQuestion(${q.id})">Delete</button></td>
        </tr>
      `;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
  }

  /**
   * Add a new question
   */
  addQuestion() {
    const category = document.getElementById('questionCategory')?.value;
    const difficulty = document.getElementById('questionDifficulty')?.value;
    const template = document.getElementById('questionTemplate')?.value;
    const placeholders = document.getElementById('questionPlaceholders')?.value.split(',').map(p => p.trim()) || [];
    const optionsStr = document.getElementById('questionOptions')?.value || '';
    const options = optionsStr.split('|').map(o => o.trim());
    const answer = parseInt(document.getElementById('questionAnswer')?.value || 0);

    if (!category || !difficulty || !template) {
      alert('Please fill in all required fields');
      return;
    }

    const question = {
      category,
      difficulty,
      template,
      placeholders,
      options,
      answer
    };

    dataManager.addQuestion(question);

    // Reset form
    document.getElementById('questionCategory').value = '';
    document.getElementById('questionDifficulty').value = '';
    document.getElementById('questionTemplate').value = '';
    document.getElementById('questionPlaceholders').value = '';
    document.getElementById('questionOptions').value = '';
    document.getElementById('questionAnswer').value = '0';

    alert('Question added successfully!');
    this.loadQuestions();
  }

  /**
   * Delete a question
   */
  deleteQuestion(id) {
    if (confirm('Are you sure you want to delete this question?')) {
      dataManager.deleteQuestion(id);
      this.loadQuestions();
    }
  }

  /**
   * Load and display all sessions
   */
  loadSessions() {
    const sessions = dataManager.getSessions();
    const container = document.getElementById('sessionsList');

    if (!container) return;

    if (sessions.length === 0) {
      container.innerHTML = '<p>No quiz sessions yet.</p>';
      return;
    }

    let html = '<table class="data-table"><thead><tr><th>Student</th><th>Score</th><th>Total</th><th>Percentage</th><th>Date</th></tr></thead><tbody>';

    sessions.forEach(s => {
      const percentage = Math.round((s.score / s.total_questions) * 100);
      const date = new Date(s.timestamp).toLocaleDateString();
      html += `
        <tr>
          <td>${s.student_name}</td>
          <td>${s.score}</td>
          <td>${s.total_questions}</td>
          <td>${percentage}%</td>
          <td>${date}</td>
        </tr>
      `;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
  }

  /**
   * Delete all sessions
   */
  deleteAllSessions() {
    if (confirm('Are you sure you want to delete all quiz sessions? This cannot be undone.')) {
      dataManager.clearSessions();
      alert('All sessions deleted!');
      this.loadSessions();
    }
  }

  /**
   * Export all data as JSON
   */
  exportData() {
    const data = dataManager.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Import data from JSON
   */
  importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const success = dataManager.importData(event.target.result);
          if (success) {
            alert('Data imported successfully!');
            this.loadQuestions();
            this.loadSessions();
          } else {
            alert('Failed to import data');
          }
        } catch (err) {
          alert('Error importing file: ' + err.message);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }
}

// Initialize admin app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.adminApp = new AdminApp();
});
