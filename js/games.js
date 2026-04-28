// Game Modal Management
const gameModals = {
    tictactoe: { title: '❌⭕ Tic-Tac-Toe', subtitle: 'Get three in a row!' },
    rps: { title: '✊✋✌️ Rock Paper Scissors', subtitle: 'Beat the computer!' },
    memory: { title: '🧠 Memory Match', subtitle: 'Find all pairs!' },
    guess: { title: '🎯 Guess the Number', subtitle: 'Guess between 1-100' },
    snake: { title: '🐍 Snake Game', subtitle: 'Eat and grow!' },
    simon: { title: '🎵 Simon Says', subtitle: 'Remember the sequence!' },
    whack: { title: '🔨 Whack-a-Mole', subtitle: 'Click the moles!' },
    '2048': { title: '🔢 2048', subtitle: 'Reach 2048!' },
    scramble: { title: '🔤 Word Scramble', subtitle: 'Unscramble the letters!' },
    mathchallenge: { title: '➕ Math Challenge', subtitle: 'Answer as many as you can!' },
    hangman: { title: '🪢 Hangman', subtitle: 'Guess the word!' },
    kpopemoji: { title: '🎤 K-POP Emoji Quiz', subtitle: 'Guess the group from the emojis!' },
    kpopidol: { title: '🌟 K-POP Idol Quiz', subtitle: 'Guess the idol from the emojis!' },
    chengyu: { title: '🀄 成语游戏', subtitle: '猜猜成语的意思！' },
    rubik: { title: '🎲 Rubik\'s Cube', subtitle: 'Scramble and solve!' }
};

function openGame(gameId) {
    const modal = document.getElementById(`modal-${gameId}`);
    if (!modal) {
        createGameModal(gameId);
    }
    document.getElementById(`modal-${gameId}`).classList.add('active');
    initGame(gameId);
}

function closeGame(gameId) {
    document.getElementById(`modal-${gameId}`).classList.remove('active');
    cleanupGame(gameId);
}

function createGameModal(gameId) {
    const container = document.getElementById('game-modals');
    const gameInfo = gameModals[gameId];
    
    const modal = document.createElement('div');
    modal.id = `modal-${gameId}`;
    modal.className = 'game-modal';
    if (gameId === 'rubik') modal.classList.add('rubik-modal');
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-btn" onclick="closeGame('${gameId}')">×</button>
            <h2 class="game-title">${gameInfo.title}</h2>
            <p class="game-subtitle">${gameInfo.subtitle}</p>
            <div id="game-${gameId}"></div>
        </div>
    `;
    container.appendChild(modal);
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeGame(gameId);
    });
}

// Game Initialization
function initGame(gameId) {
    switch(gameId) {
        case 'tictactoe': initTicTacToe(); break;
        case 'rps': initRPS(); break;
        case 'memory': initMemory(); break;
        case 'guess': initGuess(); break;
        case 'snake': initSnake(); break;
        case 'simon': initSimon(); break;
        case 'whack': initWhack(); break;
        case '2048': init2048(); break;
        case 'scramble': initScramble(); break;
        case 'mathchallenge': initMathChallenge(); break;
        case 'hangman': initHangman(); break;
        case 'kpopemoji': initKpopEmoji(); break;
        case 'kpopidol': initKpopIdol(); break;
        case 'chengyu': initChengyu(); break;
        case 'rubik': initRubik(); break;
    }
}

function cleanupGame(gameId) {
    if (gameId === 'snake') {
        if (window.snakeInterval) clearInterval(window.snakeInterval);
        document.removeEventListener('keydown', snakeKey);
        snakeRunning = false;
    }
    if (gameId === 'whack' && window.whackInterval) {
        clearInterval(window.whackInterval);
    }
    if (gameId === 'mathchallenge' && window.mathTimer) {
        clearInterval(window.mathTimer);
    }
    if (gameId === 'rubik') {
        cleanupRubik();
    }
}

// ============= TIC-TAC-TOE =============
let tttBoard, tttPlayer, tttActive;

function initTicTacToe() {
    tttBoard = Array(9).fill(null);
    tttPlayer = 'X';
    tttActive = true;
    
    const container = document.getElementById('game-tictactoe');
    container.innerHTML = `
        <div class="status-text" id="ttt-status">Player X's turn</div>
        <div class="ttt-board" id="ttt-board"></div>
        <div style="text-align: center; margin-top: 20px;">
            <button class="btn" onclick="resetTicTacToe()">New Game</button>
        </div>
        <div class="score-display">
            X: <span id="ttt-x">0</span> | Draw: <span id="ttt-draw">0</span> | O: <span id="ttt-o">0</span>
        </div>
    `;
    
    const board = document.getElementById('ttt-board');
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('button');
        cell.className = 'ttt-cell';
        cell.onclick = () => tttMove(i);
        board.appendChild(cell);
    }
    
    updateTTTScores();
}

function tttMove(index) {
    if (!tttActive || tttBoard[index]) return;
    
    tttBoard[index] = tttPlayer;
    const cells = document.querySelectorAll('#ttt-board .ttt-cell');
    cells[index].textContent = tttPlayer;
    cells[index].classList.add(tttPlayer.toLowerCase());
    cells[index].disabled = true;
    
    const winPattern = checkTTTWin();
    if (winPattern) {
        tttActive = false;
        document.getElementById('ttt-status').textContent = `🎉 Player ${tttPlayer} wins!`;
        winPattern.forEach(i => cells[i].classList.add('winner'));
        const key = `ttt-${tttPlayer.toLowerCase()}`;
        const score = parseInt(localStorage.getItem(key) || '0') + 1;
        localStorage.setItem(key, score);
        updateTTTScores();
    } else if (tttBoard.every(cell => cell)) {
        tttActive = false;
        document.getElementById('ttt-status').textContent = "🤝 It's a draw!";
        const score = parseInt(localStorage.getItem('ttt-draw') || '0') + 1;
        localStorage.setItem('ttt-draw', score);
        updateTTTScores();
    } else {
        tttPlayer = tttPlayer === 'X' ? 'O' : 'X';
        document.getElementById('ttt-status').textContent = `Player ${tttPlayer}'s turn`;
    }
}

function checkTTTWin() {
    const patterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (const pattern of patterns) {
        const [a,b,c] = pattern;
        if (tttBoard[a] && tttBoard[a] === tttBoard[b] && tttBoard[a] === tttBoard[c]) {
            return pattern;
        }
    }
    return null;
}

function resetTicTacToe() {
    tttBoard = Array(9).fill(null);
    tttPlayer = 'X';
    tttActive = true;
    document.getElementById('ttt-status').textContent = "Player X's turn";
    const cells = document.querySelectorAll('#ttt-board .ttt-cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.disabled = false;
        cell.classList.remove('x', 'o', 'winner');
    });
}

function updateTTTScores() {
    document.getElementById('ttt-x').textContent = localStorage.getItem('ttt-x') || '0';
    document.getElementById('ttt-o').textContent = localStorage.getItem('ttt-o') || '0';
    document.getElementById('ttt-draw').textContent = localStorage.getItem('ttt-draw') || '0';
}

// ============= ROCK PAPER SCISSORS =============
function initRPS() {
    const container = document.getElementById('game-rps');
    container.innerHTML = `
        <div class="rps-choices">
            <button class="rps-btn" onclick="playRPS('rock')">✊</button>
            <button class="rps-btn" onclick="playRPS('paper')">✋</button>
            <button class="rps-btn" onclick="playRPS('scissors')">✌️</button>
        </div>
        <div class="rps-result" id="rps-result">
            <h3>Choose your move!</h3>
        </div>
        <div class="score-display">
            You: <span id="rps-player">0</span> | Computer: <span id="rps-comp">0</span> | Ties: <span id="rps-tie">0</span>
        </div>
    `;
    updateRPSScores();
}

function playRPS(player) {
    const choices = ['rock', 'paper', 'scissors'];
    const emojis = {rock: '✊', paper: '✋', scissors: '✌️'};
    const comp = choices[Math.floor(Math.random() * 3)];
    
    let result, key;
    if (player === comp) {
        result = "It's a tie!";
        key = 'rps-tie';
    } else if ((player === 'rock' && comp === 'scissors') ||
               (player === 'paper' && comp === 'rock') ||
               (player === 'scissors' && comp === 'paper')) {
        result = '🎉 You win!';
        key = 'rps-player';
    } else {
        result = '😔 Computer wins!';
        key = 'rps-comp';
    }
    
    document.getElementById('rps-result').innerHTML = `
        <h3>${result}</h3>
        <p>You: ${emojis[player]} vs Computer: ${emojis[comp]}</p>
    `;
    
    const score = parseInt(localStorage.getItem(key) || '0') + 1;
    localStorage.setItem(key, score);
    updateRPSScores();
}

function updateRPSScores() {
    document.getElementById('rps-player').textContent = localStorage.getItem('rps-player') || '0';
    document.getElementById('rps-comp').textContent = localStorage.getItem('rps-comp') || '0';
    document.getElementById('rps-tie').textContent = localStorage.getItem('rps-tie') || '0';
}

// ============= MEMORY MATCH =============
let memoryCards, memoryFlipped, memoryMatched, memoryMoves, memoryLocked;

function initMemory() {
    const emojis = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎺', '🎸'];
    memoryCards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    memoryFlipped = [];
    memoryMatched = 0;
    memoryMoves = 0;
    memoryLocked = false;
    
    const container = document.getElementById('game-memory');
    container.innerHTML = `
        <div class="status-text" id="memory-status">Moves: 0 | Pairs: 0/8</div>
        <div class="memory-grid" id="memory-grid"></div>
        <div style="text-align: center; margin-top: 20px;">
            <button class="btn" onclick="initMemory()">New Game</button>
        </div>
    `;
    
    const grid = document.getElementById('memory-grid');
    memoryCards.forEach((emoji, i) => {
        const card = document.createElement('button');
        card.className = 'memory-card';
        card.dataset.index = i;
        card.dataset.emoji = emoji;
        card.textContent = emoji;
        card.onclick = () => flipMemory(i);
        grid.appendChild(card);
    });
}

function flipMemory(index) {
    if (memoryLocked || memoryFlipped.includes(index)) return;
    
    const cards = document.querySelectorAll('#memory-grid .memory-card');
    const card = cards[index];
    if (card.classList.contains('matched') || card.classList.contains('flipped')) return;
    
    card.classList.add('flipped');
    memoryFlipped.push(index);
    
    if (memoryFlipped.length === 2) {
        memoryMoves++;
        memoryLocked = true;
        
        const [first, second] = memoryFlipped;
        setTimeout(() => {
            if (cards[first].dataset.emoji === cards[second].dataset.emoji) {
                cards[first].classList.add('matched');
                cards[second].classList.add('matched');
                memoryMatched++;
                if (memoryMatched === 8) {
                    document.getElementById('memory-status').textContent = `🎉 Won in ${memoryMoves} moves!`;
                }
            } else {
                cards[first].classList.remove('flipped');
                cards[second].classList.remove('flipped');
            }
            memoryFlipped = [];
            memoryLocked = false;
            document.getElementById('memory-status').textContent = `Moves: ${memoryMoves} | Pairs: ${memoryMatched}/8`;
        }, 800);
    }
}

// ============= GUESS THE NUMBER =============
let guessTarget, guessAttempts, guessActive;

function initGuess() {
    guessTarget = Math.floor(Math.random() * 100) + 1;
    guessAttempts = 0;
    guessActive = true;
    
    const container = document.getElementById('game-guess');
    container.innerHTML = `
        <div class="status-text" id="guess-status">Make your first guess!</div>
        <input type="number" class="guess-input" id="guess-input" placeholder="1-100" min="1" max="100">
        <div style="text-align: center;">
            <button class="btn" onclick="makeGuess()">Guess</button>
            <button class="btn" onclick="initGuess()" style="margin-left: 10px;">New Game</button>
        </div>
        <div class="guess-hint" id="guess-hint">🎲 I'm thinking of a number...</div>
        <div class="score-display">
            Attempts: <span id="guess-att">0</span> | Best: <span id="guess-best">${localStorage.getItem('guess-best') || '-'}</span>
        </div>
    `;
    
    document.getElementById('guess-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') makeGuess();
    });
}

function makeGuess() {
    if (!guessActive) return;
    
    const input = document.getElementById('guess-input');
    const guess = parseInt(input.value);
    
    if (!guess || guess < 1 || guess > 100) {
        document.getElementById('guess-hint').textContent = '⚠️ Enter a number 1-100';
        return;
    }
    
    guessAttempts++;
    document.getElementById('guess-att').textContent = guessAttempts;
    
    if (guess === guessTarget) {
        guessActive = false;
        document.getElementById('guess-status').textContent = `🎉 Correct in ${guessAttempts} attempts!`;
        document.getElementById('guess-hint').textContent = `The number was ${guessTarget}!`;
        input.disabled = true;
        
        const best = localStorage.getItem('guess-best');
        if (!best || guessAttempts < parseInt(best)) {
            localStorage.setItem('guess-best', guessAttempts);
            document.getElementById('guess-best').textContent = guessAttempts;
            document.getElementById('guess-hint').textContent += ' 🏆 New record!';
        }
    } else if (guess < guessTarget) {
        document.getElementById('guess-status').textContent = `Attempt ${guessAttempts}`;
        document.getElementById('guess-hint').textContent = '📈 Too low! Try higher.';
    } else {
        document.getElementById('guess-status').textContent = `Attempt ${guessAttempts}`;
        document.getElementById('guess-hint').textContent = '📉 Too high! Try lower.';
    }
    
    input.value = '';
}

// ============= SNAKE GAME =============
let snakeCanvas, snakeCtx, snake, snakeFood, snakeDirection, snakeNextDirection, snakeScore, snakeRunning;

function initSnake() {
    const container = document.getElementById('game-snake');
    container.innerHTML = `
        <div class="snake-info">Use Arrow Keys or buttons below to move</div>
        <div class="status-text" id="snake-status">Press Start to play!</div>
        <canvas id="snake-canvas" class="snake-canvas" width="400" height="400"></canvas>
        <div class="snake-controls">
            <button class="btn" onclick="startSnake()">Start Game</button>
        </div>
        <div class="snake-dpad">
            <div></div>
            <button class="dpad-btn" onclick="snakeBtnDir('up')">▲</button>
            <div></div>
            <button class="dpad-btn" onclick="snakeBtnDir('left')">◀</button>
            <div></div>
            <button class="dpad-btn" onclick="snakeBtnDir('right')">▶</button>
            <div></div>
            <button class="dpad-btn" onclick="snakeBtnDir('down')">▼</button>
            <div></div>
        </div>
        <div class="score-display">High Score: <span id="snake-best">${localStorage.getItem('snake-best') || '0'}</span></div>
    `;
    
    snakeCanvas = document.getElementById('snake-canvas');
    snakeCtx = snakeCanvas.getContext('2d');
}

function startSnake() {
    snake = [{x: 200, y: 200}];
    snakeFood = {x: 0, y: 0};
    snakeDirection = {x: 0, y: 0};
    snakeNextDirection = {x: 0, y: 0};
    snakeScore = 0;
    snakeRunning = true;
    
    placeSnakeFood();
    document.getElementById('snake-status').textContent = 'Score: 0 — press an arrow key to start!';
    
    document.removeEventListener('keydown', snakeKey);
    document.addEventListener('keydown', snakeKey);
    
    if (window.snakeInterval) clearInterval(window.snakeInterval);
    window.snakeInterval = setInterval(updateSnake, 120);
    drawSnake();
}

function snakeKey(e) {
    const key = e.key;
    if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(key)) e.preventDefault();
    if (key === 'ArrowUp' && snakeDirection.y === 0) snakeNextDirection = {x: 0, y: -20};
    else if (key === 'ArrowDown' && snakeDirection.y === 0) snakeNextDirection = {x: 0, y: 20};
    else if (key === 'ArrowLeft' && snakeDirection.x === 0) snakeNextDirection = {x: -20, y: 0};
    else if (key === 'ArrowRight' && snakeDirection.x === 0) snakeNextDirection = {x: 20, y: 0};
}

function snakeBtnDir(dir) {
    if (!snakeRunning) return;
    if (dir === 'up' && snakeDirection.y === 0) snakeNextDirection = {x: 0, y: -20};
    else if (dir === 'down' && snakeDirection.y === 0) snakeNextDirection = {x: 0, y: 20};
    else if (dir === 'left' && snakeDirection.x === 0) snakeNextDirection = {x: -20, y: 0};
    else if (dir === 'right' && snakeDirection.x === 0) snakeNextDirection = {x: 20, y: 0};
}

function updateSnake() {
    // Wait for first key press before moving
    if (snakeNextDirection.x === 0 && snakeNextDirection.y === 0) return;
    snakeDirection = snakeNextDirection;

    const head = {x: snake[0].x + snakeDirection.x, y: snake[0].y + snakeDirection.y};
    
    // Check collision
    if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400 ||
        snake.some(seg => seg.x === head.x && seg.y === head.y)) {
        snakeRunning = false;
        clearInterval(window.snakeInterval);
        document.removeEventListener('keydown', snakeKey);
        const best = parseInt(localStorage.getItem('snake-best') || '0');
        if (snakeScore > best) {
            localStorage.setItem('snake-best', snakeScore);
            document.getElementById('snake-best').textContent = snakeScore;
        }
        document.getElementById('snake-status').textContent = `💀 Game Over! Score: ${snakeScore} — press Start to retry`;
        return;
    }
    
    snake.unshift(head);
    
    // Check food
    if (head.x === snakeFood.x && head.y === snakeFood.y) {
        snakeScore++;
        document.getElementById('snake-status').textContent = `Score: ${snakeScore}`;
        placeSnakeFood();
    } else {
        snake.pop();
    }
    
    drawSnake();
}

function placeSnakeFood() {
    snakeFood.x = Math.floor(Math.random() * 20) * 20;
    snakeFood.y = Math.floor(Math.random() * 20) * 20;
}

function drawSnake() {
    snakeCtx.fillStyle = '#f8f9fa';
    snakeCtx.fillRect(0, 0, 400, 400);
    
    snakeCtx.fillStyle = '#667eea';
    snake.forEach(seg => snakeCtx.fillRect(seg.x, seg.y, 18, 18));
    
    snakeCtx.fillStyle = '#ef4444';
    snakeCtx.fillRect(snakeFood.x, snakeFood.y, 18, 18);
}

// ============= SIMON SAYS =============
let simonSequence, simonPlayerSeq, simonLevel, simonPlaying;

