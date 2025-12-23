/**
 * PSLE Paper Generator
 * Generates printable exam papers following PSLE format
 */

class PaperGenerator {
    constructor() {
        this.dataManager = new DataManager();
        this.universes = [];
        this.characters = [];
        this.allQuestions = [];
        this.selectedQuestions = [];
        this.showingAnswers = false;
        
        this.init();
    }
    
    async init() {
        try {
            // Load all data
            await this.dataManager.loadData();
            this.universes = this.dataManager.getUniverses();
            this.characters = this.dataManager.getCharacters();
            
            console.log('📊 Universes loaded:', this.universes);
            console.log('📊 Characters loaded:', this.characters.length);
            
            // Load all difficulty levels
            await this.dataManager.ensureDifficultyLoaded('P5-P6');
            await this.dataManager.ensureDifficultyLoaded('Challenging');
            await this.dataManager.ensureDifficultyLoaded('PSLE');
            
            this.allQuestions = this.dataManager.data.questions;
            
            // Populate universe checkboxes
            this.populateUniverseSelection();
            
            console.log(`📚 Loaded ${this.allQuestions.length} questions from ${this.universes.length} universes`);
        } catch (error) {
            console.error('Error initializing paper generator:', error);
            alert('Error loading data. Please refresh the page.');
        }
    }
    
    populateUniverseSelection() {
        const container = document.getElementById('universeSelection');
        container.innerHTML = '';
        
        // Add "Select All" option
        const selectAllDiv = document.createElement('div');
        selectAllDiv.innerHTML = `
            <label>
                <input type="checkbox" id="selectAllUniverses" onchange="toggleAllUniverses(this.checked)" checked>
                <strong>Select All</strong>
            </label>
        `;
        container.appendChild(selectAllDiv);
        
        this.universes.forEach(universe => {
            const div = document.createElement('div');
            div.innerHTML = `
                <label>
                    <input type="checkbox" class="universe-checkbox" value="${universe.id}" checked>
                    ${universe.universe_name}
                </label>
            `;
            container.appendChild(div);
        });
    }
    
    getSelectedUniverses() {
        const checkboxes = document.querySelectorAll('.universe-checkbox:checked');
        return Array.from(checkboxes).map(cb => parseInt(cb.value));
    }
    
    getSelectedDifficulties() {
        const difficulties = [];
        if (document.getElementById('includeP5P6').checked) difficulties.push('P5-P6');
        if (document.getElementById('includeChallenging').checked) difficulties.push('Challenging');
        if (document.getElementById('includePSLE').checked) difficulties.push('PSLE');
        return difficulties;
    }
    
    selectQuestions(numQuestions, difficulties, universeIds) {
        // Filter questions by difficulty
        let filteredQuestions = this.allQuestions.filter(q => 
            difficulties.includes(q.difficulty)
        );
        
        if (filteredQuestions.length === 0) {
            alert('No questions available for selected difficulties. Please select at least one difficulty level.');
            return [];
        }
        
        // Shuffle and select questions
        const shuffled = filteredQuestions.sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, Math.min(numQuestions, shuffled.length));
        
        // Assign characters from selected universes
        selected.forEach(question => {
            this.assignCharactersToQuestion(question, universeIds);
        });
        
