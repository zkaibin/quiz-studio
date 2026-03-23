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
    chengyu: { title: '🀄 成语游戏', subtitle: '猜猜成语的意思！' }
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

let scrambleCurrentWord, scrambleScore, scrambleTotal;

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

function initScramble() {
    scrambleScore = 0;
    scrambleTotal = 0;
    const container = document.getElementById('game-scramble');
    container.innerHTML = `
        <div class="score-display" id="scramble-score">Score: 0</div>
        <div class="scramble-word" id="scramble-display"></div>
        <p class="scramble-hint" id="scramble-hint"></p>
        <input class="scramble-input" id="scramble-input" type="text" maxlength="20" placeholder="Type your answer…" autocomplete="off">
        <div style="text-align:center; margin-top: 12px; display: flex; gap: 10px; justify-content: center;">
            <button class="btn" onclick="checkScramble()">Submit</button>
            <button class="btn" style="background: linear-gradient(135deg,#f59e0b,#d97706);" onclick="skipScramble()">Skip</button>
        </div>
        <div class="status-text" id="scramble-status" style="margin-top:15px;"></div>
    `;
    document.getElementById('scramble-input').addEventListener('keydown', e => {
        if (e.key === 'Enter') checkScramble();
    });
    nextScramble();
}

function nextScramble() {
    const entry = scrambleWords[Math.floor(Math.random() * scrambleWords.length)];
    scrambleCurrentWord = entry.word;
    document.getElementById('scramble-display').textContent = scrambleWord(entry.word).toUpperCase();
    document.getElementById('scramble-hint').textContent = '💡 Hint: ' + entry.hint;
    const input = document.getElementById('scramble-input');
    if (input) { input.value = ''; input.focus(); }
    document.getElementById('scramble-status').textContent = '';
}

function checkScramble() {
    const input = document.getElementById('scramble-input');
    if (!input) return;
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
    setTimeout(nextScramble, 1500);
}

function skipScramble() {
    scrambleTotal++;
    const statusEl = document.getElementById('scramble-status');
    statusEl.textContent = `⏭️ Skipped! The word was: ${scrambleCurrentWord.toUpperCase()}`;
    statusEl.style.color = '#f59e0b';
    document.getElementById('scramble-score').textContent = `Score: ${scrambleScore} / ${scrambleTotal}`;
    setTimeout(nextScramble, 1500);
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
    { word: 'compass', hint: 'Shows you which way is north' },
    { word: 'library', hint: 'A place full of books' },
    { word: 'magnet', hint: 'Attracts iron objects' },
    { word: 'pirate', hint: 'Sails the sea looking for treasure' }
];

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

let hangmanWord, hangmanGuessed, hangmanWrong;