function initSimon() {
    simonSequence = [];
    simonPlayerSeq = [];
    simonLevel = 0;
    simonPlaying = false;
    
    const container = document.getElementById('game-simon');
    container.innerHTML = `
        <div class="status-text" id="simon-status">Click Start to Play</div>
        <div class="simon-board">
            <button class="simon-btn red" onclick="simonClick(0)"></button>
            <button class="simon-btn blue" onclick="simonClick(1)"></button>
            <button class="simon-btn green" onclick="simonClick(2)"></button>
            <button class="simon-btn yellow" onclick="simonClick(3)"></button>
        </div>
        <div style="text-align: center;">
            <button class="btn" onclick="startSimon()">Start Game</button>
        </div>
        <div class="score-display">Best Level: <span id="simon-best">${localStorage.getItem('simon-best') || '0'}</span></div>
    `;
}

function startSimon() {
    simonSequence = [];
    simonPlayerSeq = [];
    simonLevel = 0;
    simonPlaying = true;
    nextSimonRound();
}

function nextSimonRound() {
    simonLevel++;
    simonPlayerSeq = [];
    simonSequence.push(Math.floor(Math.random() * 4));
    document.getElementById('simon-status').textContent = `Level ${simonLevel}`;
    playSimonSequence();
}

function playSimonSequence() {
    const buttons = document.querySelectorAll('.simon-btn');
    simonSequence.forEach((color, i) => {
        setTimeout(() => {
            buttons[color].classList.add('active');
            setTimeout(() => buttons[color].classList.remove('active'), 300);
        }, i * 600);
    });
}

function simonClick(index) {
    if (!simonPlaying) return;
    
    const buttons = document.querySelectorAll('.simon-btn');
    buttons[index].classList.add('active');
    setTimeout(() => buttons[index].classList.remove('active'), 200);
    
    simonPlayerSeq.push(index);
    
    const currentIndex = simonPlayerSeq.length - 1;
    if (simonPlayerSeq[currentIndex] !== simonSequence[currentIndex]) {
        simonPlaying = false;
        document.getElementById('simon-status').textContent = `Game Over! Level ${simonLevel}`;
        const best = parseInt(localStorage.getItem('simon-best') || '0');
        if (simonLevel > best) {
            localStorage.setItem('simon-best', simonLevel);
            document.getElementById('simon-best').textContent = simonLevel;
        }
        return;
    }
    
    if (simonPlayerSeq.length === simonSequence.length) {
        setTimeout(nextSimonRound, 1000);
    }
}

// ============= WHACK-A-MOLE =============
let whackScore, whackTime, whackActive;

function initWhack() {
    whackScore = 0;
    whackTime = 30;
    whackActive = false;
    
    const container = document.getElementById('game-whack');
    container.innerHTML = `
        <div class="status-text" id="whack-status">Click Start to Play</div>
        <div class="mole-grid" id="mole-grid">
            ${Array(9).fill('<div class="mole-hole"><div class="mole">🦫</div></div>').join('')}
        </div>
        <div style="text-align: center;">
            <button class="btn" onclick="startWhack()">Start Game</button>
        </div>
        <div class="score-display">Best Score: <span id="whack-best">${localStorage.getItem('whack-best') || '0'}</span></div>
    `;
}

function startWhack() {
    whackScore = 0;
    whackTime = 30;
    whackActive = true;
    document.getElementById('whack-status').textContent = `Score: 0 | Time: 30s`;
    
    const holes = document.querySelectorAll('.mole-hole');
    holes.forEach((hole, i) => {
        hole.onclick = () => {
            if (whackActive && hole.classList.contains('active')) {
                whackScore++;
                hole.classList.remove('active');
                document.getElementById('whack-status').textContent = `Score: ${whackScore} | Time: ${whackTime}s`;
            }
        };
    });
    
    if (window.whackInterval) clearInterval(window.whackInterval);
    window.whackInterval = setInterval(whackUpdate, 1000);
    popMole();
}

function whackUpdate() {
    whackTime--;
    document.getElementById('whack-status').textContent = `Score: ${whackScore} | Time: ${whackTime}s`;
    
    if (whackTime <= 0) {
        whackActive = false;
        clearInterval(window.whackInterval);
        document.getElementById('whack-status').textContent = `Game Over! Score: ${whackScore}`;
        const best = parseInt(localStorage.getItem('whack-best') || '0');
        if (whackScore > best) {
            localStorage.setItem('whack-best', whackScore);
            document.getElementById('whack-best').textContent = whackScore;
        }
    }
}

function popMole() {
    if (!whackActive) return;
    
    const holes = document.querySelectorAll('.mole-hole');
    holes.forEach(h => h.classList.remove('active'));
    
    const randomHole = holes[Math.floor(Math.random() * holes.length)];
    randomHole.classList.add('active');
    
    setTimeout(() => {
        randomHole.classList.remove('active');
        if (whackActive) setTimeout(popMole, 400);
    }, 800);
}

// ============= 2048 GAME =============
let grid2048, score2048;

function init2048() {
    grid2048 = Array(4).fill().map(() => Array(4).fill(0));
    score2048 = 0;
    
    const container = document.getElementById('game-2048');
    container.innerHTML = `
        <div class="status-text" id="game2048-status">Score: 0</div>
        <div id="grid2048" style="display: grid; grid-template-columns: repeat(4, 80px); gap: 10px; margin: 20px auto; justify-content: center;"></div>
        <div style="text-align: center;">
            <button class="btn" onclick="init2048()">New Game</button>
        </div>
        <div class="score-display">Use Arrow Keys to Play</div>
    `;
    
    addTile2048();
    addTile2048();
    render2048();
    
    document.addEventListener('keydown', move2048);
}

function addTile2048() {
    const empty = [];
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (grid2048[r][c] === 0) empty.push({r, c});
        }
    }
    if (empty.length > 0) {
        const {r, c} = empty[Math.floor(Math.random() * empty.length)];
        grid2048[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
}

function render2048() {
    const container = document.getElementById('grid2048');
    container.innerHTML = '';
    
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            const tile = document.createElement('div');
            tile.style.cssText = 'width: 80px; height: 80px; background: #eee; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.5em; font-weight: bold;';
            const val = grid2048[r][c];
            if (val > 0) {
                tile.textContent = val;
                tile.style.background = `hsl(${Math.log2(val) * 15}, 70%, 60%)`;
                tile.style.color = val > 4 ? 'white' : '#333';
            }
            container.appendChild(tile);
        }
    }
    
    document.getElementById('game2048-status').textContent = `Score: ${score2048}`;
}

function move2048(e) {
    let moved = false;
    const key = e.key;
    const oldGrid = JSON.stringify(grid2048);
    
    if (key === 'ArrowLeft') moved = slide2048('left');
    else if (key === 'ArrowRight') moved = slide2048('right');
    else if (key === 'ArrowUp') moved = slide2048('up');
    else if (key === 'ArrowDown') moved = slide2048('down');
    
    if (moved && JSON.stringify(grid2048) !== oldGrid) {
        addTile2048();
        render2048();
    }
}

function slide2048(direction) {
    let moved = false;
    
    if (direction === 'left') {
        for (let r = 0; r < 4; r++) {
            const row = grid2048[r].filter(v => v !== 0);
            for (let i = 0; i < row.length - 1; i++) {
                if (row[i] === row[i + 1]) {
                    row[i] *= 2;
                    score2048 += row[i];
                    row.splice(i + 1, 1);
                }
            }
            while (row.length < 4) row.push(0);
            if (JSON.stringify(grid2048[r]) !== JSON.stringify(row)) moved = true;
            grid2048[r] = row;
        }
    } else if (direction === 'right') {
        for (let r = 0; r < 4; r++) {
            const row = grid2048[r].filter(v => v !== 0);
            for (let i = row.length - 1; i > 0; i--) {
                if (row[i] === row[i - 1]) {
                    row[i] *= 2;
                    score2048 += row[i];
                    row.splice(i - 1, 1);
                }
            }
            while (row.length < 4) row.unshift(0);
            if (JSON.stringify(grid2048[r]) !== JSON.stringify(row)) moved = true;
            grid2048[r] = row;
        }
    } else if (direction === 'up') {
        for (let c = 0; c < 4; c++) {
            const col = [];
            for (let r = 0; r < 4; r++) if (grid2048[r][c]) col.push(grid2048[r][c]);
            for (let i = 0; i < col.length - 1; i++) {
                if (col[i] === col[i + 1]) {
                    col[i] *= 2;
                    score2048 += col[i];
                    col.splice(i + 1, 1);
                }
            }
            while (col.length < 4) col.push(0);
            for (let r = 0; r < 4; r++) {
                if (grid2048[r][c] !== col[r]) moved = true;
                grid2048[r][c] = col[r];
            }
        }
    } else if (direction === 'down') {
        for (let c = 0; c < 4; c++) {
            const col = [];
            for (let r = 0; r < 4; r++) if (grid2048[r][c]) col.push(grid2048[r][c]);
            for (let i = col.length - 1; i > 0; i--) {
                if (col[i] === col[i - 1]) {
                    col[i] *= 2;
                    score2048 += col[i];
                    col.splice(i - 1, 1);
                }
            }
            while (col.length < 4) col.unshift(0);
            for (let r = 0; r < 4; r++) {
                if (grid2048[r][c] !== col[r]) moved = true;
                grid2048[r][c] = col[r];
            }
        }
    }
    
    return moved;
}

// ============= WORD SCRAMBLE =============
const scrambleWords = [
    { word: 'apple', hint: 'A red or green fruit' },
    { word: 'planet', hint: 'Earth is one of these' },
    { word: 'school', hint: 'Where you go to learn' },
    { word: 'jungle', hint: 'A dense tropical forest' },
    { word: 'bridge', hint: 'Connects two sides across water' },
    { word: 'castle', hint: 'A large medieval stone building' },
    { word: 'dragon', hint: 'A mythical fire-breathing creature' },
    { word: 'flower', hint: 'A blooming plant' },
    { word: 'winter', hint: 'The coldest season' },
    { word: 'bottle', hint: 'A container for liquids' },
    { word: 'candle', hint: 'Gives light when lit' },
    { word: 'spider', hint: 'An eight-legged creature' },
    { word: 'button', hint: 'You press it or sew it on' },
    { word: 'garden', hint: 'A place where plants grow' },
    { word: 'rocket', hint: 'Flies to outer space' },
    { word: 'pencil', hint: 'You write with it' },
    { word: 'mirror', hint: 'You see your reflection in it' },
    { word: 'camera', hint: 'Takes photographs' },
    { word: 'pillow', hint: 'You rest your head on it' },
    { word: 'stream', hint: 'A small flowing body of water' }
];

const SCRAMBLE_QUIZ_SIZE = 20;
let scrambleCurrentWord, scrambleScore, scrambleTotal, scrambleIndex, scrambleLocked;
let scrambleLibraryCache = null;

function normalizeScrambleEntry(entry) {
    if (!entry || typeof entry.word !== 'string') return null;
    const word = entry.word.trim().toLowerCase();
    if (!word || word.length < 4 || word.length > 12 || !/^[a-z]+$/.test(word)) return null;
    return {
        word,
        hint: entry.hint && typeof entry.hint === 'string' ? entry.hint.trim() : 'A common English word'
    };
}

