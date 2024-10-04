document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const resultElement = document.getElementById('result');
    const currentPlayerDisplay = document.getElementById('currentPlayer');
    const modeSelection = document.getElementById('mode-selection');
    const playHumanButton = document.getElementById('playHuman');
    const playAIButton = document.getElementById('playAI');
    const resetButton = document.getElementById('resetButton');

    let currentPlayer = 'X';
    let gameIsOver = false;
    let aiOpponent = false;

    function startGame(withAI) {
        aiOpponent = withAI;
        modeSelection.classList.add('hidden');
        gameBoard.classList.remove('hidden');
        currentPlayerDisplay.classList.remove('hidden');
        resetButton.classList.remove('hidden');
        createBoard();
        resetGame();
    }

    function createBoard() {
        gameBoard.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }
    }

    function handleCellClick(event) {
        const cell = event.target;
        if (!cell.textContent && !gameIsOver) {
            makeMove(cell);
            if (aiOpponent && !gameIsOver) {
                setTimeout(makeAIMove, 500);
            }
        }
    }

    function makeMove(cell) {
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase()); // Add class 'x' or 'o'
        if (checkWinner(currentPlayer)) {
            resultElement.textContent = `${currentPlayer} wins!`;
            gameIsOver = true;
        } else if (isBoardFull()) {
            resultElement.textContent = "It's a draw!";
            gameIsOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateCurrentPlayerDisplay();
        }
    }

    function makeAIMove() {
        const bestMove = findBestMove();
        if (bestMove !== -1) {
            makeMove(gameBoard.children[bestMove]);
        }
    }

    function findBestMove() {
        let bestScore = -Infinity;
        let bestMove = -1;
        const board = Array.from(gameBoard.children).map(cell => cell.textContent);

        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, 0, false);
                board[i] = '';
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        return bestMove;
    }

    function minimax(board, depth, isMaximizing) {
        const scores = {
            X: -10,
            O: 10,
            tie: 0
        };

        let result = checkWinnerBoard(board);
        if (result !== null) {
            return scores[result];
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = 'O';
                    let score = minimax(board, depth + 1, false);
                    board[i] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = 'X';
                    let score = minimax(board, depth + 1, true);
                    board[i] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    function checkWinner(player) {
        const cells = gameBoard.children;
        const winCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        return winCombos.some(combo => 
            combo.every(index => cells[index].textContent === player)
        );
    }

    function checkWinnerBoard(board) {
        const winCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (let combo of winCombos) {
            if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
                return board[combo[0]];
            }
        }

        if (board.every(cell => cell !== '')) {
            return 'tie';
        }

        return null;
    }

    function isBoardFull() {
        return Array.from(gameBoard.children).every(cell => cell.textContent !== '');
    }

    function resetGame() {
        currentPlayer = 'X';
        gameIsOver = false;
        resultElement.textContent = '';
        updateCurrentPlayerDisplay();

        for (let cell of gameBoard.children) {
            cell.textContent = '';
            cell.classList.remove('x', 'o'); // Remove both classes
        }

        if (aiOpponent && currentPlayer === 'O') {
            setTimeout(makeAIMove, 500);
        }
    }

    function updateCurrentPlayerDisplay() {
        currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
    }

    playHumanButton.addEventListener('click', () => startGame(false));
    playAIButton.addEventListener('click', () => startGame(true));
    resetButton.addEventListener('click', resetGame);

    // Initialize the game
    modeSelection.classList.remove('hidden');
    gameBoard.classList.add('hidden');
    currentPlayerDisplay.classList.add('hidden');
    resetButton.classList.add('hidden');
});