        return selected;
    }
    
    assignCharactersToQuestion(question, universeIds) {
        // Pick a random universe from selected ones
        const universeId = universeIds[Math.floor(Math.random() * universeIds.length)];
        const universe = this.universes.find(u => u.id === universeId);
        
        // Get characters from this universe
        const universeCharacters = this.characters.filter(c => c.universe_id === universeId);
        
        // Assign characters based on required roles
        const roles = question.placeholder_roles || [];
        const assignedCharacters = {};
        const usedCharacters = new Set(); // Track used character names to avoid duplicates
        
        roles.forEach((role, index) => {
            // Filter out already used characters
            const matchingChars = universeCharacters.filter(c => 
                c.roles.includes(role) && !usedCharacters.has(c.name)
            );
            
            if (matchingChars.length > 0) {
                const char = matchingChars[Math.floor(Math.random() * matchingChars.length)];
                assignedCharacters[`CHARACTER_${index}`] = char.name;
                usedCharacters.add(char.name);
            } else {
                // Fallback to any unused character
                const availableChars = universeCharacters.filter(c => !usedCharacters.has(c.name));
                if (availableChars.length > 0) {
                    const char = availableChars[Math.floor(Math.random() * availableChars.length)];
                    assignedCharacters[`CHARACTER_${index}`] = char.name;
                    usedCharacters.add(char.name);
                } else {
                    // Last resort: use generic name
                    assignedCharacters[`CHARACTER_${index}`] = `Student ${index + 1}`;
                }
            }
        });
        
        // Replace placeholders in template
        let questionText = question.template;
        Object.keys(assignedCharacters).forEach(placeholder => {
            const regex = new RegExp(`\\{${placeholder}\\}`, 'g');
            questionText = questionText.replace(regex, assignedCharacters[placeholder]);
        });
        
        question.questionText = questionText;
        question.universeName = universe ? universe.universe_name : 'General';
    }
    
    generatePaper() {
        const paperType = document.getElementById('paperType').value;
        const numQuestions = parseInt(document.getElementById('numQuestions').value);
        const schoolName = document.getElementById('schoolName').value || 'School Name';
        const examDate = document.getElementById('examDate').value || new Date().toLocaleDateString('en-SG');
        
        const difficulties = this.getSelectedDifficulties();
        const universeIds = this.getSelectedUniverses();
        
        if (difficulties.length === 0) {
            alert('Please select at least one difficulty level.');
            return;
        }
        
        if (universeIds.length === 0) {
            alert('Please select at least one character universe.');
            return;
        }
        
        this.selectedQuestions = this.selectQuestions(numQuestions, difficulties, universeIds);
        
        if (this.selectedQuestions.length === 0) {
            return;
        }
        
        this.renderPaper(paperType, schoolName, examDate);
        
        // Show print and answer buttons
        document.getElementById('printBtn').style.display = 'inline-block';
        document.getElementById('answerBtn').style.display = 'inline-block';
        
        // Scroll to preview
        document.getElementById('previewContainer').scrollIntoView({ behavior: 'smooth' });
    }
    
    renderPaper(paperType, schoolName, examDate) {
        const container = document.getElementById('previewContainer');
        container.style.display = 'block';
        
        let html = `
            <div class="paper-header">
                <h1>${schoolName}</h1>
                <h2>Primary School Leaving Examination</h2>
                <h2>Mathematics ${paperType === 'mcq' ? 'Paper 1' : paperType === 'structured' ? 'Paper 2' : 'Practice Paper'}</h2>
            </div>
            
            <div class="paper-info">
                <div>
                    <label>Name:</label>
                    <div style="flex: 1; border-bottom: 1px solid #000;"></div>
                </div>
                <div>
                    <label>Class:</label>
                    <div style="flex: 1; border-bottom: 1px solid #000;"></div>
                </div>
                <div>
                    <label>Date:</label>
                    <span>${examDate}</span>
                </div>
                <div>
                    <label>Time:</label>
                    <span>${this.calculateTime(this.selectedQuestions.length)}</span>
                </div>
            </div>
            
            <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin-bottom: 30px;">
                <strong>Instructions:</strong>
                <ul style="margin: 10px 0 0 20px; line-height: 1.8;">
                    <li>This paper consists of ${this.selectedQuestions.length} questions.</li>
                    ${paperType === 'mcq' ? '<li>For each question, choose the correct answer from the options given.</li>' : ''}
                    ${paperType === 'structured' ? '<li>Write your answers in the spaces provided.</li>' : ''}
                    <li>Show all your working clearly.</li>
                    <li>Calculators are not allowed.</li>
                </ul>
            </div>
        `;
        
        this.selectedQuestions.forEach((question, index) => {
            html += this.renderQuestion(question, index + 1, paperType);
        });
        
        container.innerHTML = html;
    }
    
    renderQuestion(question, number, paperType) {
        const isMCQ = paperType === 'mcq' || (paperType === 'mixed' && Math.random() > 0.5);
        
        let html = `
            <div class="question-item">
                <div class="question-number">${number}. [${question.category}]</div>
                <div class="question-text">${question.questionText}</div>
        `;
        
        if (isMCQ) {
            html += '<div class="mcq-options">';
            question.options.forEach((option, i) => {
                const label = String.fromCharCode(65 + i); // A, B, C, D
                const isCorrect = i === question.answer;
                html += `
                    <div class="mcq-option">
                        <span class="option-label">(${label})</span>
                        <span>${option}</span>
                        ${this.showingAnswers && isCorrect ? ' <strong style="color: #27ae60;">✓ CORRECT</strong>' : ''}
                    </div>
                `;
            });
            html += '</div>';
            
            if (!this.showingAnswers) {
                html += '<div style="margin-top: 15px;"><strong>Answer: _______</strong></div>';
            } else {
                html += `<div style="margin-top: 15px; color: #27ae60;"><strong>Answer: ${String.fromCharCode(65 + question.answer)}</strong></div>`;
            }
        } else {
            // Structured question - show answer space
            const correctAnswer = question.correct_answer || question.options[question.answer];
            
            if (this.showingAnswers) {
                html += `<div style="margin-top: 15px; padding: 15px; background: #d4edda; border-radius: 6px;">
                    <strong style="color: #155724;">Answer: ${correctAnswer}</strong>
                </div>`;
            } else {
                html += `
                    <div class="answer-space"></div>
                    <div class="answer-space"></div>
                `;
            }
        }
        
        html += '</div>';
        return html;
    }
    
    calculateTime(numQuestions) {
        // Roughly 2 minutes per question
        const minutes = numQuestions * 2;
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''} ${mins} minutes` : `${mins} minutes`;
    }
    
    showAnswerKey() {
        this.showingAnswers = !this.showingAnswers;
        const paperType = document.getElementById('paperType').value;
        const schoolName = document.getElementById('schoolName').value || 'School Name';
        const examDate = document.getElementById('examDate').value || new Date().toLocaleDateString('en-SG');
        
        this.renderPaper(paperType, schoolName, examDate);
        
        const btn = document.getElementById('answerBtn');
        btn.textContent = this.showingAnswers ? 'Hide Answers' : 'Show Answers';
    }
}

// Global functions
function toggleAllUniverses(checked) {
    document.querySelectorAll('.universe-checkbox').forEach(cb => {
        cb.checked = checked;
    });
}

function generatePaper() {
    paperGenerator.generatePaper();
}

function showAnswerKey() {
    paperGenerator.showAnswerKey();
}

// Initialize on page load
let paperGenerator;
window.addEventListener('DOMContentLoaded', () => {
    paperGenerator = new PaperGenerator();
});