function initHangman() {
    const entry = hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
    hangmanWord = entry.word;
    hangmanGuessed = new Set();
    hangmanWrong = 0;

    const container = document.getElementById('game-hangman');
    container.innerHTML = `
        <div style="display:flex; gap:20px; align-items:flex-start; flex-wrap:wrap; justify-content:center;">
            <pre class="hangman-drawing" id="hangman-drawing"></pre>
            <div style="flex:1; min-width:200px;">
                <p class="scramble-hint" id="hangman-hint">💡 ${entry.hint}</p>
                <div class="hangman-word" id="hangman-word"></div>
                <div class="status-text" id="hangman-status" style="min-height:28px;"></div>
                <div class="hangman-keyboard" id="hangman-keyboard"></div>
            </div>
        </div>
        <div style="text-align:center; margin-top:15px;">
            <button class="btn" onclick="initHangman()">New Word</button>
        </div>
    `;

    renderHangman();
    buildHangmanKeyboard();
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
            disableHangmanKeyboard();
            if (statusEl) { statusEl.textContent = '🎉 You won!'; statusEl.style.color = '#10b981'; }
            return;
        }
    } else {
        hangmanWrong++;
        if (btn) btn.classList.add('wrong-key');
        if (hangmanWrong >= hangmanStages.length - 1) {
            renderHangman();
            if (btn) btn.disabled = true;
            disableHangmanKeyboard();
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

let kpopScore, kpopTotal, kpopCurrentIndex, kpopAnswered;

function initKpopEmoji() {
    kpopScore = 0;
    kpopTotal = 0;
    kpopAnswered = false;
    const shuffled = [...kpopEmojiGroups].sort(() => Math.random() - 0.5);
    kpopCurrentIndex = 0;
    window._kpopQueue = shuffled;

    const container = document.getElementById('game-kpopemoji');
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
            .kpop-next-btn { display:block; margin:0 auto; }
            .kpop-result { text-align:center; padding:20px; }
            .kpop-result .big-emoji { font-size:4em; margin-bottom:12px; }
        </style>
        <div class="kpop-score" id="kpop-score">Score: 0</div>
        <div class="kpop-progress" id="kpop-progress">Question 1 of ${window._kpopQueue.length}</div>
        <div class="kpop-emojis" id="kpop-emojis"></div>
        <div class="kpop-hint" id="kpop-hint"></div>
        <div class="kpop-options" id="kpop-options"></div>
        <div class="kpop-status" id="kpop-status"></div>
        <button class="btn kpop-next-btn" id="kpop-next-btn" style="display:none;" onclick="nextKpopQuestion()">Next ➡️</button>
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
    let medal = pct === 100 ? '🥇' : pct >= 80 ? '🥈' : pct >= 60 ? '��' : '🎤';
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
    { idol: 'Chungha', emojis: '💃🌺🔥🏆', hint: "Former I.O.I member, powerful solo dancer known for 'Gotta Go'" }
];

let kpopIdolScore, kpopIdolTotal, kpopIdolCurrentIndex, kpopIdolAnswered;

function initKpopIdol() {
    kpopIdolScore = 0;
    kpopIdolTotal = 0;
    kpopIdolAnswered = false;
    const shuffled = [...kpopIdols].sort(() => Math.random() - 0.5);
    kpopIdolCurrentIndex = 0;
    window._kpopIdolQueue = shuffled;

    const container = document.getElementById('game-kpopidol');
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
            .idol-next-btn { display:block; margin:0 auto; }
            .idol-result { text-align:center; padding:20px; }
            .idol-result .big-emoji { font-size:4em; margin-bottom:12px; }
        </style>
        <div class="idol-score" id="idol-score">Score: 0</div>
        <div class="idol-progress" id="idol-progress">Question 1 of ${window._kpopIdolQueue.length}</div>
        <div class="idol-emojis" id="idol-emojis"></div>
        <div class="idol-hint" id="idol-hint"></div>
        <div class="idol-options" id="idol-options"></div>
        <div class="idol-status" id="idol-status"></div>
        <button class="btn idol-next-btn" id="idol-next-btn" style="display:none;" onclick="nextKpopIdolQuestion()">Next ➡️</button>
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

function initChengyu() {
    const shuffled = [...chengyuList].sort(() => Math.random() - 0.5);
    chengyuScore = 0;
    chengyuTotal = 0;
    chengyuCurrentIndex = 0;
    chengyuAnswered = false;
    window._chengyuQueue = shuffled;

    const container = document.getElementById('game-chengyu');
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
            .cy-result { text-align:center; padding:20px; }
            .cy-result .big-emoji { font-size:4em; margin-bottom:12px; }
        </style>
        <div class="cy-score" id="cy-score">得分 Score: 0</div>
        <div class="cy-progress" id="cy-progress">第 1 题，共 ${window._chengyuQueue.length} 题</div>
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
    `;

    renderChengyuQuestion();
}

function renderChengyuQuestion() {
    const queue = window._chengyuQueue;
    const item = queue[chengyuCurrentIndex];
    chengyuAnswered = false;

    document.getElementById('cy-score').textContent = `得分 Score: ${chengyuScore}`;
    document.getElementById('cy-progress').textContent = `第 ${chengyuCurrentIndex + 1} 题，共 ${queue.length} 题`;
    document.getElementById('cy-emoji').textContent = item.emoji;
    document.getElementById('cy-characters').textContent = item.chengyu;
    document.getElementById('cy-pinyin').textContent = item.pinyin;
    document.getElementById('cy-status').textContent = '';
    document.getElementById('cy-story').textContent = '';
    const nextBtn = document.getElementById('cy-next-btn');
    if (nextBtn) nextBtn.style.display = 'none';

    // Build 4 options: the correct answer + 3 random wrong answers
    const wrongPool = queue.filter((_, i) => i !== chengyuCurrentIndex);
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
