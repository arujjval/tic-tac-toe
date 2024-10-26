// DOM Elements
const gameBoard = document.getElementById("gameBoard");
const resultElement = document.getElementById("result");
const currentPlayerDisplay = document.getElementById("currentPlayer");
const soundButton = document.getElementById("soundButton");
const resetButton = document.getElementById("resetButton");

// Game state
let currentPlayer = "X";
let gameIsOver = false;
let isAIMode = false;

// Sound effects
const backgroundSound = new Audio("sounds/background.wav");
const clickSound = new Audio("sounds/click.wav");
const winSound = new Audio("sounds/win.wav");

backgroundSound.loop = true;
backgroundSound.volume = 0.1;
backgroundSound.play();

// Event Listeners
soundButton.addEventListener("click", toggleSound);
resetButton.addEventListener("click", resetGame);

// Add mode selection
const modeSelect = document.createElement("select");
modeSelect.id = "modeSelect";
const multiplayerOption = document.createElement("option");
multiplayerOption.value = "multiplayer";
multiplayerOption.textContent = "Multiplayer";
const aiOption = document.createElement("option");
aiOption.value = "ai";
aiOption.textContent = "Play against AI";
modeSelect.appendChild(multiplayerOption);
modeSelect.appendChild(aiOption);
document.body.insertBefore(modeSelect, gameBoard);

modeSelect.addEventListener("change", changeGameMode);

function toggleSound() {
  if (backgroundSound.paused) {
    backgroundSound.play();
    soundButton.textContent = "Sound: On";
  } else {
    backgroundSound.pause();
    soundButton.textContent = "Sound: Off";
  }
}

function changeGameMode() {
  isAIMode = modeSelect.value === "ai";
  resetGame();
}

function createBoard() {
  gameBoard.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", handleCellClick);
    gameBoard.appendChild(cell);
  }
  updateCurrentPlayerDisplay();
}

function handleCellClick(event) {
  if (gameIsOver || (isAIMode && currentPlayer === "O")) return;
  
  const cell = event.target;
  if (cell.textContent) return;

  clickSound.play();
  makeMove(cell, currentPlayer);

  if (checkWinner()) {
    endGame(`${currentPlayer} wins!`);
  } else if (isBoardFull()) {
    endGame("It's a draw!");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateCurrentPlayerDisplay();
    
    if (isAIMode && currentPlayer === "O") {
      setTimeout(makeAIMove, 500);
    }
  }
}

function makeMove(cell, player) {
  cell.textContent = player;
  cell.classList.add(player.toLowerCase());
}

function makeAIMove() {
  const bestMove = findBestMove();
  const cell = gameBoard.children[bestMove];
  makeMove(cell, currentPlayer);
  
  if (checkWinner()) {
    endGame(`${currentPlayer} wins!`);
  } else if (isBoardFull()) {
    endGame("It's a draw!");
  } else {
    currentPlayer = "X";
    updateCurrentPlayerDisplay();
  }
}

function findBestMove() {
  let bestScore = -Infinity;
  let bestMove;
  for (let i = 0; i < 9; i++) {
    if (gameBoard.children[i].textContent === "") {
      gameBoard.children[i].textContent = "O";
      let score = minimax(gameBoard, 0, false);
      gameBoard.children[i].textContent = "";
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
}

function minimax(board, depth, isMaximizing) {
  if (checkWinner()) {
    return isMaximizing ? -1 : 1;
  } else if (isBoardFull()) {
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board.children[i].textContent === "") {
        board.children[i].textContent = "O";
        let score = minimax(board, depth + 1, false);
        board.children[i].textContent = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board.children[i].textContent === "") {
        board.children[i].textContent = "X";
        let score = minimax(board, depth + 1, true);
        board.children[i].textContent = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function updateCurrentPlayerDisplay() {
  currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      gameBoard.children[a].textContent &&
      gameBoard.children[a].textContent === gameBoard.children[b].textContent &&
      gameBoard.children[a].textContent === gameBoard.children[c].textContent
    ) {
      return true;
    }
  }
  return false;
}

function isBoardFull() {
  return [...gameBoard.children].every(cell => cell.textContent !== "");
}

function endGame(message) {
  resultElement.textContent = message;
  gameIsOver = true;
  winSound.play();
}

function resetGame() {
  currentPlayer = "X";
  gameIsOver = false;
  resultElement.textContent = "";
  updateCurrentPlayerDisplay();
  createBoard();
}

createBoard();