async function loadScrambleLibrary() {
    if (scrambleLibraryCache) return scrambleLibraryCache;

    const fallback = scrambleWords.map(normalizeScrambleEntry).filter(Boolean);
    try {
        const res = await fetch('data/word-scramble-library.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw = await res.json();
        const parsed = Array.isArray(raw) ? raw.map(normalizeScrambleEntry).filter(Boolean) : [];
        scrambleLibraryCache = parsed.length ? parsed : fallback;
    } catch (error) {
        console.warn('Failed to load word scramble library, using fallback list.', error);
        scrambleLibraryCache = fallback;
    }

    return scrambleLibraryCache;
}

function scrambleWord(word) {
    const arr = word.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Re-shuffle if result happens to equal the original
    const shuffled = arr.join('');
    return shuffled === word ? scrambleWord(word) : shuffled;
}

async function initScramble() {
    const library = await loadScrambleLibrary();
    const queue = [...library].sort(() => Math.random() - 0.5).slice(0, Math.min(SCRAMBLE_QUIZ_SIZE, library.length));
    window._scrambleQueue = queue;

    scrambleIndex = 0;
    scrambleLocked = false;
    scrambleScore = 0;
    scrambleTotal = 0;

    const container = document.getElementById('game-scramble');
    if (!container) return;

    if (!queue.length) {
        container.innerHTML = '<p style="text-align:center; color:#ef4444; font-weight:600;">No scramble words available right now.</p>';
        return;
    }

    container.innerHTML = `
        <div class="score-display" id="scramble-score">Score: 0 / 0</div>
        <div class="status-text" id="scramble-progress">Question 1 of ${queue.length}</div>
        <div class="scramble-word" id="scramble-display"></div>
        <p class="scramble-hint" id="scramble-hint"></p>
        <input class="scramble-input" id="scramble-input" type="text" maxlength="20" placeholder="Type your answer…" autocomplete="off">
        <div style="text-align:center; margin-top: 12px; display: flex; gap: 10px; justify-content: center;">
            <button class="btn" onclick="checkScramble()">Submit</button>
            <button class="btn" style="background: linear-gradient(135deg,#f59e0b,#d97706);" onclick="skipScramble()">Skip</button>
            <button class="btn" style="background: linear-gradient(135deg,#334155,#0f172a);" onclick="initScramble()">New 20</button>
        </div>
        <div class="status-text" id="scramble-status" style="margin-top:15px;"></div>
    `;
    document.getElementById('scramble-input').addEventListener('keydown', e => {
        if (e.key === 'Enter') checkScramble();
    });
    nextScramble();
}

function nextScramble() {
    const queue = window._scrambleQueue || [];
    const entry = queue[scrambleIndex];
    if (!entry) {
        endScramble();
        return;
    }

    scrambleCurrentWord = entry.word;
    scrambleLocked = false;
    document.getElementById('scramble-progress').textContent = `Question ${scrambleIndex + 1} of ${queue.length}`;
    document.getElementById('scramble-display').textContent = scrambleWord(entry.word).toUpperCase();
    document.getElementById('scramble-hint').textContent = '💡 Hint: ' + entry.hint;
    const input = document.getElementById('scramble-input');
    if (input) { input.value = ''; input.focus(); }
    document.getElementById('scramble-status').textContent = '';
}

function checkScramble() {
    if (scrambleLocked) return;
    const input = document.getElementById('scramble-input');
    if (!input) return;
    scrambleLocked = true;
    const answer = input.value.trim().toLowerCase();
    scrambleTotal++;
    const statusEl = document.getElementById('scramble-status');
    if (answer === scrambleCurrentWord) {
        scrambleScore++;
        statusEl.textContent = '✅ Correct!';
        statusEl.style.color = '#10b981';
    } else {
        statusEl.textContent = `❌ The word was: ${scrambleCurrentWord.toUpperCase()}`;
        statusEl.style.color = '#ef4444';
    }
    document.getElementById('scramble-score').textContent = `Score: ${scrambleScore} / ${scrambleTotal}`;
    setTimeout(advanceScramble, 1200);
}

function skipScramble() {
    if (scrambleLocked) return;
    scrambleLocked = true;
    scrambleTotal++;
    const statusEl = document.getElementById('scramble-status');
    statusEl.textContent = `⏭️ Skipped! The word was: ${scrambleCurrentWord.toUpperCase()}`;
    statusEl.style.color = '#f59e0b';
    document.getElementById('scramble-score').textContent = `Score: ${scrambleScore} / ${scrambleTotal}`;
    setTimeout(advanceScramble, 1200);
}

function advanceScramble() {
    scrambleIndex++;
    nextScramble();
}

function endScramble() {
    const container = document.getElementById('game-scramble');
    if (!container) return;
    const pct = scrambleTotal ? Math.round((scrambleScore / scrambleTotal) * 100) : 0;
    const badge = pct >= 90 ? '🏅' : pct >= 70 ? '🎯' : '🧩';
    container.innerHTML = `
        <div style="text-align:center; padding: 25px;">
            <div style="font-size:4em; margin-bottom:12px;">${badge}</div>
            <h3 style="font-size:1.8em; color:#2c3e50; margin-bottom:10px;">Word Scramble Complete!</h3>
            <p style="font-size:1.2em; color:#7f8c8d; margin-bottom:20px;">You scored <strong style="color:#667eea;">${scrambleScore}</strong> out of <strong>${scrambleTotal}</strong>.</p>
            <button class="btn" onclick="initScramble()">Play New 20 🔁</button>
        </div>
    `;
}

// ============= MATH CHALLENGE =============
let mathScore, mathQuestionCount, mathTimeLeft, mathCorrectAnswer;

function generateMathQuestion(level) {
    const ops = level < 5 ? ['+', '-'] : level < 10 ? ['+', '-', '*'] : ['+', '-', '*', '/'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a, b, answer;
    if (op === '+') { a = Math.floor(Math.random() * (10 * level)) + 1; b = Math.floor(Math.random() * (10 * level)) + 1; answer = a + b; }
    else if (op === '-') { a = Math.floor(Math.random() * (10 * level)) + 1; b = Math.floor(Math.random() * a) + 1; answer = a - b; }
    else if (op === '*') { a = Math.floor(Math.random() * 12) + 1; b = Math.floor(Math.random() * 12) + 1; answer = a * b; }
    else { b = Math.floor(Math.random() * 11) + 2; answer = Math.floor(Math.random() * 11) + 1; a = b * answer; }
    return { question: `${a} ${op} ${b}`, answer };
}

function initMathChallenge() {
    mathScore = 0;
    mathQuestionCount = 0;
    mathTimeLeft = 60;
    if (window.mathTimer) clearInterval(window.mathTimer);

    const container = document.getElementById('game-mathchallenge');
    container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <div class="score-display" id="math-score" style="margin:0; border:none; padding:0;">Score: 0</div>
            <div class="math-timer" id="math-timer">⏱ 60s</div>
        </div>
        <div class="math-problem" id="math-problem"></div>
        <div class="math-options" id="math-options"></div>
        <div class="status-text" id="math-status" style="min-height:28px;"></div>
    `;

    nextMathQuestion();

    window.mathTimer = setInterval(() => {
        mathTimeLeft--;
        const timerEl = document.getElementById('math-timer');
        if (timerEl) {
            timerEl.textContent = `⏱ ${mathTimeLeft}s`;
            timerEl.className = 'math-timer' + (mathTimeLeft <= 10 ? ' urgent' : '');
        }
        if (mathTimeLeft <= 0) {
            clearInterval(window.mathTimer);
            endMathChallenge();
        }
    }, 1000);
}

function nextMathQuestion() {
    mathQuestionCount++;
    const level = Math.min(Math.ceil(mathScore / 3) + 1, 10);
    const { question, answer } = generateMathQuestion(level);
    mathCorrectAnswer = answer;

    const problemEl = document.getElementById('math-problem');
    const optionsEl = document.getElementById('math-options');
    const statusEl = document.getElementById('math-status');
    if (!problemEl) return;

    problemEl.textContent = question + ' = ?';
    statusEl.textContent = '';

    // Generate 3 wrong answers
    const wrongSet = new Set();
    while (wrongSet.size < 3) {
        const offset = Math.floor(Math.random() * 20) - 10;
        const w = answer + offset;
        if (offset !== 0 && w > 0) wrongSet.add(w);
    }
    const choices = [answer, ...wrongSet].sort(() => Math.random() - 0.5);

    optionsEl.innerHTML = '';
    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'math-option-btn';
        btn.textContent = choice;
        btn.onclick = () => answerMath(choice, btn);
        optionsEl.appendChild(btn);
    });
}

function answerMath(choice, btn) {
    const optionsEl = document.getElementById('math-options');
    // Disable all buttons
    optionsEl.querySelectorAll('.math-option-btn').forEach(b => { b.disabled = true; });

    const statusEl = document.getElementById('math-status');
    if (choice === mathCorrectAnswer) {
        btn.classList.add('correct');
        mathScore++;
        document.getElementById('math-score').textContent = `Score: ${mathScore}`;
        statusEl.textContent = '✅ Correct!';
        statusEl.style.color = '#10b981';
        setTimeout(nextMathQuestion, 700);
    } else {
        btn.classList.add('wrong');
        // Highlight correct answer
        optionsEl.querySelectorAll('.math-option-btn').forEach(b => {
            if (parseInt(b.textContent) === mathCorrectAnswer) b.classList.add('correct');
        });
        statusEl.textContent = `❌ The answer was ${mathCorrectAnswer}`;
        statusEl.style.color = '#ef4444';
        setTimeout(nextMathQuestion, 1200);
    }
}

function endMathChallenge() {
    const container = document.getElementById('game-mathchallenge');
    if (!container) return;
    container.innerHTML = `
        <div style="text-align:center; padding: 30px;">
            <div style="font-size:4em; margin-bottom:15px;">🏆</div>
            <h3 style="font-size:1.8em; color:#2c3e50; margin-bottom:10px;">Time's Up!</h3>
            <p style="font-size:1.3em; color:#7f8c8d; margin-bottom:20px;">You scored <strong style="color:#667eea;">${mathScore}</strong> out of <strong>${mathQuestionCount - 1}</strong> questions.</p>
            <button class="btn" onclick="initMathChallenge()">Play Again</button>
        </div>
    `;
}

// ============= HANGMAN =============
const hangmanWords = [
    { word: 'rainbow', hint: 'Appears after rain' },
    { word: 'volcano', hint: 'Erupts with lava' },
    { word: 'compass', hint: 'Shows direction' },
    { word: 'penguin', hint: 'A flightless bird' },
    { word: 'lantern', hint: 'A portable light source' },
    { word: 'diamond', hint: 'A precious gemstone' },
    { word: 'pyramid', hint: 'Ancient Egyptian structure' },
    { word: 'tsunami', hint: 'A giant ocean wave' },
    { word: 'cactus', hint: 'Desert plant with spines' },
    { word: 'leopard', hint: 'A spotted big cat' },
    { word: 'dolphin', hint: 'A clever sea mammal' },
    { word: 'tornado', hint: 'A spinning wind storm' },
    { word: 'blanket', hint: 'Keeps you warm in bed' },
    { word: 'kitchen', hint: 'Room where food is cooked' },
    { word: 'bicycle', hint: 'A two-wheeled vehicle' },
    { word: 'captain', hint: 'Leader of a ship or team' },
    { word: 'library', hint: 'A place full of books' },
    { word: 'magnet', hint: 'Attracts iron objects' },
    { word: 'pirate', hint: 'Sails the sea looking for treasure' }
];

const HANGMAN_QUIZ_SIZE = 20;
let hangmanLibraryCache = null;

const hangmanStages = [
    `
  +---+
  |   |
      |
      |
      |
      |
=========`,
    `
  +---+
  |   |
  O   |
      |
      |
      |
=========`,
    `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
    `
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
    `
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`,
    `
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`,
    `
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`
];

let hangmanWord, hangmanHint, hangmanGuessed, hangmanWrong;
let hangmanAnswered, hangmanScore, hangmanTotal, hangmanIndex;

function normalizeHangmanEntry(entry) {
    if (!entry || typeof entry.word !== 'string') return null;
    const word = entry.word.trim().toLowerCase();
    if (!word || word.length < 4 || word.length > 12 || !/^[a-z]+$/.test(word)) return null;
    return {
        word,
        hint: entry.hint && typeof entry.hint === 'string' ? entry.hint.trim() : 'A common English word'
    };
}

async function loadHangmanLibrary() {
    if (hangmanLibraryCache) return hangmanLibraryCache;

    const fallback = hangmanWords.map(normalizeHangmanEntry).filter(Boolean);
    try {
        const res = await fetch('data/hangman-library.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw = await res.json();
        const parsed = Array.isArray(raw) ? raw.map(normalizeHangmanEntry).filter(Boolean) : [];
        hangmanLibraryCache = parsed.length ? parsed : fallback;
    } catch (error) {
        console.warn('Failed to load hangman library, using fallback list.', error);
        hangmanLibraryCache = fallback;
    }

    return hangmanLibraryCache;
}

function startHangmanRound() {
    const queue = window._hangmanQueue || [];
    const entry = queue[hangmanIndex];
    if (!entry) {
        endHangmanQuiz();
        return;
    }

    hangmanWord = entry.word;
    hangmanHint = entry.hint;
    hangmanGuessed = new Set();
    hangmanWrong = 0;
    hangmanAnswered = false;

    const progressEl = document.getElementById('hangman-progress');
    if (progressEl) {
        progressEl.textContent = `Question ${hangmanIndex + 1} of ${queue.length}`;
    }

    const scoreEl = document.getElementById('hangman-score');
    if (scoreEl) {
        scoreEl.textContent = `Score: ${hangmanScore} / ${hangmanTotal}`;
    }

    const hintEl = document.getElementById('hangman-hint');
    if (hintEl) {
        hintEl.textContent = `💡 ${hangmanHint}`;
    }

    const statusEl = document.getElementById('hangman-status');
    if (statusEl) {
        statusEl.textContent = '';
    }

    const nextBtn = document.getElementById('hangman-next-btn');
    if (nextBtn) {
        nextBtn.style.display = 'none';
    }

    buildHangmanKeyboard();
    renderHangman();
}

async function initHangman() {
    const library = await loadHangmanLibrary();
    const queue = [...library].sort(() => Math.random() - 0.5).slice(0, Math.min(HANGMAN_QUIZ_SIZE, library.length));
    window._hangmanQueue = queue;

    hangmanIndex = 0;
    hangmanScore = 0;
    hangmanTotal = 0;

    const container = document.getElementById('game-hangman');
    if (!container) return;

    if (!queue.length) {
        container.innerHTML = '<p style="text-align:center; color:#ef4444; font-weight:600;">No hangman words available right now.</p>';
        return;
    }

    container.innerHTML = `
        <div class="score-display" id="hangman-score" style="margin-bottom:10px;">Score: 0 / 0</div>
        <div class="status-text" id="hangman-progress" style="margin-bottom:12px;">Question 1 of ${queue.length}</div>
        <div style="display:flex; gap:20px; align-items:flex-start; flex-wrap:wrap; justify-content:center;">
            <pre class="hangman-drawing" id="hangman-drawing"></pre>
            <div style="flex:1; min-width:200px;">
                <p class="scramble-hint" id="hangman-hint"></p>
                <div class="hangman-word" id="hangman-word"></div>
                <div class="status-text" id="hangman-status" style="min-height:28px;"></div>
                <div class="hangman-keyboard" id="hangman-keyboard"></div>
            </div>
        </div>
        <div style="text-align:center; margin-top:15px; display:flex; gap:10px; justify-content:center;">
            <button class="btn" id="hangman-next-btn" style="display:none;" onclick="nextHangmanQuestion()">Next ➡️</button>
            <button class="btn" style="background: linear-gradient(135deg,#334155,#0f172a);" onclick="initHangman()">New 20</button>
        </div>
    `;

    startHangmanRound();
}

function renderHangman() {
    const drawEl = document.getElementById('hangman-drawing');
    const wordEl = document.getElementById('hangman-word');
    if (!drawEl || !wordEl) return;

    drawEl.textContent = hangmanStages[hangmanWrong];

    wordEl.innerHTML = '';
    hangmanWord.split('').forEach(letter => {
        const span = document.createElement('div');
        span.className = 'hangman-letter';
        span.textContent = hangmanGuessed.has(letter) ? letter.toUpperCase() : '';
        wordEl.appendChild(span);
    });
}

function buildHangmanKeyboard() {
    const kb = document.getElementById('hangman-keyboard');
    if (!kb) return;
    kb.innerHTML = '';
    'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
        const btn = document.createElement('button');
        btn.className = 'hangman-key';
        btn.id = `hkey-${letter}`;
        btn.textContent = letter.toUpperCase();
        btn.onclick = () => guessHangman(letter);
        kb.appendChild(btn);
    });
}

function guessHangman(letter) {
    if (hangmanAnswered) return;
    if (hangmanGuessed.has(letter)) return;
    hangmanGuessed.add(letter);

    const btn = document.getElementById(`hkey-${letter}`);
    const statusEl = document.getElementById('hangman-status');

    if (hangmanWord.includes(letter)) {
        if (btn) btn.classList.add('right-key');
        // Check win
        const allRevealed = hangmanWord.split('').every(l => hangmanGuessed.has(l));
        if (allRevealed) {
            renderHangman();
            if (btn) btn.disabled = true;
            completeHangmanRound(true);
            if (statusEl) { statusEl.textContent = '🎉 You won!'; statusEl.style.color = '#10b981'; }
            return;
        }
    } else {
        hangmanWrong++;
        if (btn) btn.classList.add('wrong-key');
        if (hangmanWrong >= hangmanStages.length - 1) {
            hangmanGuessed = new Set(hangmanWord.split(''));
            renderHangman();
            if (btn) btn.disabled = true;
            completeHangmanRound(false);
            if (statusEl) {
                statusEl.textContent = `💀 Game over! The word was: ${hangmanWord.toUpperCase()}`;
                statusEl.style.color = '#ef4444';
            }
            return;
        }
    }
    if (btn) btn.disabled = true;
    renderHangman();
}

function completeHangmanRound(won) {
    if (hangmanAnswered) return;
    hangmanAnswered = true;
    hangmanTotal++;
    if (won) hangmanScore++;

    const scoreEl = document.getElementById('hangman-score');
    if (scoreEl) {
        scoreEl.textContent = `Score: ${hangmanScore} / ${hangmanTotal}`;
    }

    disableHangmanKeyboard();

    const nextBtn = document.getElementById('hangman-next-btn');
    if (nextBtn) {
        const isLast = hangmanIndex >= (window._hangmanQueue.length - 1);
        nextBtn.textContent = isLast ? 'See Results 🏁' : 'Next ➡️';
        nextBtn.style.display = 'inline-block';
    }
}

function nextHangmanQuestion() {
    hangmanIndex++;
    if (hangmanIndex >= window._hangmanQueue.length) {
        endHangmanQuiz();
    } else {
        startHangmanRound();
    }
}

function endHangmanQuiz() {
    const container = document.getElementById('game-hangman');
    if (!container) return;
    const pct = hangmanTotal ? Math.round((hangmanScore / hangmanTotal) * 100) : 0;
    const badge = pct >= 90 ? '🏅' : pct >= 70 ? '🎯' : '🪢';
    container.innerHTML = `
        <div style="text-align:center; padding: 25px;">
            <div style="font-size:4em; margin-bottom:12px;">${badge}</div>
            <h3 style="font-size:1.8em; color:#2c3e50; margin-bottom:10px;">Hangman Complete!</h3>
            <p style="font-size:1.2em; color:#7f8c8d; margin-bottom:20px;">You solved <strong style="color:#667eea;">${hangmanScore}</strong> out of <strong>${hangmanTotal}</strong> words.</p>
            <button class="btn" onclick="initHangman()">Play New 20 🔁</button>
        </div>
    `;
}

function disableHangmanKeyboard() {
    document.querySelectorAll('.hangman-key').forEach(b => { b.disabled = true; });
}

// ============= K-POP EMOJI QUIZ =============
const kpopEmojiGroups = [
    { group: 'BTS', emojis: '💜🎤🌍✨', hint: '7-member boy group, massive global fanbase' },
    { group: 'BLACKPINK', emojis: '🌹🖤💗💅', hint: 'Girl group with rose, black & pink vibes' },
    { group: 'EXO', emojis: '🌌⭐🔵🌠', hint: 'Stars from a galaxy, Korean-Chinese group' },
    { group: 'TWICE', emojis: '🦋🌈🎀✌️', hint: '9-member girl group, colorful & cheerful' },
    { group: 'SEVENTEEN', emojis: '1️⃣7️⃣💎🎪🎭', hint: '13 members, 3 units, 1 team' },
    { group: 'GOT7', emojis: '🦅7️⃣✈️🌟', hint: 'International 7-member boy group' },
    { group: 'Stray Kids', emojis: '🗝️🌀🎸🔥', hint: 'Self-produced boy group, known for intense concepts' },
    { group: 'RED VELVET', emojis: '🔴🍓🎪🌹', hint: 'Dual concept: red (bold) & velvet (soft)' },
    { group: 'NCT', emojis: '🔷💚🧩♾️', hint: 'Neo Culture Technology, unlimited members concept' },
    { group: 'ENHYPEN', emojis: '🌙🧛🗡️🌑', hint: 'Dark vampire-inspired debut concepts' },
    { group: 'aespa', emojis: '🤖🌸💫🪞', hint: 'AI avatars & real members coexist' },
    { group: 'IVE', emojis: '👑💙🌺🏆', hint: 'Regal girl group with crown imagery' },
    { group: 'LE SSERAFIM', emojis: '🪶🌊💛🔱', hint: 'Fearless concept, "I\'m the revolution"' },
    { group: 'ATEEZ', emojis: '🏴‍☠️🗺️⚓🔮', hint: 'Pirate concept, "Treasure" series' },
    { group: 'MONSTA X', emojis: '👾🔥🕶️💪', hint: 'Monster-themed powerful boy group' },
    { group: 'SHINee', emojis: '💎✨🕺🌟', hint: 'Shinee world, iconic SM boy group' },
    { group: 'f(x)', emojis: '⚗️🔬💜🌀', hint: 'Experimental girl group, named after a function' },
    { group: 'MAMAMOO', emojis: '🎷🌻🎤🌙', hint: 'Powerful vocal girl group with retro vibes' },
    { group: 'Super Junior', emojis: '👔🎩🕺🌏', hint: 'Large veteran boy group, pioneers of Hallyu' },
    { group: 'Girls\' Generation', emojis: '👧🍬🎵🏃', hint: 'SNSD, iconic girl group, "Gee"' }
];

const KPOP_QUIZ_SIZE = 20;
let kpopEmojiLibraryCache = null;

function normalizeKpopEmojiEntry(entry) {
    if (!entry || typeof entry.group !== 'string' || typeof entry.emojis !== 'string') return null;
    return {
        group: entry.group.trim(),
        emojis: entry.emojis.trim(),
        hint: entry.hint && typeof entry.hint === 'string' ? entry.hint.trim() : 'Guess the group from emoji clues'
    };
}

async function loadKpopEmojiLibrary() {
    if (kpopEmojiLibraryCache) return kpopEmojiLibraryCache;

    const fallback = kpopEmojiGroups.map(normalizeKpopEmojiEntry).filter(Boolean);
    try {
        const res = await fetch('data/kpop-emoji-library.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw = await res.json();
        const parsed = Array.isArray(raw) ? raw.map(normalizeKpopEmojiEntry).filter(Boolean) : [];
        kpopEmojiLibraryCache = parsed.length ? parsed : fallback;
    } catch (error) {
        console.warn('Failed to load K-POP emoji library, using fallback list.', error);
        kpopEmojiLibraryCache = fallback;
    }

    return kpopEmojiLibraryCache;
}

let kpopScore, kpopTotal, kpopCurrentIndex, kpopAnswered;

async function initKpopEmoji() {
    const library = await loadKpopEmojiLibrary();
    const shuffled = [...library].sort(() => Math.random() - 0.5);

    kpopScore = 0;
    kpopTotal = 0;
    kpopAnswered = false;
    kpopCurrentIndex = 0;
    window._kpopQueue = shuffled.slice(0, Math.min(KPOP_QUIZ_SIZE, shuffled.length));

    const container = document.getElementById('game-kpopemoji');
    if (!container) return;

    if (!window._kpopQueue.length) {
        container.innerHTML = '<p style="text-align:center; color:#ef4444; font-weight:600;">No K-POP emoji questions available right now.</p>';
        return;
    }

    container.innerHTML = `
        <style>
            .kpop-score { text-align:center; font-size:1.1em; font-weight:600; color:#667eea; margin-bottom:12px; }
            .kpop-progress { text-align:center; font-size:0.9em; color:#7f8c8d; margin-bottom:18px; }
            .kpop-emojis { text-align:center; font-size:3.5em; letter-spacing:8px; margin-bottom:14px; line-height:1.3; }
            .kpop-hint { text-align:center; color:#7f8c8d; font-size:0.92em; font-style:italic; margin-bottom:22px; min-height:22px; }
            .kpop-options { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:18px; }
            .kpop-opt-btn { padding:14px 10px; font-size:1em; font-weight:600; background:#f8f9fa; color:#2c3e50; border:2px solid #e9ecef; border-radius:12px; cursor:pointer; transition:all 0.2s; }
            .kpop-opt-btn:hover:not(:disabled) { background:#667eea; color:white; border-color:#667eea; transform:translateY(-2px); }
            .kpop-opt-btn.kpop-correct { background:#10b981 !important; color:white !important; border-color:#10b981 !important; }
            .kpop-opt-btn.kpop-wrong { background:#ef4444 !important; color:white !important; border-color:#ef4444 !important; }
            .kpop-status { text-align:center; font-size:1.05em; font-weight:600; min-height:28px; margin-bottom:10px; }
            .kpop-next-btn { display:inline-block; }
            .kpop-result { text-align:center; padding:20px; }
            .kpop-result .big-emoji { font-size:4em; margin-bottom:12px; }
        </style>
        <div class="kpop-score" id="kpop-score">Score: 0</div>
        <div class="kpop-progress" id="kpop-progress">Question 1 of ${window._kpopQueue.length}</div>
        <div class="kpop-emojis" id="kpop-emojis"></div>
        <div class="kpop-hint" id="kpop-hint"></div>
        <div class="kpop-options" id="kpop-options"></div>
        <div class="kpop-status" id="kpop-status"></div>
        <div style="display:flex; gap:10px; justify-content:center; margin-top:15px;">
            <button class="btn kpop-next-btn" id="kpop-next-btn" style="display:none;" onclick="nextKpopQuestion()">Next ➡️</button>
            <button class="btn" style="background: linear-gradient(135deg,#334155,#0f172a);" onclick="initKpopEmoji()">New 20</button>
        </div>
    `;

    renderKpopQuestion();
}

function renderKpopQuestion() {
    const queue = window._kpopQueue;
    const item = queue[kpopCurrentIndex];
    kpopAnswered = false;

    document.getElementById('kpop-score').textContent = `Score: ${kpopScore}`;
    document.getElementById('kpop-progress').textContent = `Question ${kpopCurrentIndex + 1} of ${queue.length}`;
    document.getElementById('kpop-emojis').textContent = item.emojis;
    document.getElementById('kpop-hint').textContent = `💡 ${item.hint}`;
    document.getElementById('kpop-status').textContent = '';
    const nextBtn = document.getElementById('kpop-next-btn');
    if (nextBtn) nextBtn.style.display = 'none';

    // Build 4 options: the correct answer + 3 random wrong answers
    const wrongPool = queue.filter((_, i) => i !== kpopCurrentIndex);
    const wrongs = wrongPool.sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [item, ...wrongs].sort(() => Math.random() - 0.5);

    const optionsEl = document.getElementById('kpop-options');
    optionsEl.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'kpop-opt-btn';
        btn.textContent = opt.group;
        btn.onclick = () => answerKpop(opt.group, btn, item.group);
        optionsEl.appendChild(btn);
    });
}

function answerKpop(chosen, btn, correct) {
    if (kpopAnswered) return;
    kpopAnswered = true;
    kpopTotal++;

    const statusEl = document.getElementById('kpop-status');
    const optionsEl = document.getElementById('kpop-options');
    optionsEl.querySelectorAll('.kpop-opt-btn').forEach(b => { b.disabled = true; });

    if (chosen === correct) {
        btn.classList.add('kpop-correct');
        kpopScore++;
        document.getElementById('kpop-score').textContent = `Score: ${kpopScore}`;
        statusEl.textContent = '✅ Correct! 🎉';
        statusEl.style.color = '#10b981';
    } else {
        btn.classList.add('kpop-wrong');
        // Highlight correct answer
        optionsEl.querySelectorAll('.kpop-opt-btn').forEach(b => {
            if (b.textContent === correct) b.classList.add('kpop-correct');
        });
        statusEl.textContent = `❌ It was ${correct}`;
        statusEl.style.color = '#ef4444';
    }

    const nextBtn = document.getElementById('kpop-next-btn');
    if (nextBtn) {
        const isLast = kpopCurrentIndex >= window._kpopQueue.length - 1;
        nextBtn.textContent = isLast ? 'See Results 🏁' : 'Next ➡️';
        nextBtn.style.display = 'block';
    }
}

function nextKpopQuestion() {
    kpopCurrentIndex++;
    if (kpopCurrentIndex >= window._kpopQueue.length) {
        endKpopEmoji();
    } else {
        renderKpopQuestion();
    }
}

function endKpopEmoji() {
    const container = document.getElementById('game-kpopemoji');
    if (!container) return;
    const pct = Math.round((kpopScore / kpopTotal) * 100);
    let medal = pct === 100 ? '🥇' : pct >= 80 ? '🥈' : pct >= 60 ? '🥉' : '🎤';
    let msg = pct === 100 ? 'Perfect K-POP Fan!' : pct >= 80 ? 'Amazing K-POP Knowledge!' : pct >= 60 ? 'Pretty Good Kpoppy!' : 'Keep stanning!';
    container.innerHTML = `
        <div class="kpop-result">
            <div class="big-emoji">${medal}</div>
            <h3 style="font-size:1.8em; color:#2c3e50; margin-bottom:10px;">${msg}</h3>
            <p style="font-size:1.3em; color:#7f8c8d; margin-bottom:20px;">
                You got <strong style="color:#667eea;">${kpopScore}</strong> out of <strong>${kpopTotal}</strong> correct!
            </p>
            <button class="btn" onclick="initKpopEmoji()">Play Again 🔁</button>
        </div>
        <style>
            .kpop-result { text-align:center; padding:20px; }
            .kpop-result .big-emoji { font-size:4em; margin-bottom:12px; }
        </style>
    `;
}

// ============= K-POP IDOL QUIZ =============
const kpopIdols = [
    { idol: 'IU', emojis: '🌸🎵🌙🦋', hint: "Korea's national sweetheart, actress & soloist" },
    { idol: 'G-Dragon', emojis: '👑💎🎨🔥', hint: 'BIGBANG leader, fashion icon & pioneer' },
    { idol: 'Taeyang', emojis: '☀️🌊💪🎤', hint: "BIGBANG member, known for 'Eyes, Nose, Lips'" },
    { idol: 'BoA', emojis: '👸🌟💃🎤', hint: 'Queen of K-pop, trailblazer of the Hallyu wave' },
    { idol: 'Taeyeon', emojis: '🌙🤍🎵✨', hint: "Girls' Generation leader, beloved soloist" },
    { idol: 'Sunmi', emojis: '🌙🎭💋🌊', hint: "Former Wonder Girls member, known for 'Gashina'" },
    { idol: 'Hwasa', emojis: '🔥💄👑🌹', hint: 'MAMAMOO member, fierce & confident soloist' },
    { idol: 'Jimin', emojis: '🌸💜🕊️🩰', hint: 'BTS member celebrated for graceful dancing' },
    { idol: 'V', emojis: '🐻🎨🌌💜', hint: 'BTS member with a deep voice & artistic soul' },
    { idol: 'Jennie', emojis: '💅🐝🌹👑', hint: 'BLACKPINK member & solo artist, effortlessly chic' },
    { idol: 'Lisa', emojis: '🦋💛🔥👸', hint: 'BLACKPINK main dancer from Thailand' },
    { idol: 'Rosé', emojis: '🌹🎸🍷🌷', hint: 'BLACKPINK member known for her airy, husky vocals' },
    { idol: 'Karina', emojis: '🤖🖤💙🪞', hint: 'aespa leader with sharp visuals & strong stage presence' },
    { idol: 'Seulgi', emojis: '🐻🌊🎤💃', hint: 'Red Velvet main dancer, bear-like cuteness' },
    { idol: 'Yeji', emojis: '🦊🔥💫🎯', hint: 'ITZY leader with fierce, charismatic performances' },
    { idol: 'Wonyoung', emojis: '👑🌸🤍🌟', hint: 'IVE center, known for elegant tall visuals' },
    { idol: 'Hanni', emojis: '🐱🎀💗🌸', hint: 'NewJeans Vietnamese-Australian member' },
    { idol: 'Kai', emojis: '🐆🕺🌙🌊', hint: "EXO's main dancer, powerful & sensual performer" },
    { idol: 'Taemin', emojis: '🌙🌹🕊️💎', hint: 'SHINee member, legendary solo performer' },
    { idol: 'Chungha', emojis: '💃🌺🔥🏆', hint: "Former I.O.I member, powerful solo dancer known for 'Gotta Go'" },
    // ENHYPEN
    { idol: 'Jungwon', emojis: '🐱🌙✨🎵', hint: 'ENHYPEN leader with cat-like features and charismatic stage presence' },
    { idol: 'Heeseung', emojis: '🎸🌟🎤💪', hint: 'ENHYPEN multi-talented main vocalist, dancer and rapper' },
    { idol: 'Jay', emojis: '🌏😄🇺🇸🎤', hint: 'ENHYPEN trilingual member raised in Seattle' },
    { idol: 'Jake', emojis: '🇦🇺🌺💙🎵', hint: 'ENHYPEN Australian member with warm, melodic vocals' },
    { idol: 'Sunghoon', emojis: '⛸️❄️🤍👑', hint: 'ENHYPEN former figure skater known as the ice prince' },
    { idol: 'Sunoo', emojis: '☀️😊🌻💛', hint: "ENHYPEN's sunshine member, famous for his bright crescent-eye smile" },
    { idol: 'Ni-ki', emojis: '🇯🇵💃🔥🐍', hint: 'ENHYPEN youngest member, Japanese main dancer with explosive stage presence' },
    // Stray Kids
    { idol: 'Bang Chan', emojis: '🇦🇺🎵🌙💪', hint: 'Stray Kids leader, Australian-born producer of 3RACHA' },
    { idol: 'Lee Know', emojis: '🐱💃🌟🔥', hint: 'Stray Kids main dancer and cat lover' },
    { idol: 'Changbin', emojis: '🎤💥🔥⚡', hint: 'Stray Kids rapper renowned for rapid-fire deep-voice delivery' },
    { idol: 'Hyunjin', emojis: '🎨🌹🌊👑', hint: 'Stray Kids visual, painter and artistic performer' },
    { idol: 'Han', emojis: '🌧️🎵💔✍️', hint: 'Stray Kids rapper and emotional lyricist of 3RACHA' },
    { idol: 'Felix', emojis: '🇦🇺🌙💛✨', hint: 'Stray Kids Australian member with a surprisingly deep voice and freckles' },
    { idol: 'Seungmin', emojis: '⚾🐶🎤🌸', hint: 'Stray Kids vocalist and passionate baseball fan' },
    { idol: 'I.N', emojis: '🐣🌟😊🎵', hint: 'Stray Kids youngest member (maknae) with bright, youthful energy' },
    // BABYMONSTER
    { idol: 'Rora', emojis: '🌟💙🎤✨', hint: 'BABYMONSTER Korean main vocalist with powerful stage presence' },
    { idol: 'Pharita', emojis: '🌺🇹🇭💃🌸', hint: 'BABYMONSTER Thai member known for graceful dancing' },
    { idol: 'Asa', emojis: '🇯🇵🌙🎵💫', hint: 'BABYMONSTER Japanese member with a captivating charisma' },
    { idol: 'Ahyeon', emojis: '🔥💪🎤👑', hint: 'BABYMONSTER Korean rapper and vocalist with fierce energy' },
    { idol: 'Rami', emojis: '🌹🎤💗🌟', hint: 'BABYMONSTER Korean member with a sweet, melodic voice' },
    { idol: 'Chiquita', emojis: '🇹🇭💛🌺🎵', hint: 'BABYMONSTER Thai member with vibrant, joyful performances' },
    { idol: 'Ruka', emojis: '🇯🇵🌊💙✨', hint: 'BABYMONSTER Japanese member with sharp dance skills' }
];

let kpopIdolLibraryCache = null;

function normalizeKpopIdolEntry(entry) {
    if (!entry || typeof entry.idol !== 'string' || typeof entry.emojis !== 'string') return null;
    return {
        idol: entry.idol.trim(),
        emojis: entry.emojis.trim(),
        hint: entry.hint && typeof entry.hint === 'string' ? entry.hint.trim() : 'Guess the idol from emoji clues'
    };
}

async function loadKpopIdolLibrary() {
    if (kpopIdolLibraryCache) return kpopIdolLibraryCache;

    const fallback = kpopIdols.map(normalizeKpopIdolEntry).filter(Boolean);
    try {
        const res = await fetch('data/kpop-idol-library.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw = await res.json();
        const parsed = Array.isArray(raw) ? raw.map(normalizeKpopIdolEntry).filter(Boolean) : [];
        kpopIdolLibraryCache = parsed.length ? parsed : fallback;
    } catch (error) {
        console.warn('Failed to load K-POP idol library, using fallback list.', error);
        kpopIdolLibraryCache = fallback;
    }

    return kpopIdolLibraryCache;
}

let kpopIdolScore, kpopIdolTotal, kpopIdolCurrentIndex, kpopIdolAnswered;

async function initKpopIdol() {
    const library = await loadKpopIdolLibrary();
    const shuffled = [...library].sort(() => Math.random() - 0.5);

    kpopIdolScore = 0;
    kpopIdolTotal = 0;
    kpopIdolAnswered = false;
    kpopIdolCurrentIndex = 0;
    window._kpopIdolQueue = shuffled.slice(0, Math.min(KPOP_QUIZ_SIZE, shuffled.length));

    const container = document.getElementById('game-kpopidol');
    if (!container) return;

    if (!window._kpopIdolQueue.length) {
        container.innerHTML = '<p style="text-align:center; color:#ef4444; font-weight:600;">No K-POP idol questions available right now.</p>';
        return;
    }

    container.innerHTML = `
        <style>
            .idol-score { text-align:center; font-size:1.1em; font-weight:600; color:#e91e8c; margin-bottom:12px; }
            .idol-progress { text-align:center; font-size:0.9em; color:#7f8c8d; margin-bottom:18px; }
            .idol-emojis { text-align:center; font-size:3.5em; letter-spacing:8px; margin-bottom:14px; line-height:1.3; }
            .idol-hint { text-align:center; color:#7f8c8d; font-size:0.92em; font-style:italic; margin-bottom:22px; min-height:22px; }
            .idol-options { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:18px; }
            .idol-opt-btn { padding:14px 10px; font-size:1em; font-weight:600; background:#f8f9fa; color:#2c3e50; border:2px solid #e9ecef; border-radius:12px; cursor:pointer; transition:all 0.2s; }
            .idol-opt-btn:hover:not(:disabled) { background:#e91e8c; color:white; border-color:#e91e8c; transform:translateY(-2px); }
            .idol-opt-btn.idol-correct { background:#10b981 !important; color:white !important; border-color:#10b981 !important; }
            .idol-opt-btn.idol-wrong { background:#ef4444 !important; color:white !important; border-color:#ef4444 !important; }
            .idol-status { text-align:center; font-size:1.05em; font-weight:600; min-height:28px; margin-bottom:10px; }
            .idol-next-btn { display:inline-block; }
            .idol-result { text-align:center; padding:20px; }
            .idol-result .big-emoji { font-size:4em; margin-bottom:12px; }
        </style>
        <div class="idol-score" id="idol-score">Score: 0</div>
        <div class="idol-progress" id="idol-progress">Question 1 of ${window._kpopIdolQueue.length}</div>
        <div class="idol-emojis" id="idol-emojis"></div>
        <div class="idol-hint" id="idol-hint"></div>
        <div class="idol-options" id="idol-options"></div>
        <div class="idol-status" id="idol-status"></div>
        <div style="display:flex; gap:10px; justify-content:center; margin-top:15px;">
            <button class="btn idol-next-btn" id="idol-next-btn" style="display:none;" onclick="nextKpopIdolQuestion()">Next ➡️</button>
            <button class="btn" style="background: linear-gradient(135deg,#334155,#0f172a);" onclick="initKpopIdol()">New 20</button>
        </div>
    `;

    renderKpopIdolQuestion();
}

function renderKpopIdolQuestion() {
    const queue = window._kpopIdolQueue;
    const item = queue[kpopIdolCurrentIndex];
    kpopIdolAnswered = false;

    document.getElementById('idol-score').textContent = `Score: ${kpopIdolScore}`;
    document.getElementById('idol-progress').textContent = `Question ${kpopIdolCurrentIndex + 1} of ${queue.length}`;
    document.getElementById('idol-emojis').textContent = item.emojis;
    document.getElementById('idol-hint').textContent = `💡 ${item.hint}`;
    document.getElementById('idol-status').textContent = '';
    const nextBtn = document.getElementById('idol-next-btn');
    if (nextBtn) nextBtn.style.display = 'none';

    // Build 4 options: the correct answer + 3 random wrong answers
    const wrongPool = queue.filter((_, i) => i !== kpopIdolCurrentIndex);
    const wrongs = wrongPool.sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [item, ...wrongs].sort(() => Math.random() - 0.5);

    const optionsEl = document.getElementById('idol-options');
    optionsEl.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'idol-opt-btn';
        btn.textContent = opt.idol;
        btn.onclick = () => answerKpopIdol(opt.idol, btn, item.idol);
        optionsEl.appendChild(btn);
    });
}

function answerKpopIdol(chosen, btn, correct) {
    if (kpopIdolAnswered) return;
    kpopIdolAnswered = true;
    kpopIdolTotal++;

    const statusEl = document.getElementById('idol-status');
    const optionsEl = document.getElementById('idol-options');
    optionsEl.querySelectorAll('.idol-opt-btn').forEach(b => { b.disabled = true; });

    if (chosen === correct) {
        btn.classList.add('idol-correct');
        kpopIdolScore++;
        document.getElementById('idol-score').textContent = `Score: ${kpopIdolScore}`;
        statusEl.textContent = '✅ Correct! 🎉';
        statusEl.style.color = '#10b981';
    } else {
        btn.classList.add('idol-wrong');
        optionsEl.querySelectorAll('.idol-opt-btn').forEach(b => {
            if (b.textContent === correct) b.classList.add('idol-correct');
        });
        statusEl.textContent = `❌ It was ${correct}`;
        statusEl.style.color = '#ef4444';
    }

    const nextBtn = document.getElementById('idol-next-btn');
    if (nextBtn) {
        const isLast = kpopIdolCurrentIndex >= window._kpopIdolQueue.length - 1;
        nextBtn.textContent = isLast ? 'See Results 🏁' : 'Next ➡️';
        nextBtn.style.display = 'block';
    }
}

function nextKpopIdolQuestion() {
    kpopIdolCurrentIndex++;
    if (kpopIdolCurrentIndex >= window._kpopIdolQueue.length) {
        endKpopIdol();
    } else {
        renderKpopIdolQuestion();
    }
}

function endKpopIdol() {
    const container = document.getElementById('game-kpopidol');
    if (!container) return;
    const pct = Math.round((kpopIdolScore / kpopIdolTotal) * 100);
    let medal = pct === 100 ? '🥇' : pct >= 80 ? '🥈' : pct >= 60 ? '🥉' : '🌟';
    let msg = pct === 100 ? 'Ultimate Idol Expert!' : pct >= 80 ? 'Impressive Idol Knowledge!' : pct >= 60 ? 'Pretty Good Idol Fan!' : 'Keep stanning your faves!';
    container.innerHTML = `
        <div class="idol-result">
            <div class="big-emoji">${medal}</div>
            <h3 style="font-size:1.8em; color:#2c3e50; margin-bottom:10px;">${msg}</h3>
            <p style="font-size:1.3em; color:#7f8c8d; margin-bottom:20px;">
                You got <strong style="color:#e91e8c;">${kpopIdolScore}</strong> out of <strong>${kpopIdolTotal}</strong> correct!
            </p>
            <button class="btn" onclick="initKpopIdol()">Play Again 🔁</button>
        </div>
        <style>
            .idol-result { text-align:center; padding:20px; }
            .idol-result .big-emoji { font-size:4em; margin-bottom:12px; }
        </style>
    `;
}

// ============= 成语游戏 (CHENGYU QUIZ) =============
const chengyuList = [
    {
        chengyu: '一石二鸟',
        pinyin: 'yī shí èr niǎo',
        emoji: '🪨🐦🐦',
        meaning: 'Accomplish two things with a single action',
        meaning_cn: '一个行动，达到两个目的',
        story: 'Like throwing one stone and hitting two birds at the same time!'
    },
    {
        chengyu: '马到成功',
        pinyin: 'mǎ dào chéng gōng',
        emoji: '🐎🏆',
        meaning: 'Instant success as soon as you start',
        meaning_cn: '开始就立刻取得成功',
        story: 'When the horse arrives, success follows immediately — wish someone good luck!'
    },
    {
        chengyu: '画蛇添足',
        pinyin: 'huà shé tiān zú',
        emoji: '🐍🦶',
        meaning: 'Do something unnecessary that ruins the result',
        meaning_cn: '多此一举，反而坏事',
        story: 'Someone finished drawing a snake first, then added feet — snakes don\'t have feet!'
    },
    {
        chengyu: '守株待兔',
        pinyin: 'shǒu zhū dài tù',
        emoji: '🌳🐇⏳',
        meaning: 'Wait passively for luck instead of working hard',
        meaning_cn: '坐等机会，不主动努力',
        story: 'A farmer saw a rabbit run into a tree stump and die, so he stopped farming and waited by the stump forever!'
    },
    {
        chengyu: '亡羊补牢',
        pinyin: 'wáng yáng bǔ láo',
        emoji: '🐑🔧',
        meaning: 'Fix a problem after a loss — better late than never',
        meaning_cn: '出了问题再补救，亡羊补牢，未为迟也',
        story: 'After losing a sheep through a broken fence, mending the fence prevents further loss.'
    },
    {
        chengyu: '狐假虎威',
        pinyin: 'hú jiǎ hǔ wēi',
        emoji: '🦊🐯',
        meaning: 'Bully others by borrowing someone else\'s power',
        meaning_cn: '借别人的威势欺负人',
        story: 'A fox walked with a tiger and all animals fled — they feared the tiger, but the fox pretended they feared him!'
    },
    {
        chengyu: '掩耳盗铃',
        pinyin: 'yǎn ěr dào líng',
        emoji: '👂🔔🙈',
        meaning: 'Deceive yourself by ignoring obvious facts',
        meaning_cn: '自欺欺人',
        story: 'A thief covered his own ears while stealing a bell, thinking no one could hear it if he couldn\'t!'
    },
    {
        chengyu: '井底之蛙',
        pinyin: 'jǐng dǐ zhī wā',
        emoji: '🐸🪣',
        meaning: 'A narrow-minded person with limited knowledge',
        meaning_cn: '见识狭窄，眼界有限的人',
        story: 'A frog living at the bottom of a well thinks the little circle of sky above is the whole world.'
    },
    {
        chengyu: '对牛弹琴',
        pinyin: 'duì niú tán qín',
        emoji: '🐄🎵',
        meaning: 'Talk to someone who cannot understand you',
        meaning_cn: '说话不看对象，白费口舌',
        story: 'Playing a beautiful melody to a cow — the cow doesn\'t appreciate the music at all!'
    },
    {
        chengyu: '塞翁失马',
        pinyin: 'sài wēng shī mǎ',
        emoji: '🐎🔄',
        meaning: 'A seeming misfortune may turn out to be a blessing',
        meaning_cn: '祸兮福所倚，坏事可能变好事',
        story: 'An old man\'s horse ran away — neighbours said bad luck. Later the horse returned with more horses!'
    },
    {
        chengyu: '半途而废',
        pinyin: 'bàn tú ér fèi',
        emoji: '🏃💨❌',
        meaning: 'Give up halfway before finishing a task',
        meaning_cn: '做事做到一半就放弃',
        story: 'A student stopped studying halfway — he wasted all his earlier effort!'
    },
    {
        chengyu: '刻舟求剑',
        pinyin: 'kè zhōu qiú jiàn',
        emoji: '🚢🗡️',
        meaning: 'Try to solve a new problem with outdated thinking',
        meaning_cn: '用一成不变的方法应对变化的情况',
        story: 'A man dropped his sword from a boat, carved a mark on the boat\'s side, and looked for it there after landing!'
    },
    {
        chengyu: '南辕北辙',
        pinyin: 'nán yuán běi zhé',
        emoji: '🧭↕️',
        meaning: 'Act in the opposite way from what you intend',
        meaning_cn: '行动与目的相反',
        story: 'Wanting to go south but driving north — no matter how good the horses or how much food, you\'ll never arrive!'
    },
    {
        chengyu: '愚公移山',
        pinyin: 'yú gōng yí shān',
        emoji: '⛰️💪',
        meaning: 'Persevere despite enormous difficulty',
        meaning_cn: '坚持不懈，不畏艰难',
        story: 'An old man started moving two mountains blocking his village, saying his children and grandchildren would continue until done!'
    },
    {
        chengyu: '叶公好龙',
        pinyin: 'yè gōng hào lóng',
        emoji: '🐉😱',
        meaning: 'Pretend to love something you actually fear',
        meaning_cn: '表面上爱好某事，实际上并不真正喜欢',
        story: 'Lord Ye claimed to love dragons and decorated his home with them — when a real dragon appeared, he ran away in terror!'
    },
    {
        chengyu: '虎头蛇尾',
        pinyin: 'hǔ tóu shé wěi',
        emoji: '🐯🐍',
        meaning: 'Start strong but finish weakly',
        meaning_cn: '开始声势大，结尾草草了事',
        story: 'Like a creature with a fierce tiger\'s head but a thin, weak snake\'s tail — all bark at the start, nothing at the end!'
    },
    {
        chengyu: '滥竽充数',
        pinyin: 'làn yú chōng shù',
        emoji: '🎵😶',
        meaning: 'Pretend to have a skill you lack to make up the numbers',
        meaning_cn: '没有真才实学，混在行家里充数',
        story: 'A king liked his musicians to play together; one man who couldn\'t play hid among them. When the next king asked each to play solo, the fraud fled!'
    },
    {
        chengyu: '杯弓蛇影',
        pinyin: 'bēi gōng shé yǐng',
        emoji: '🍵🐍👁️',
        meaning: 'Be full of unnecessary suspicion and fear',
        meaning_cn: '疑神疑鬼，自寻烦恼',
        story: 'A man saw a snake\'s shadow in his wine cup, fell ill from fear, then realised it was just a reflection of a bow on the wall!'
    },
    {
        chengyu: '班门弄斧',
        pinyin: 'bān mén nòng fǔ',
        emoji: '🪓🧑‍🎨',
        meaning: 'Show off skills in front of an expert',
        meaning_cn: '在行家面前卖弄自己',
        story: 'Showing off your axe skills in front of Lu Ban — the greatest carpenter in ancient China — is embarrassing!'
    },
    {
        chengyu: '一箭双雕',
        pinyin: 'yī jiàn shuāng diāo',
        emoji: '🏹🦅🦅',
        meaning: 'Achieve two goals with a single effort',
        meaning_cn: '一举两得',
        story: 'A legendary archer shot one arrow and hit two eagles flying together — the origin of "kill two birds with one stone"!'
    }
];

let chengyuScore, chengyuTotal, chengyuCurrentIndex, chengyuAnswered;
const CHENGYU_QUIZ_SIZE = 20;
let chengyuLibraryCache = null;
let chengyuActiveCategory = 'all';

const CHENGYU_CATEGORY_META = {
    all: { label: '全部 All' },
    beginner: { label: '基础 Beginner' },
    intermediate: { label: '进阶 Intermediate' },
    advanced: { label: '挑战 Advanced' }
};

function normalizeChengyuCategory(rawCategory) {
    if (!rawCategory || typeof rawCategory !== 'string') return null;
    const key = rawCategory.trim().toLowerCase();
    return CHENGYU_CATEGORY_META[key] ? key : null;
}

function inferChengyuCategory(entry) {
    const hint = `${entry.meaning_cn || ''}${entry.meaning || ''}`;
    const complexity = hint.length;
    if (complexity <= 18) return 'beginner';
    if (complexity <= 32) return 'intermediate';
    return 'advanced';
}

function normalizeChengyuEntry(entry) {
    const fallbackLabel = 'Classic Chinese idiom';
    const fallbackLabelCn = '常用成语';
    const normalized = {
        chengyu: entry.chengyu,
        pinyin: entry.pinyin || '—',
        emoji: entry.emoji || '📚',
        meaning: entry.meaning || fallbackLabel,
        meaning_cn: entry.meaning_cn || fallbackLabelCn,
        story: entry.story || `${entry.chengyu}：${entry.meaning_cn || fallbackLabelCn}`
    };
    const explicitCategory = normalizeChengyuCategory(entry.category);
    return {
        ...normalized,
        category: explicitCategory || inferChengyuCategory(normalized)
    };
}

function buildChengyuQueue(categoryKey) {
    const fullLibrary = window._chengyuLibrary || [];
    const pool = categoryKey === 'all'
        ? fullLibrary
        : fullLibrary.filter(item => item.category === categoryKey);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const quizSize = Math.min(CHENGYU_QUIZ_SIZE, shuffled.length);

    window._chengyuPool = pool;
    window._chengyuQueue = shuffled.slice(0, quizSize);

    chengyuScore = 0;
    chengyuTotal = 0;
    chengyuCurrentIndex = 0;
    chengyuAnswered = false;
}

function startChengyuRound() {
    const categorySelect = document.getElementById('cy-category');
    chengyuActiveCategory = categorySelect ? categorySelect.value : 'all';
    buildChengyuQueue(chengyuActiveCategory);

    const emptyEl = document.getElementById('cy-empty');
    const panelEl = document.getElementById('cy-main-panel');
    if (!emptyEl || !panelEl) return;

    if (!window._chengyuQueue.length) {
        panelEl.style.display = 'none';
        emptyEl.style.display = 'block';
        emptyEl.textContent = 'This category has no Chengyu entries yet.';
        return;
    }

    panelEl.style.display = 'block';
    emptyEl.style.display = 'none';
    renderChengyuQuestion();
}

async function loadChengyuLibrary() {
    if (chengyuLibraryCache) {
        return chengyuLibraryCache;
    }

    const localLibrary = chengyuList.map(normalizeChengyuEntry);

    try {
        const response = await fetch('data/chengyu-library.json');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const remoteLibraryRaw = await response.json();
        const remoteLibrary = Array.isArray(remoteLibraryRaw)
            ? remoteLibraryRaw
                .filter(item => item && typeof item.chengyu === 'string' && item.chengyu.trim())
                .map(normalizeChengyuEntry)
            : [];

        const merged = [...localLibrary, ...remoteLibrary];
        const seen = new Set();
        chengyuLibraryCache = merged.filter(item => {
            if (seen.has(item.chengyu)) return false;
            seen.add(item.chengyu);
            return true;
        });
    } catch (error) {
        console.warn('Failed to load external Chengyu library, using built-in list only.', error);
        chengyuLibraryCache = localLibrary;
    }

    return chengyuLibraryCache;
}

async function initChengyu() {
    const fullLibrary = await loadChengyuLibrary();
    window._chengyuLibrary = fullLibrary;

    const container = document.getElementById('game-chengyu');
    if (!container) return;

    if (!window._chengyuLibrary.length) {
        container.innerHTML = '<p style="text-align:center; color:#ef4444; font-weight:600;">No Chengyu questions available right now.</p>';
        return;
    }

    container.innerHTML = `
        <style>
            .cy-score { text-align:center; font-size:1.1em; font-weight:600; color:#e74c3c; margin-bottom:8px; }
            .cy-progress { text-align:center; font-size:0.9em; color:#7f8c8d; margin-bottom:14px; }
            .cy-card { text-align:center; background:linear-gradient(135deg,#fff5f5 0%,#fff 100%); border:2px solid #fca5a5; border-radius:16px; padding:20px 16px 14px; margin-bottom:16px; }
            .cy-characters { font-size:3.2em; font-weight:900; color:#c0392b; letter-spacing:6px; margin-bottom:6px; line-height:1.2; font-family:'Noto Sans SC','SimSun','STSong',sans-serif; }
            .cy-pinyin { font-size:1em; color:#7f8c8d; letter-spacing:2px; margin-bottom:8px; }
            .cy-emoji { font-size:2.4em; margin-bottom:4px; }
            .cy-question-label { font-size:0.95em; color:#555; font-weight:600; }
            .cy-options { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:14px; }
            .cy-opt-btn { padding:14px 10px; font-size:0.92em; font-weight:600; background:#f8f9fa; color:#2c3e50; border:2px solid #e9ecef; border-radius:12px; cursor:pointer; transition:all 0.2s; line-height:1.4; }
            .cy-opt-btn:hover:not(:disabled) { background:#e74c3c; color:white; border-color:#e74c3c; transform:translateY(-2px); }
            .cy-opt-btn.cy-correct { background:#10b981 !important; color:white !important; border-color:#10b981 !important; }
            .cy-opt-btn.cy-wrong { background:#ef4444 !important; color:white !important; border-color:#ef4444 !important; }
            .cy-status { text-align:center; font-size:1em; font-weight:600; min-height:24px; margin-bottom:6px; }
            .cy-story { text-align:center; font-size:0.88em; color:#7f8c8d; font-style:italic; min-height:20px; margin-bottom:10px; padding:0 8px; }
            .cy-next-btn { display:block; margin:0 auto; }
            .cy-toolbar { display:flex; justify-content:center; align-items:center; gap:10px; margin-bottom:14px; flex-wrap:wrap; }
            .cy-filter-label { font-size:0.95em; color:#555; font-weight:600; }
            .cy-filter-select { padding:10px 12px; border:2px solid #e9ecef; border-radius:10px; background:white; color:#2c3e50; font-size:0.95em; font-weight:600; }
            .cy-filter-btn { padding:10px 14px; font-size:0.9em; }
            .cy-empty { text-align:center; color:#ef4444; font-weight:600; margin:12px 0 16px; }
            .cy-result { text-align:center; padding:20px; }
            .cy-result .big-emoji { font-size:4em; margin-bottom:12px; }
        </style>
        <div class="cy-toolbar">
            <span class="cy-filter-label">分类 Category:</span>
            <select id="cy-category" class="cy-filter-select" onchange="startChengyuRound()">
                <option value="all">${CHENGYU_CATEGORY_META.all.label}</option>
                <option value="beginner">${CHENGYU_CATEGORY_META.beginner.label}</option>
                <option value="intermediate">${CHENGYU_CATEGORY_META.intermediate.label}</option>
                <option value="advanced">${CHENGYU_CATEGORY_META.advanced.label}</option>
            </select>
            <button class="btn cy-filter-btn" onclick="startChengyuRound()">随机新题 New 20</button>
        </div>
        <div id="cy-empty" class="cy-empty" style="display:none;"></div>
        <div id="cy-main-panel">
            <div class="cy-score" id="cy-score">得分 Score: 0</div>
            <div class="cy-progress" id="cy-progress"></div>
            <div class="cy-card">
                <div class="cy-emoji" id="cy-emoji"></div>
                <div class="cy-characters" id="cy-characters"></div>
                <div class="cy-pinyin" id="cy-pinyin"></div>
                <div class="cy-question-label">这个成语是什么意思？ What does it mean?</div>
            </div>
            <div class="cy-options" id="cy-options"></div>
            <div class="cy-status" id="cy-status"></div>
            <div class="cy-story" id="cy-story"></div>
            <button class="btn cy-next-btn" id="cy-next-btn" style="display:none;" onclick="nextChengyuQuestion()">下一题 Next ➡️</button>
        </div>
    `;

    const categorySelect = document.getElementById('cy-category');
    if (categorySelect) categorySelect.value = chengyuActiveCategory;
    startChengyuRound();
}

function renderChengyuQuestion() {
    const queue = window._chengyuQueue;
    const item = queue[chengyuCurrentIndex];
    if (!item) return;
    chengyuAnswered = false;

    document.getElementById('cy-score').textContent = `得分 Score: ${chengyuScore}`;
    const categoryLabel = CHENGYU_CATEGORY_META[chengyuActiveCategory]?.label || CHENGYU_CATEGORY_META.all.label;
    document.getElementById('cy-progress').textContent = `第 ${chengyuCurrentIndex + 1} 题，共 ${queue.length} 题（${categoryLabel}，随机抽题）`;
    document.getElementById('cy-emoji').textContent = item.emoji;
    document.getElementById('cy-characters').textContent = item.chengyu;
    document.getElementById('cy-pinyin').textContent = item.pinyin;
    document.getElementById('cy-status').textContent = '';
    document.getElementById('cy-story').textContent = '';
    const nextBtn = document.getElementById('cy-next-btn');
    if (nextBtn) nextBtn.style.display = 'none';

    // Build 4 options: the correct answer + 3 random wrong answers
    const optionPool = (window._chengyuPool && window._chengyuPool.length >= 4) ? window._chengyuPool : queue;
    const wrongPool = optionPool.filter(entry => entry.chengyu !== item.chengyu);
    const wrongs = wrongPool.sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [item, ...wrongs].sort(() => Math.random() - 0.5);

    const optionsEl = document.getElementById('cy-options');
    optionsEl.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'cy-opt-btn';
        btn.dataset.chengyu = opt.chengyu;
        btn.innerHTML = `${opt.meaning}<br><small style="font-weight:400;color:inherit;opacity:0.85">${opt.meaning_cn}</small>`;
        btn.onclick = () => answerChengyu(opt.chengyu, btn, item.chengyu, item.story);
        optionsEl.appendChild(btn);
    });
}

function answerChengyu(chosen, btn, correct, story) {
    if (chengyuAnswered) return;
    chengyuAnswered = true;
    chengyuTotal++;

    const statusEl = document.getElementById('cy-status');
    const storyEl = document.getElementById('cy-story');
    const optionsEl = document.getElementById('cy-options');
    optionsEl.querySelectorAll('.cy-opt-btn').forEach(b => { b.disabled = true; });

    if (chosen === correct) {
        btn.classList.add('cy-correct');
        chengyuScore++;
        document.getElementById('cy-score').textContent = `得分 Score: ${chengyuScore}`;
        statusEl.textContent = '✅ 答对了！Correct! 🎉';
        statusEl.style.color = '#10b981';
    } else {
        btn.classList.add('cy-wrong');
        const correctItem = window._chengyuQueue.find(c => c.chengyu === correct);
        optionsEl.querySelectorAll('.cy-opt-btn').forEach(b => {
            if (b.dataset.chengyu === correct) b.classList.add('cy-correct');
        });
        const correctMeaning = correctItem ? ` — ${correctItem.meaning}` : '';
        statusEl.textContent = `❌ 答错了！The answer was: ${correct}${correctMeaning}`;
        statusEl.style.color = '#ef4444';
    }

    storyEl.textContent = `📖 ${story}`;

    const nextBtn = document.getElementById('cy-next-btn');
    if (nextBtn) {
        const isLast = chengyuCurrentIndex >= window._chengyuQueue.length - 1;
        nextBtn.textContent = isLast ? '查看结果 See Results 🏁' : '下一题 Next ➡️';
        nextBtn.style.display = 'block';
    }
}

function nextChengyuQuestion() {
    chengyuCurrentIndex++;
    if (chengyuCurrentIndex >= window._chengyuQueue.length) {
        endChengyu();
    } else {
        renderChengyuQuestion();
    }
}

function endChengyu() {
    const container = document.getElementById('game-chengyu');
    if (!container) return;
    const pct = Math.round((chengyuScore / chengyuTotal) * 100);
    let medal = pct === 100 ? '🥇' : pct >= 80 ? '🥈' : pct >= 60 ? '🥉' : '📚';
    let msg = pct === 100 ? '成语大师！Chengyu Master!' : pct >= 80 ? '非常棒！Excellent!' : pct >= 60 ? '还不错！Good job!' : '继续加油！Keep practising!';
    container.innerHTML = `
        <div class="cy-result">
            <div class="big-emoji">${medal}</div>
            <h3 style="font-size:1.8em; color:#2c3e50; margin-bottom:10px;">${msg}</h3>
            <p style="font-size:1.3em; color:#7f8c8d; margin-bottom:20px;">
                你答对了 <strong style="color:#e74c3c;">${chengyuScore}</strong> / <strong>${chengyuTotal}</strong> 题！
            </p>
            <button class="btn" onclick="initChengyu()">再玩一次 Play Again 🔁</button>
        </div>
        <style>
            .cy-result { text-align:center; padding:20px; }
            .cy-result .big-emoji { font-size:4em; margin-bottom:12px; }
        </style>
    `;
}

// ============= RUBIK'S CUBE =============
const RK_U = 0, RK_D = 1, RK_F = 2, RK_B = 3, RK_L = 4, RK_R = 5;
const RK_FACE_COLORS = ['#ffffff', '#ffd54f', '#22c55e', '#2563eb', '#fb923c', '#ef4444'];
const RK_FACE_LETTER_TO_INDEX = { U: RK_U, D: RK_D, F: RK_F, B: RK_B, L: RK_L, R: RK_R };
const RK_SCRAMBLE_FACES = ['U', 'D', 'R', 'L', 'F', 'B'];
const RK_AXIS_GROUP = { U: 'UD', D: 'UD', R: 'RL', L: 'RL', F: 'FB', B: 'FB' };
const RK_MOVE_BUTTONS = [
    {mv: 'U', bg: '#6366f1'}, {mv: "U'", bg: '#818cf8'}, {mv: 'U2', bg: '#a5b4fc'},
    {mv: 'R', bg: '#ef4444'}, {mv: "R'", bg: '#f87171'}, {mv: 'R2', bg: '#fca5a5'},
    {mv: 'F', bg: '#10b981'}, {mv: "F'", bg: '#34d399'}, {mv: 'F2', bg: '#6ee7b7'},
    {mv: 'D', bg: '#f59e0b'}, {mv: "D'", bg: '#fbbf24'}, {mv: 'D2', bg: '#fcd34d'},
    {mv: 'L', bg: '#f97316'}, {mv: "L'", bg: '#fb923c'}, {mv: 'L2', bg: '#fdba74'},
    {mv: 'B', bg: '#3b82f6'}, {mv: "B'", bg: '#60a5fa'}, {mv: 'B2', bg: '#93c5fd'}
];
let rubikCube = null;
let rubikMoveCount = 0;
let rubikRotX = 0.5;
let rubikRotY = -0.7;
let rubik3DDrag = false;
let rubik3DLast = {x: 0, y: 0};
let rubikScramble = '';
let rubikLastMove = '—';
let rubikStatusMessage = 'Generate a scramble to begin.';
let rubikStatusTone = 'ready';
let rubikHistory = [];
let rubikRedoStack = [];
let rubikTimerElapsed = 0;
let rubikTimerStartedAt = 0;
let rubikTimerInterval = null;
let rubikTimerRunning = false;
let rubikSolverReady = false;
let rubikSolverInitPromise = null;
let rubikResizeHandler = null;
let rubikFullscreenHandler = null;
let rubikKeyHandler = null;
let rubikStickerHitRegions = [];
let rubikPointerState = {mode: null, pointerId: null, start: {x: 0, y: 0}, last: {x: 0, y: 0}, sticker: null};
let rubikActiveAnimation = null;
let rubikAnimationFrame = null;
let rubikSequence = null;
let rubikSolutionText = 'No hint yet.';
let rubikSolutionMoves = [];
let rubikSolutionActiveIndex = -1;

const RK_FACE_NORMALS = [
    [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1], [-1, 0, 0], [1, 0, 0]
];
const RK_FACE_CORNERS = [
    [[-1, 1, -1], [1, 1, -1], [1, 1, 1], [-1, 1, 1]],
    [[-1, -1, 1], [1, -1, 1], [1, -1, -1], [-1, -1, -1]],
    [[-1, 1, 1], [1, 1, 1], [1, -1, 1], [-1, -1, 1]],
    [[1, 1, -1], [-1, 1, -1], [-1, -1, -1], [1, -1, -1]],
    [[-1, 1, 1], [-1, 1, -1], [-1, -1, -1], [-1, -1, 1]],
    [[1, 1, -1], [1, 1, 1], [1, -1, 1], [1, -1, -1]]
];
const RK_FACE_LOCAL_AXES = [
    {u: [1, 0, 0], v: [0, 0, 1]},
    {u: [1, 0, 0], v: [0, 0, -1]},
    {u: [1, 0, 0], v: [0, -1, 0]},
    {u: [-1, 0, 0], v: [0, -1, 0]},
    {u: [0, 0, 1], v: [0, -1, 0]},
    {u: [0, 0, -1], v: [0, -1, 0]}
];

function cleanupRubik() {
    cancelRubikMotion();
    stopRubikTimer();
    if (rubikResizeHandler) {
        window.removeEventListener('resize', rubikResizeHandler);
        rubikResizeHandler = null;
    }
    if (rubikFullscreenHandler) {
        document.removeEventListener('fullscreenchange', rubikFullscreenHandler);
        rubikFullscreenHandler = null;
    }
    if (rubikKeyHandler) {
        document.removeEventListener('keydown', rubikKeyHandler);
        rubikKeyHandler = null;
    }
    rubikStickerHitRegions = [];
    rubikPointerState = {mode: null, pointerId: null, start: {x: 0, y: 0}, last: {x: 0, y: 0}, sticker: null};
}

function setRubikStatus(message, tone = 'ready') {
    rubikStatusMessage = message;
    rubikStatusTone = tone;
    updateRubikStatus();
}

function createRubikCube() {
    return typeof Cube === 'function' ? new Cube() : null;
}

function cloneRubikCube(cube = rubikCube) {
    return cube && typeof Cube === 'function' ? new Cube(cube.toJSON()) : null;
}

function cancelRubikMotion() {
    if (rubikAnimationFrame) {
        cancelAnimationFrame(rubikAnimationFrame);
        rubikAnimationFrame = null;
    }
    rubikActiveAnimation = null;
    rubikSequence = null;
}

function setRubikSolutionText(text) {
    rubikSolutionText = text || 'No hint yet.';
    rubikSolutionMoves = [];
    rubikSolutionActiveIndex = -1;
    renderRubikSolutionOutput();
}

function setRubikSolutionSequence(moves, activeIndex = -1) {
    rubikSolutionMoves = Array.isArray(moves) ? [...moves] : [];
    rubikSolutionActiveIndex = activeIndex;
    rubikSolutionText = rubikSolutionMoves.join(' ') || 'No hint yet.';
    renderRubikSolutionOutput();
}

function renderRubikSolutionOutput() {
    const solutionEl = document.getElementById('rk-solution');
    if (!solutionEl) return;
    if (!rubikSolutionMoves.length) {
        solutionEl.textContent = rubikSolutionText;
        return;
    }
    solutionEl.textContent = '';
    rubikSolutionMoves.forEach((move, index) => {
        const chip = document.createElement('span');
        chip.className = 'rk-solution-move';
        if (rubikSolutionActiveIndex >= 0 && index < rubikSolutionActiveIndex) chip.classList.add('done');
        if (index === rubikSolutionActiveIndex) chip.classList.add('active');
        chip.textContent = move;
        solutionEl.appendChild(chip);
    });
}

function rubikStateFaces(cube = rubikCube) {
    const facelets = cube ? cube.asString() : 'UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB';
    const faces = Array.from({length: 6}, () => Array.from({length: 3}, () => Array(3).fill(0)));
    [
        {face: RK_U, offset: 0},
        {face: RK_R, offset: 9},
        {face: RK_F, offset: 18},
        {face: RK_D, offset: 27},
        {face: RK_L, offset: 36},
        {face: RK_B, offset: 45}
    ].forEach(({face, offset}) => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                faces[face][i][j] = RK_FACE_LETTER_TO_INDEX[facelets[offset + i * 3 + j]];
            }
        }
    });
    return faces;
}

function rubikNormalizeAlgorithm(algorithm) {
    return String(algorithm || '')
        .trim()
        .replace(/,/g, ' ')
        .split(/\s+/)
        .filter(Boolean)
        .map(move => move.toUpperCase().replace(/’/g, "'"))
        .filter(move => /^[URFDLB](2|'|2')?$/.test(move))
        .map(move => move.endsWith("2'") ? `${move[0]}2` : move);
}

function rubikGenerateScramble(length = 25) {
    const suffixes = ['', "'", '2'];
    const result = [];
    let lastFace = '';
    let lastAxis = '';
    while (result.length < length) {
        const face = RK_SCRAMBLE_FACES[Math.floor(Math.random() * RK_SCRAMBLE_FACES.length)];
        const axis = RK_AXIS_GROUP[face];
        if (face === lastFace || axis === lastAxis) continue;
        result.push(face + suffixes[Math.floor(Math.random() * suffixes.length)]);
        lastFace = face;
        lastAxis = axis;
    }
    return result.join(' ');
}

function rubikFormatTime(ms) {
    const totalTenths = Math.floor(ms / 100);
    const minutes = Math.floor(totalTenths / 600);
    const seconds = Math.floor((totalTenths % 600) / 10);
    const tenths = totalTenths % 10;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${tenths}`;
}

function getRubikElapsed() {
    return rubikTimerRunning ? Date.now() - rubikTimerStartedAt : rubikTimerElapsed;
}

function stopRubikTimer() {
    if (!rubikTimerRunning) return;
    rubikTimerElapsed = Date.now() - rubikTimerStartedAt;
    rubikTimerRunning = false;
    if (rubikTimerInterval) {
        clearInterval(rubikTimerInterval);
        rubikTimerInterval = null;
    }
}

function startRubikTimer() {
    rubikTimerElapsed = 0;
    rubikTimerStartedAt = Date.now();
    rubikTimerRunning = true;
    if (rubikTimerInterval) clearInterval(rubikTimerInterval);
    rubikTimerInterval = setInterval(updateRubikStats, 100);
}

function resetRubikTimer() {
    stopRubikTimer();
    rubikTimerElapsed = 0;
    updateRubikStats();
}

function rubikTPS() {
    const seconds = getRubikElapsed() / 1000;
    if (!seconds) return '0.00';
    return (rubikMoveCount / seconds).toFixed(2);
}

function r3dRotate(x, y, z) {
    const cy = Math.cos(rubikRotY), sy = Math.sin(rubikRotY);
    const x1 = x * cy + z * sy;
    const z1 = -x * sy + z * cy;
    const cx = Math.cos(rubikRotX), sx = Math.sin(rubikRotX);
    return [x1, y * cx - z1 * sx, y * sx + z1 * cx];
}

function r3dProject(x, y, z, width, height, scale) {
    const fov = 4.8;
    const d = fov / (fov + z);
    return [width / 2 + x * scale * d, height / 2 - y * scale * d];
}

function r3dStickerCorners(face, i, j, n) {
    const cellSize = 2 / n;
    const gap = 0.07;
    const s = cellSize;
    const g = gap;
    switch (face) {
        case RK_U: return [[-1 + j * s + g, 1, -1 + i * s + g], [-1 + (j + 1) * s - g, 1, -1 + i * s + g], [-1 + (j + 1) * s - g, 1, -1 + (i + 1) * s - g], [-1 + j * s + g, 1, -1 + (i + 1) * s - g]];
        case RK_D: return [[-1 + j * s + g, -1, 1 - i * s - g], [-1 + (j + 1) * s - g, -1, 1 - i * s - g], [-1 + (j + 1) * s - g, -1, 1 - (i + 1) * s + g], [-1 + j * s + g, -1, 1 - (i + 1) * s + g]];
        case RK_F: return [[-1 + j * s + g, 1 - i * s - g, 1], [-1 + (j + 1) * s - g, 1 - i * s - g, 1], [-1 + (j + 1) * s - g, 1 - (i + 1) * s + g, 1], [-1 + j * s + g, 1 - (i + 1) * s + g, 1]];
        case RK_B: return [[1 - j * s - g, 1 - i * s - g, -1], [1 - (j + 1) * s + g, 1 - i * s - g, -1], [1 - (j + 1) * s + g, 1 - (i + 1) * s + g, -1], [1 - j * s - g, 1 - (i + 1) * s + g, -1]];
        case RK_R: return [[1, 1 - i * s - g, 1 - j * s - g], [1, 1 - i * s - g, 1 - (j + 1) * s + g], [1, 1 - (i + 1) * s + g, 1 - (j + 1) * s + g], [1, 1 - (i + 1) * s + g, 1 - j * s - g]];
        case RK_L: return [[-1, 1 - i * s - g, -1 + j * s + g], [-1, 1 - i * s - g, -1 + (j + 1) * s - g], [-1, 1 - (i + 1) * s + g, -1 + (j + 1) * s - g], [-1, 1 - (i + 1) * s + g, -1 + j * s + g]];
    }
}

function r3dShadeColor(hex, factor) {
    const value = hex.replace('#', '');
    const r = parseInt(value.slice(0, 2), 16);
    const g = parseInt(value.slice(2, 4), 16);
    const b = parseInt(value.slice(4, 6), 16);
    return `rgb(${Math.min(255, Math.round(r * factor))},${Math.min(255, Math.round(g * factor))},${Math.min(255, Math.round(b * factor))})`;
}

function rubikDot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function rubikCross(a, b) {
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
    ];
}

function rubikScale(vec, factor) {
    return [vec[0] * factor, vec[1] * factor, vec[2] * factor];
}

function rubikAdd(a, b) {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function rubikNormalize(vec) {
    const length = Math.hypot(vec[0], vec[1], vec[2]);
    if (!length) return [0, 0, 0];
    return [vec[0] / length, vec[1] / length, vec[2] / length];
}

function rubikAverage(points) {
    return rubikScale(points.reduce((sum, point) => rubikAdd(sum, point), [0, 0, 0]), 1 / points.length);
}

function rubikRotateAroundAxis(point, axis, angle) {
    const [ux, uy, uz] = rubikNormalize(axis);
    const [x, y, z] = point;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [
        x * (cos + ux * ux * (1 - cos)) + y * (ux * uy * (1 - cos) - uz * sin) + z * (ux * uz * (1 - cos) + uy * sin),
        x * (uy * ux * (1 - cos) + uz * sin) + y * (cos + uy * uy * (1 - cos)) + z * (uy * uz * (1 - cos) - ux * sin),
        x * (uz * ux * (1 - cos) - uy * sin) + y * (uz * uy * (1 - cos) + ux * sin) + z * (cos + uz * uz * (1 - cos))
    ];
}

function rubikMoveAnimationInfo(move) {
    const normalized = rubikNormalizeAlgorithm(move)[0];
    if (!normalized) return null;
    const face = normalized[0];
    return {
        move: normalized,
        face,
        axis: ({
            U: [0, 1, 0],
            D: [0, -1, 0],
            F: [0, 0, 1],
            B: [0, 0, -1],
            L: [-1, 0, 0],
            R: [1, 0, 0]
        })[face],
        angle: (Math.PI / 2) * (normalized.includes('2') ? 2 : 1) * (normalized.includes("'") ? -1 : 1),
        duration: normalized.includes('2') ? 240 : 180
    };
}

function rubikPointOnAnimatedLayer(point, animation) {
    return animation && rubikDot(point, animation.axis) > 0.55;
}

function rubikInsetPolygon(points, amount = 0.18) {
    const center = points.reduce((sum, point) => [sum[0] + point[0], sum[1] + point[1]], [0, 0]);
    const centerX = center[0] / points.length;
    const centerY = center[1] / points.length;
    return points.map(([x, y]) => [x + (centerX - x) * amount, y + (centerY - y) * amount]);
}

function rubikFillQuad(ctx, points, fillStyle) {
    ctx.beginPath();
    points.forEach(([x, y], index) => {
        index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = fillStyle;
    ctx.fill();
}

function drawRubik3D() {
    const canvas = document.getElementById('rk-canvas');
    if (!canvas || !rubikCube) return;
    const cubeForRender = rubikActiveAnimation?.cube || rubikCube;
    const faces = rubikStateFaces(cubeForRender);
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const scale = Math.min(width, height) * 0.34;
    const animation = rubikActiveAnimation;
    const lightDir = rubikNormalize([0.45, 1.1, 0.75]);

    ctx.clearRect(0, 0, width, height);
    rubikStickerHitRegions = [];

    const bg = ctx.createLinearGradient(0, 0, width, height);
    bg.addColorStop(0, '#0f172a');
    bg.addColorStop(0.45, '#111827');
    bg.addColorStop(1, '#1e293b');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    const glow = ctx.createRadialGradient(width / 2, height * 0.42, scale * 0.15, width / 2, height * 0.42, scale * 1.25);
    glow.addColorStop(0, 'rgba(99,102,241,0.28)');
    glow.addColorStop(0.6, 'rgba(59,130,246,0.1)');
    glow.addColorStop(1, 'rgba(15,23,42,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    ctx.beginPath();
    ctx.ellipse(width / 2, height * 0.78, scale * 0.8, scale * 0.22, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.55)';
    ctx.fill();

    const bodyFaces = [];
    for (let face = 0; face < 6; face++) {
        let normal = RK_FACE_NORMALS[face];
        let corners = RK_FACE_CORNERS[face];
        if (animation && rubikPointOnAnimatedLayer(rubikAverage(corners), animation)) {
            normal = rubikRotateAroundAxis(normal, animation.axis, animation.angle * animation.progress);
            corners = corners.map(point => rubikRotateAroundAxis(point, animation.axis, animation.angle * animation.progress));
        }
        const [rnx, rny, rnz] = r3dRotate(...normal);
        if (rnz <= 0) continue;
        const points = corners.map(point => {
            const [rx, ry, rz] = r3dRotate(...point);
            const [px, py] = r3dProject(rx, ry, rz, width, height, scale);
            return [px, py, rz];
        });
        bodyFaces.push({
            depth: points.reduce((sum, point) => sum + point[2], 0) / points.length,
            points: points.map(([x, y]) => [x, y]),
            glow: Math.max(0.2, rubikDot(rubikNormalize([rnx, rny, rnz]), lightDir))
        });
    }
    bodyFaces.sort((a, b) => a.depth - b.depth);
    bodyFaces.forEach(({points, glow}) => {
        const gradient = ctx.createLinearGradient(points[0][0], points[0][1], points[2][0], points[2][1]);
        gradient.addColorStop(0, r3dShadeColor('#0b1020', 0.88 + glow * 0.16));
        gradient.addColorStop(1, r3dShadeColor('#020617', 0.74 + glow * 0.08));
        rubikFillQuad(ctx, points, gradient);
        ctx.strokeStyle = 'rgba(255,255,255,0.12)';
        ctx.lineWidth = Math.max(1.25, width / 310);
        ctx.stroke();
    });

    const stickers = [];
    for (let face = 0; face < 6; face++) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let corners = r3dStickerCorners(face, i, j, 3);
                let normal = RK_FACE_NORMALS[face];
                let center = rubikAverage(corners);
                if (animation && rubikPointOnAnimatedLayer(center, animation)) {
                    corners = corners.map(point => rubikRotateAroundAxis(point, animation.axis, animation.angle * animation.progress));
                    normal = rubikRotateAroundAxis(normal, animation.axis, animation.angle * animation.progress);
                    center = rubikRotateAroundAxis(center, animation.axis, animation.angle * animation.progress);
                }
                const rotatedNormal = r3dRotate(...normal);
                if (rotatedNormal[2] <= 0.02) continue;
                const projected = corners.map(point => {
                    const rotated = r3dRotate(...point);
                    const [px, py] = r3dProject(rotated[0], rotated[1], rotated[2], width, height, scale);
                    return [px, py, rotated[2]];
                });
                const screenPoints = projected.map(([x, y]) => [x, y]);
                const depth = projected.reduce((sum, point) => sum + point[2], 0) / projected.length;
                const light = Math.max(0.42, rubikDot(rubikNormalize(rotatedNormal), lightDir) * 0.58 + 0.54);
                stickers.push({
                    face,
                    i,
                    j,
                    center,
                    normal,
                    points: screenPoints,
                    depth,
                    light,
                    color: RK_FACE_COLORS[faces[face][i][j]]
                });
            }
        }
    }

    stickers.sort((a, b) => a.depth - b.depth);
    stickers.forEach(sticker => {
        const {points, color, light} = sticker;
        const [p0, , p2] = points;
        const gradient = ctx.createLinearGradient(p0[0], p0[1], p2[0], p2[1]);
        gradient.addColorStop(0, r3dShadeColor(color, light * 1.16));
        gradient.addColorStop(0.55, r3dShadeColor(color, light * 0.98));
        gradient.addColorStop(1, r3dShadeColor(color, light * 0.74));
        ctx.shadowColor = 'rgba(15, 23, 42, 0.24)';
        ctx.shadowBlur = Math.max(6, width / 90);
        ctx.shadowOffsetY = Math.max(1, width / 340);
        rubikFillQuad(ctx, points, gradient);
        ctx.shadowColor = 'transparent';
        const inset = rubikInsetPolygon(points, 0.15);
        const gloss = ctx.createLinearGradient(inset[0][0], inset[0][1], inset[2][0], inset[2][1]);
        gloss.addColorStop(0, 'rgba(255,255,255,0.38)');
        gloss.addColorStop(0.35, 'rgba(255,255,255,0.08)');
        gloss.addColorStop(1, 'rgba(255,255,255,0)');
        rubikFillQuad(ctx, inset, gloss);
        ctx.beginPath();
        points.forEach(([x, y], index) => index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y));
        ctx.closePath();
        ctx.strokeStyle = 'rgba(15,23,42,0.28)';
        ctx.lineWidth = Math.max(1.2, width / 340);
        ctx.stroke();
        rubikStickerHitRegions.push(sticker);
    });
}

function resizeRubikCanvas() {
    const canvas = document.getElementById('rk-canvas');
    const stage = document.getElementById('rk-stage');
    const shell = document.getElementById('rk-shell');
    if (!canvas || !stage || !shell) return;
    const dpr = window.devicePixelRatio || 1;
    const fullscreen = document.fullscreenElement === shell;
    const cssWidth = Math.min(stage.clientWidth - 24, fullscreen ? window.innerWidth - 80 : 760);
    const cssHeight = fullscreen ? Math.min(window.innerHeight * 0.7, 720) : Math.min(Math.max(cssWidth * 0.68, 360), 520);
    canvas.style.width = `${Math.max(cssWidth, 280)}px`;
    canvas.style.height = `${Math.max(cssHeight, 280)}px`;
    canvas.width = Math.round(Math.max(cssWidth, 280) * dpr);
    canvas.height = Math.round(Math.max(cssHeight, 280) * dpr);
    drawRubik3D();
}

function rubikCanvasPointFromEvent(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };
}

function rubikPointInPolygon(point, polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];
        const spansPointY = (yi > point.y) !== (yj > point.y);
        if (!spansPointY) continue;
        if (yj === yi) continue;
        const intersects = point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;
        if (intersects) inside = !inside;
    }
    return inside;
}

function rubikHitTestSticker(point) {
    for (let index = rubikStickerHitRegions.length - 1; index >= 0; index--) {
        const region = rubikStickerHitRegions[index];
        if (rubikPointInPolygon(point, region.points)) return region;
    }
    return null;
}

function rubikProjectedVector(canvas, origin, vector) {
    const scale = Math.min(canvas.width, canvas.height) * 0.34;
    const [orx, ory, orz] = r3dRotate(...origin);
    const [px1, py1] = r3dProject(orx, ory, orz, canvas.width, canvas.height, scale);
    const target = rubikAdd(origin, vector);
    const [trx, ry2, trz] = r3dRotate(...target);
    const [px2, py2] = r3dProject(trx, ry2, trz, canvas.width, canvas.height, scale);
    return [px2 - px1, py2 - py1];
}

function rubikMoveFaceFromAxis(axis) {
    if (axis[0] === 1) return 'R';
    if (axis[0] === -1) return 'L';
    if (axis[1] === 1) return 'U';
    if (axis[1] === -1) return 'D';
    if (axis[2] === 1) return 'F';
    if (axis[2] === -1) return 'B';
    return null;
}

function rubikMoveFromDrag(canvas, sticker, dragVector) {
    if (!sticker) return null;
    const localAxes = RK_FACE_LOCAL_AXES[sticker.face];
    const projectedU = rubikProjectedVector(canvas, sticker.center, rubikScale(localAxes.u, 0.45));
    const projectedV = rubikProjectedVector(canvas, sticker.center, rubikScale(localAxes.v, 0.45));
    const uDot = dragVector[0] * projectedU[0] + dragVector[1] * projectedU[1];
    const vDot = dragVector[0] * projectedV[0] + dragVector[1] * projectedV[1];
    const localAxis = Math.abs(uDot) >= Math.abs(vDot) ? localAxes.u : localAxes.v;
    const turnAxis = rubikCross(sticker.normal, localAxis);
    const layerValue = rubikDot(sticker.center, turnAxis);
    if (Math.abs(layerValue) < 0.55) return null;
    const face = rubikMoveFaceFromAxis(turnAxis);
    if (!face) return null;
    const tangent = rubikCross(turnAxis, sticker.center);
    const projectedTangent = rubikProjectedVector(canvas, sticker.center, rubikScale(tangent, 0.45));
    const direction = dragVector[0] * projectedTangent[0] + dragVector[1] * projectedTangent[1];
    if (Math.abs(direction) < 1) return null;
    return `${face}${direction < 0 ? "'" : ''}`;
}

function setupRubik3DCanvas() {
    const canvas = document.getElementById('rk-canvas');
    if (!canvas) return;
    canvas.style.cursor = 'grab';
    canvas.addEventListener('pointerdown', event => {
        if (rubikActiveAnimation || rubikSequence) return;
        const point = rubikCanvasPointFromEvent(canvas, event);
        const sticker = rubikHitTestSticker(point);
        rubikPointerState = {
            mode: sticker ? 'turn' : 'orbit',
            pointerId: event.pointerId,
            start: point,
            last: point,
            sticker
        };
        rubik3DDrag = !sticker;
        rubik3DLast = {x: point.x, y: point.y};
        canvas.style.cursor = sticker ? 'pointer' : 'grabbing';
        canvas.setPointerCapture?.(event.pointerId);
    });
    canvas.addEventListener('pointermove', event => {
        if (rubikPointerState.pointerId !== event.pointerId) return;
        const point = rubikCanvasPointFromEvent(canvas, event);
        if (rubikPointerState.mode === 'orbit' && rubik3DDrag) {
            rubikRotY += (point.x - rubik3DLast.x) * 0.008;
            rubikRotX += (point.y - rubik3DLast.y) * 0.008;
            rubikRotX = Math.max(-1.35, Math.min(1.35, rubikRotX));
            drawRubik3D();
        }
        rubik3DLast = {x: point.x, y: point.y};
        rubikPointerState.last = point;
        event.preventDefault();
    });
    const finishPointer = event => {
        if (rubikPointerState.pointerId !== event.pointerId) return;
        const endPoint = rubikCanvasPointFromEvent(canvas, event);
        if (rubikPointerState.mode === 'turn') {
            const dragVector = [endPoint.x - rubikPointerState.start.x, endPoint.y - rubikPointerState.start.y];
            if (Math.hypot(dragVector[0], dragVector[1]) > canvas.width * 0.04) {
                const move = rubikMoveFromDrag(canvas, rubikPointerState.sticker, dragVector);
                if (move) {
                    applyRubikMove(move);
                } else {
                    setRubikStatus('Drag an edge or corner sticker to turn an outer layer.', 'info');
                }
            }
        }
        rubik3DDrag = false;
        rubikPointerState = {mode: null, pointerId: null, start: {x: 0, y: 0}, last: {x: 0, y: 0}, sticker: null};
        canvas.style.cursor = 'grab';
        canvas.releasePointerCapture?.(event.pointerId);
    };
    canvas.addEventListener('pointerup', finishPointer);
    canvas.addEventListener('pointercancel', finishPointer);

    resizeRubikCanvas();
}

function updateRubikFullscreenButton() {
    const button = document.getElementById('rk-fullscreen-btn');
    const shell = document.getElementById('rk-shell');
    if (!button || !shell) return;
    button.textContent = document.fullscreenElement === shell ? '🡼 Exit Fullscreen' : '⛶ Fullscreen';
}

function renderRubikNet() {
    const container = document.getElementById('rk-net');
    if (!container || !rubikCube) return;
    const faces = rubikStateFaces();
    const descriptors = [
        {face: RK_U, label: 'U', cls: 'face-u'},
        {face: RK_L, label: 'L', cls: 'face-l'},
        {face: RK_F, label: 'F', cls: 'face-f'},
        {face: RK_R, label: 'R', cls: 'face-r'},
        {face: RK_B, label: 'B', cls: 'face-b'},
        {face: RK_D, label: 'D', cls: 'face-d'}
    ];
    container.innerHTML = descriptors.map(({face, label, cls}) => `
        <div class="rk-net-face ${cls}">
            <div class="rk-net-label">${label}</div>
            <div class="rk-net-grid">
                ${faces[face].flatMap(row => row).map(color => `<span class="rk-net-sticker" style="background:${RK_FACE_COLORS[color]}"></span>`).join('')}
            </div>
        </div>
    `).join('');
}

function updateRubikStats() {
    const moveEl = document.getElementById('rk-moves');
    const timerEl = document.getElementById('rk-timer');
    const tpsEl = document.getElementById('rk-tps');
    const lastEl = document.getElementById('rk-last-move');
    if (moveEl) moveEl.textContent = String(rubikMoveCount);
    if (timerEl) timerEl.textContent = rubikFormatTime(getRubikElapsed());
    if (tpsEl) tpsEl.textContent = rubikTPS();
    if (lastEl) lastEl.textContent = rubikLastMove;
}

function updateRubikStatus() {
    const badge = document.getElementById('rk-status-badge');
    const text = document.getElementById('rk-status-text');
    const solved = rubikCube && rubikCube.isSolved();
    if (solved) stopRubikTimer();
    if (badge) {
        const tone = solved ? 'success' : rubikStatusTone;
        badge.className = `rk-status-badge ${tone}`;
        badge.textContent = solved ? 'Solved' : ({
            ready: 'Ready',
            active: 'Active',
            info: 'Simulator',
            warning: 'Check',
            loading: 'Solver',
            success: 'Solved'
        }[tone] || 'Simulator');
    }
    if (text) {
        text.textContent = solved ? `Solved in ${rubikMoveCount} moves.` : rubikStatusMessage;
    }
    updateRubikStats();
}

function renderRubikBoard() {
    drawRubik3D();
    renderRubikNet();
    renderRubikSolutionOutput();
    updateRubikStats();
    updateRubikFullscreenButton();
}

function animateRubikMove(move, options = {}) {
    const info = rubikMoveAnimationInfo(move);
    if (!rubikCube || !info || rubikActiveAnimation) return false;
    rubikActiveAnimation = {
        ...info,
        cube: cloneRubikCube(),
        progress: 0,
        startedAt: performance.now(),
        options
    };
    const step = timestamp => {
        if (!rubikActiveAnimation) return;
        const elapsed = timestamp - rubikActiveAnimation.startedAt;
        rubikActiveAnimation.progress = Math.min(1, elapsed / rubikActiveAnimation.duration);
        drawRubik3D();
        if (rubikActiveAnimation.progress < 1) {
            rubikAnimationFrame = requestAnimationFrame(step);
            return;
        }
        rubikAnimationFrame = null;
        rubikCube.move(rubikActiveAnimation.move);
        if (options.countMoves) rubikMoveCount += 1;
        if (options.trackHistory) {
            rubikHistory.push(rubikActiveAnimation.move);
            rubikRedoStack = [];
        }
        rubikLastMove = rubikActiveAnimation.move;
        rubikActiveAnimation = null;
        renderRubikBoard();
        if (rubikCube.isSolved()) {
            setRubikStatus(options.solvedMessage || 'Great job — the cube is solved.', 'success');
        } else if (options.message) {
            setRubikStatus(options.message, options.tone || 'active');
        } else {
            updateRubikStatus();
        }
        options.onComplete?.();
    };
    rubikAnimationFrame = requestAnimationFrame(step);
    return true;
}

function runRubikMoveSequence(moves, options = {}) {
    const normalized = Array.isArray(moves) ? moves : rubikNormalizeAlgorithm(moves);
    if (!rubikCube || !normalized.length || rubikSequence || rubikActiveAnimation) return false;
    rubikSequence = {
        moves: normalized,
        index: 0,
        countMoves: !!options.countMoves,
        trackHistory: !!options.trackHistory,
        tone: options.tone || 'active',
        stepMessage: options.stepMessage,
        finalMessage: options.finalMessage,
        solvedMessage: options.solvedMessage,
        onComplete: options.onComplete
    };
    if (options.showSolutionSequence) setRubikSolutionSequence(normalized, 0);
    const advance = () => {
        if (!rubikSequence) return;
        if (rubikSequence.index >= rubikSequence.moves.length) {
            const finalMessage = rubikCube.isSolved()
                ? rubikSequence.solvedMessage || 'Great job — the cube is solved.'
                : rubikSequence.finalMessage;
            if (rubikSolutionMoves.length) {
                setRubikSolutionSequence(rubikSequence.moves, rubikSequence.moves.length);
            }
            rubikSequence.onComplete?.();
            rubikSequence = null;
            if (finalMessage) setRubikStatus(finalMessage, rubikCube.isSolved() ? 'success' : rubikStatusTone);
            else updateRubikStatus();
            return;
        }
        const move = rubikSequence.moves[rubikSequence.index];
        if (rubikSolutionMoves.length) setRubikSolutionSequence(rubikSequence.moves, rubikSequence.index);
        animateRubikMove(move, {
            countMoves: rubikSequence.countMoves,
            trackHistory: rubikSequence.trackHistory,
            tone: rubikSequence.tone,
            message: typeof rubikSequence.stepMessage === 'function'
                ? rubikSequence.stepMessage(move, rubikSequence.index, rubikSequence.moves.length)
                : rubikSequence.stepMessage,
            solvedMessage: rubikSequence.solvedMessage,
            onComplete: () => {
                rubikSequence.index += 1;
                setTimeout(advance, 50);
            }
        });
    };
    advance();
    return true;
}

function rubikApplyMoves(moves, options = {}) {
    const normalized = Array.isArray(moves) ? moves : rubikNormalizeAlgorithm(moves);
    if (!normalized.length || rubikActiveAnimation || rubikSequence) {
        if (normalized.length) setRubikStatus('Please wait for the current move to finish.', 'warning');
        return false;
    }
    if (normalized.length === 1) {
        return animateRubikMove(normalized[0], options);
    }
    return runRubikMoveSequence(normalized, options);
}

function applyRubikMove(move) {
    return rubikApplyMoves([move], {
        countMoves: true,
        trackHistory: true,
        message: `Applied ${move}`,
        tone: 'active'
    });
}

function renderRubikMoveButtons() {
    const container = document.getElementById('rk-mbtns');
    if (!container) return;
    container.innerHTML = '';
    RK_MOVE_BUTTONS.forEach(({mv, bg}) => {
        const button = document.createElement('button');
        button.className = 'rk-mb';
        button.style.background = bg;
        button.textContent = mv;
        button.title = `Apply ${mv}`;
        button.onclick = () => applyRubikMove(mv);
        container.appendChild(button);
    });
}

function resetRubik() {
    cancelRubikMotion();
    rubikCube = createRubikCube();
    rubikMoveCount = 0;
    rubikScramble = '';
    rubikLastMove = '—';
    rubikHistory = [];
    rubikRedoStack = [];
    resetRubikTimer();
    renderRubikBoard();
    setRubikStatus('Standard 3×3 cube ready. Generate a scramble or enter an algorithm.', 'ready');
    const scrambleEl = document.getElementById('rk-scramble');
    if (scrambleEl) scrambleEl.textContent = '—';
    setRubikSolutionText('No hint yet.');
}

function scrambleRubik() {
    cancelRubikMotion();
    rubikCube = createRubikCube();
    rubikMoveCount = 0;
    rubikHistory = [];
    rubikRedoStack = [];
    rubikLastMove = '—';
    rubikScramble = rubikGenerateScramble(25);
    rubikCube.move(rubikScramble);
    startRubikTimer();
    renderRubikBoard();
    const scrambleEl = document.getElementById('rk-scramble');
    if (scrambleEl) scrambleEl.textContent = rubikScramble;
    setRubikSolutionText('No hint yet.');
    setRubikStatus('Scramble loaded. Solve it or ask the simulator for a hint.', 'active');
}

function undoRubikMove() {
    if (rubikActiveAnimation || rubikSequence) {
        setRubikStatus('Wait for the current move to finish first.', 'warning');
        return;
    }
    if (!rubikHistory.length || !rubikCube) {
        setRubikStatus('Nothing to undo yet.', 'warning');
        return;
    }
    const move = rubikHistory.pop();
    rubikRedoStack.push(move);
    animateRubikMove(Cube.inverse(move), {
        message: `Undid ${move}.`,
        tone: 'info',
        onComplete: () => {
            rubikMoveCount = Math.max(0, rubikMoveCount - 1);
            rubikLastMove = `undo ${move}`;
            updateRubikStats();
        }
    });
}

function redoRubikMove() {
    if (rubikActiveAnimation || rubikSequence) {
        setRubikStatus('Wait for the current move to finish first.', 'warning');
        return;
    }
    if (!rubikRedoStack.length || !rubikCube) {
        setRubikStatus('Nothing to redo yet.', 'warning');
        return;
    }
    const move = rubikRedoStack.pop();
    animateRubikMove(move, {
        message: `Redid ${move}.`,
        tone: 'info',
        onComplete: () => {
            rubikHistory.push(move);
            rubikMoveCount++;
            rubikLastMove = `redo ${move}`;
            updateRubikStats();
        }
    });
}

async function ensureRubikSolver() {
    if (rubikSolverReady) return;
    if (!rubikSolverInitPromise) {
        setRubikStatus('Initializing solver tables…', 'loading');
        rubikSolverInitPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    Cube.initSolver();
                    rubikSolverReady = true;
                    resolve();
                } catch (error) {
                    reject(error);
                } finally {
                    rubikSolverInitPromise = null;
                }
            }, 30);
        });
    }
    return rubikSolverInitPromise;
}

async function showRubikHint() {
    if (!rubikCube) return;
    if (rubikActiveAnimation || rubikSequence) {
        setRubikStatus('Wait for the current move to finish first.', 'warning');
        return;
    }
    if (rubikCube.isSolved()) {
        setRubikStatus('The cube is already solved.', 'success');
        return;
    }
    try {
        await ensureRubikSolver();
        const solution = rubikCube.solve();
        const hint = rubikNormalizeAlgorithm(solution).slice(0, 4).join(' ');
        setRubikSolutionText(hint || 'Already solved.');
        setRubikStatus(hint ? `Hint: ${hint}` : 'Already solved.', 'info');
    } catch (error) {
        setRubikStatus('Solver could not initialize in this browser.', 'warning');
    }
}

async function solveRubik() {
    if (!rubikCube) return;
    if (rubikActiveAnimation || rubikSequence) {
        setRubikStatus('Auto-solve is already running.', 'warning');
        return;
    }
    if (rubikCube.isSolved()) {
        setRubikStatus('The cube is already solved.', 'success');
        return;
    }
    try {
        await ensureRubikSolver();
        setRubikStatus('Computing solution…', 'loading');
        setTimeout(() => {
            try {
                const solution = rubikNormalizeAlgorithm(rubikCube.solve());
                if (!solution.length) {
                    setRubikStatus('The cube is already solved.', 'success');
                    return;
                }
                setRubikSolutionSequence(solution, 0);
                runRubikMoveSequence(solution, {
                    countMoves: true,
                    trackHistory: false,
                    tone: 'active',
                    showSolutionSequence: true,
                    stepMessage: (move, index, total) => `Auto-solve ${index + 1}/${total}: ${move}`,
                    solvedMessage: `Auto-solved with ${solution.length} step-by-step moves.`,
                    finalMessage: `Auto-solve played ${solution.length} moves.`,
                    onComplete: () => renderRubikSolutionOutput()
                });
            } catch (error) {
                setRubikStatus('Failed to solve this state.', 'warning');
            }
        }, 30);
    } catch (error) {
        setRubikStatus('Solver could not initialize in this browser.', 'warning');
    }
}

function applyRubikAlgorithmInput() {
    const input = document.getElementById('rk-alg-input');
    if (!input) return;
    if (rubikActiveAnimation || rubikSequence) {
        setRubikStatus('Wait for the current move to finish first.', 'warning');
        return;
    }
    const moves = rubikNormalizeAlgorithm(input.value);
    if (!moves.length) {
        setRubikStatus('Enter a valid algorithm like R U R\' U\'.', 'warning');
        return;
    }
    applyRubikMoveSequence(moves);
    input.value = '';
}

function applyRubikMoveSequence(moves) {
    setRubikSolutionText(moves.join(' '));
    rubikApplyMoves(moves, {
        countMoves: true,
        trackHistory: true,
        message: `Applied algorithm: ${moves.join(' ')}`,
        tone: 'active'
    });
}

function toggleRubikFullscreen() {
    const shell = document.getElementById('rk-shell');
    if (!shell) return;
    if (document.fullscreenElement === shell) {
        document.exitFullscreen?.();
    } else {
        shell.requestFullscreen?.();
    }
}

function bindRubikGlobalEvents() {
    if (!rubikResizeHandler) {
        rubikResizeHandler = () => resizeRubikCanvas();
        window.addEventListener('resize', rubikResizeHandler);
    }
    if (!rubikFullscreenHandler) {
        rubikFullscreenHandler = () => {
            updateRubikFullscreenButton();
            resizeRubikCanvas();
        };
        document.addEventListener('fullscreenchange', rubikFullscreenHandler);
    }
    if (!rubikKeyHandler) {
        rubikKeyHandler = event => {
            const modal = document.getElementById('modal-rubik');
            if (!modal || !modal.classList.contains('active')) return;
            const target = event.target;
            if (target && /INPUT|TEXTAREA/.test(target.tagName)) {
                if (event.key === 'Enter' && target.id === 'rk-alg-input') {
                    applyRubikAlgorithmInput();
                    event.preventDefault();
                }
                return;
            }
            const key = event.key.toLowerCase();
            if ('urdlfb'.includes(key)) {
                applyRubikMove(event.shiftKey ? `${key.toUpperCase()}'` : key.toUpperCase());
                event.preventDefault();
                return;
            }
            if (key === 'z') {
                undoRubikMove();
                event.preventDefault();
                return;
            }
            if (key === 'y') {
                redoRubikMove();
                event.preventDefault();
                return;
            }
            if (key === ' ') {
                scrambleRubik();
                event.preventDefault();
                return;
            }
            if (key === 'h') {
                showRubikHint();
                event.preventDefault();
                return;
            }
            if (key === 's') {
                solveRubik();
                event.preventDefault();
            }
        };
        document.addEventListener('keydown', rubikKeyHandler);
    }
}

function initRubik() {
    const container = document.getElementById('game-rubik');
    if (!container) return;
    if (typeof Cube !== 'function') {
        container.innerHTML = '<p style="text-align:center;color:#ef4444;font-weight:700;">Rubik simulator library failed to load.</p>';
        return;
    }
    rubikCube = createRubikCube();
    rubikMoveCount = 0;
    rubikRotX = 0.5;
    rubikRotY = -0.7;
    rubik3DDrag = false;
    rubik3DLast = {x: 0, y: 0};
    rubikScramble = '';
    rubikLastMove = '—';
    rubikHistory = [];
    rubikRedoStack = [];
    rubikSolutionText = 'No hint yet.';
    rubikSolutionMoves = [];
    rubikSolutionActiveIndex = -1;
    cancelRubikMotion();
    resetRubikTimer();
    renderRubikGame();
    bindRubikGlobalEvents();
}

function renderRubikGame() {
    const container = document.getElementById('game-rubik');
    if (!container) return;
    container.innerHTML = `
        <style>
            .rk-shell { background:linear-gradient(180deg,#f8fbff 0%,#eef2ff 100%); border:1px solid rgba(99,102,241,.12); border-radius:28px; padding:20px; box-shadow:0 30px 80px rgba(15,23,42,.14); }
            .rk-toolbar { display:flex; flex-wrap:wrap; gap:10px; justify-content:space-between; align-items:center; margin-bottom:16px; }
            .rk-toolbar-actions, .rk-toolbar-meta { display:flex; flex-wrap:wrap; gap:10px; align-items:center; }
            .rk-btn { border:none; border-radius:14px; padding:11px 16px; font-weight:800; cursor:pointer; color:#fff; box-shadow:0 10px 20px rgba(15,23,42,.16); transition:transform .18s ease, opacity .18s ease; }
            .rk-btn:hover { transform:translateY(-1px); opacity:.92; }
            .rk-btn.primary { background:linear-gradient(135deg,#6366f1,#4f46e5); }
            .rk-btn.warning { background:linear-gradient(135deg,#f59e0b,#d97706); }
            .rk-btn.success { background:linear-gradient(135deg,#10b981,#059669); }
            .rk-btn.dark { background:linear-gradient(135deg,#334155,#0f172a); }
            .rk-layout { display:grid; grid-template-columns:minmax(0,1.5fr) minmax(310px,.9fr); gap:18px; }
            .rk-stage-card, .rk-side-card { background:rgba(255,255,255,.86); border:1px solid rgba(148,163,184,.24); border-radius:22px; padding:16px; box-shadow:0 18px 50px rgba(148,163,184,.16); }
            .rk-stage { position:relative; border-radius:22px; overflow:hidden; background:radial-gradient(circle at top, rgba(99,102,241,.18), rgba(15,23,42,.95)); min-height:380px; display:flex; align-items:center; justify-content:center; }
            #rk-canvas { display:block; border-radius:18px; max-width:100%; touch-action:none; }
            .rk-stage-chip { position:absolute; left:16px; bottom:16px; padding:8px 12px; border-radius:999px; background:rgba(15,23,42,.7); color:#e2e8f0; font-size:.82em; font-weight:700; backdrop-filter:blur(12px); }
            .rk-stats { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:10px; }
            .rk-stat { background:rgba(255,255,255,.9); border:1px solid rgba(148,163,184,.26); border-radius:18px; padding:12px 14px; }
            .rk-stat-label { display:block; color:#64748b; font-size:.75em; font-weight:700; text-transform:uppercase; letter-spacing:.08em; }
            .rk-stat-value { display:block; margin-top:6px; color:#0f172a; font-size:1.25em; font-weight:900; }
            .rk-status { display:flex; gap:10px; align-items:center; flex-wrap:wrap; margin:14px 0 18px; }
            .rk-status-badge { display:inline-flex; align-items:center; justify-content:center; min-width:90px; padding:8px 12px; border-radius:999px; font-size:.82em; font-weight:800; color:#fff; }
            .rk-status-badge.ready { background:linear-gradient(135deg,#64748b,#475569); }
            .rk-status-badge.active, .rk-status-badge.info { background:linear-gradient(135deg,#6366f1,#4f46e5); }
            .rk-status-badge.warning { background:linear-gradient(135deg,#f59e0b,#d97706); }
            .rk-status-badge.loading { background:linear-gradient(135deg,#0ea5e9,#2563eb); }
            .rk-status-badge.success { background:linear-gradient(135deg,#10b981,#059669); }
            #rk-status-text { color:#334155; font-weight:700; }
            .rk-field-label { display:block; font-size:.78em; font-weight:800; text-transform:uppercase; letter-spacing:.08em; color:#64748b; margin-bottom:8px; }
            .rk-seq, .rk-solution-box { min-height:52px; padding:12px 14px; border-radius:16px; background:#f8fafc; border:1px solid rgba(148,163,184,.24); color:#0f172a; font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace; font-size:.9em; line-height:1.5; word-break:break-word; }
            .rk-solution-box { display:flex; flex-wrap:wrap; gap:8px; align-items:center; }
            .rk-solution-move { display:inline-flex; align-items:center; justify-content:center; min-width:34px; padding:4px 8px; border-radius:999px; background:#e2e8f0; color:#334155; font-weight:800; transition:transform .18s ease, background .18s ease, color .18s ease; }
            .rk-solution-move.done { background:#c7d2fe; color:#3730a3; }
            .rk-solution-move.active { background:#4f46e5; color:#fff; transform:translateY(-1px) scale(1.04); box-shadow:0 10px 18px rgba(79,70,229,.25); }
            .rk-alg-row { display:flex; gap:10px; }
            .rk-alg-row input { flex:1; border:1px solid rgba(148,163,184,.35); border-radius:14px; padding:12px 14px; font-size:.95em; font-weight:600; color:#0f172a; background:#fff; }
            .rk-mbtn-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:8px; }
            .rk-mb { border:none; border-radius:14px; padding:12px 10px; color:#fff; font-size:.95em; font-weight:800; cursor:pointer; box-shadow:0 8px 18px rgba(15,23,42,.14); transition:transform .16s ease, opacity .16s ease; }
            .rk-mb:hover { transform:translateY(-1px); opacity:.92; }
            .rk-net { display:grid; grid-template-columns:repeat(4,minmax(64px,1fr)); grid-template-areas:". u . ." "l f r b" ". d . ."; gap:10px; }
            .rk-net-face { background:#fff; border:1px solid rgba(148,163,184,.22); border-radius:14px; padding:8px; box-shadow:0 8px 18px rgba(148,163,184,.08); }
            .rk-net-face.face-u { grid-area:u; } .rk-net-face.face-l { grid-area:l; } .rk-net-face.face-f { grid-area:f; } .rk-net-face.face-r { grid-area:r; } .rk-net-face.face-b { grid-area:b; } .rk-net-face.face-d { grid-area:d; }
            .rk-net-label { font-size:.72em; font-weight:900; color:#64748b; margin-bottom:6px; text-align:center; }
            .rk-net-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:3px; }
            .rk-net-sticker { aspect-ratio:1; border-radius:6px; border:1px solid rgba(15,23,42,.08); display:block; }
            .rk-help { margin-top:14px; text-align:center; color:#64748b; font-size:.83em; font-weight:600; }
            #rk-shell:fullscreen { padding:28px; overflow:auto; }
            #rk-shell:fullscreen .rk-layout { min-height:calc(100vh - 130px); }
            @media (max-width: 980px) { .rk-layout { grid-template-columns:1fr; } .rk-stats { grid-template-columns:repeat(2,minmax(0,1fr)); } }
            @media (max-width: 620px) { .rk-shell { padding:14px; border-radius:22px; } .rk-toolbar { gap:12px; } .rk-toolbar-actions, .rk-toolbar-meta { width:100%; } .rk-toolbar-actions .rk-btn, .rk-toolbar-meta .rk-btn { flex:1; justify-content:center; } .rk-stage { min-height:300px; } .rk-stats { grid-template-columns:1fr 1fr; } .rk-net { grid-template-columns:repeat(4,minmax(54px,1fr)); gap:8px; } .rk-alg-row { flex-direction:column; } }
        </style>
        <div class="rk-shell" id="rk-shell">
            <div class="rk-toolbar">
                <div class="rk-toolbar-actions">
                    <button class="rk-btn warning" onclick="scrambleRubik()">🔀 Scramble</button>
                    <button class="rk-btn success" onclick="resetRubik()">↺ Reset</button>
                    <button class="rk-btn dark" onclick="undoRubikMove()">↶ Undo</button>
                    <button class="rk-btn dark" onclick="redoRubikMove()">↷ Redo</button>
                </div>
                <div class="rk-toolbar-meta">
                    <button class="rk-btn primary" onclick="showRubikHint()">💡 Hint</button>
                    <button class="rk-btn primary" onclick="solveRubik()">🧠 Auto Solve</button>
                    <button class="rk-btn dark" id="rk-fullscreen-btn" onclick="toggleRubikFullscreen()">⛶ Fullscreen</button>
                </div>
            </div>
            <div class="rk-stats">
                <div class="rk-stat"><span class="rk-stat-label">Moves</span><span class="rk-stat-value" id="rk-moves">0</span></div>
                <div class="rk-stat"><span class="rk-stat-label">Timer</span><span class="rk-stat-value" id="rk-timer">00:00.0</span></div>
                <div class="rk-stat"><span class="rk-stat-label">TPS</span><span class="rk-stat-value" id="rk-tps">0.00</span></div>
                <div class="rk-stat"><span class="rk-stat-label">Last move</span><span class="rk-stat-value" id="rk-last-move">—</span></div>
            </div>
            <div class="rk-status">
                <span class="rk-status-badge ready" id="rk-status-badge">Ready</span>
                <span id="rk-status-text">Generate a scramble to begin.</span>
            </div>
            <div class="rk-layout">
                <div class="rk-stage-card">
                    <div class="rk-stage" id="rk-stage">
                        <canvas id="rk-canvas"></canvas>
                        <div class="rk-stage-chip">Drag stickers to turn, or drag empty space to orbit</div>
                    </div>
                    <div style="margin-top:14px;">
                        <span class="rk-field-label">Current scramble</span>
                        <div class="rk-seq" id="rk-scramble">—</div>
                    </div>
                </div>
                <div style="display:grid; gap:16px;">
                    <div class="rk-side-card">
                        <span class="rk-field-label">Algorithm input</span>
                        <div class="rk-alg-row">
                            <input id="rk-alg-input" type="text" placeholder="Example: R U R' U'">
                            <button class="rk-btn primary" onclick="applyRubikAlgorithmInput()">Apply</button>
                        </div>
                    </div>
                    <div class="rk-side-card">
                        <span class="rk-field-label">Solver output</span>
                        <div class="rk-solution-box" id="rk-solution">No hint yet.</div>
                    </div>
                    <div class="rk-side-card">
                        <span class="rk-field-label">Cube net</span>
                        <div class="rk-net" id="rk-net"></div>
                    </div>
                    <div class="rk-side-card">
                        <span class="rk-field-label">Move palette</span>
                        <div class="rk-mbtn-grid" id="rk-mbtns"></div>
                    </div>
                </div>
            </div>
            <p class="rk-help">Keyboard: U R F D L B turns, Shift for inverse, Space to scramble, Z undo, Y redo, H hint, S solve. Auto-solve animates each move so you can follow along on a physical cube.</p>
        </div>
    `;
    renderRubikMoveButtons();
    setupRubik3DCanvas();
    renderRubikBoard();
    setRubikStatus('Standard 3×3 cube ready. Generate a scramble or enter an algorithm.', 'ready');
}
