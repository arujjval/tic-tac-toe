const gameBoard = document.getElementById('gameBoard');
const resultElement = document.getElementById('result');
const currentPlayerDisplay = document.getElementById('currentPlayer');

let currentPlayer = 'X';
let gameIsOver = false;

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
    }
    updateCurrentPlayerDisplay(); // Show the initial player
}

function handleCellClick(event) {
    const cell = event.target;
    if (!cell.textContent && !gameIsOver) {
        cell.textContent = currentPlayer;

        // Add class for styling based on current player
        cell.classList.add(currentPlayer.toLowerCase());

        if (checkWinner()) {
            resultElement.textContent = `${currentPlayer} wins!`;
            gameIsOver = true;
        } else if (isBoardFull()) {
            resultElement.textContent = "It's a draw!";
            gameIsOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateCurrentPlayerDisplay(); // Update display after each turn
        }
    }
}

function updateCurrentPlayerDisplay() {
    currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
    console.log('Current player:', currentPlayer);
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;

        if (gameBoard.children[a].textContent ===
            gameBoard.children[b].textContent &&
            gameBoard.children[b].textContent ===
            gameBoard.children[c].textContent &&
            gameBoard.children[a].textContent !== '') {

            // Apply the highlight class based on the current player (X or O)
            const winnerClass = currentPlayer === 'X' ? 'highlight-x' : 'highlight-o';
            gameBoard.children[a].classList.add(winnerClass);
            gameBoard.children[b].classList.add(winnerClass);
            gameBoard.children[c].classList.add(winnerClass);

            return true; // There is a winner
        }
    }

    return false; // No winner
}


function isBoardFull() {
    for (let i = 0; i < gameBoard.children.length; i++) {
        if (gameBoard.children[i].textContent === '') {
            return false;
        }
    }
    return true;
}

function resetGame() {
    currentPlayer = 'X';
    gameIsOver = false;
    resultElement.textContent = '';
    updateCurrentPlayerDisplay(); // Reset display on game reset

    for (let i = 0; i < gameBoard.children.length; i++) {
        gameBoard.children[i].textContent = ''; // Clear X or O
        gameBoard.children[i].classList.remove('x', 'o', 'highlight-x', 'highlight-o'); // Remove all classes
    }
}


// Set up the reset button
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame);

createBoard();
