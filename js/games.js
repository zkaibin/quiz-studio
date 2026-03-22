// Game Modal Management
const gameModals = {
    tictactoe: { title: '❌⭕ Tic-Tac-Toe', subtitle: 'Get three in a row!' },
    rps: { title: '✊✋✌️ Rock Paper Scissors', subtitle: 'Beat the computer!' },
    memory: { title: '🧠 Memory Match', subtitle: 'Find all pairs!' },
    guess: { title: '🎯 Guess the Number', subtitle: 'Guess between 1-100' },
    snake: { title: '🐍 Snake Game', subtitle: 'Eat and grow!' },
    simon: { title: '🎵 Simon Says', subtitle: 'Remember the sequence!' },
    whack: { title: '🔨 Whack-a-Mole', subtitle: 'Click the moles!' },
    '2048': { title: '🔢 2048', subtitle: 'Reach 2048!' }
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
