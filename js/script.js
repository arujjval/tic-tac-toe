const gameBoard = document.getElementById("gameBoard");
const resultElement = document.getElementById("result");
const currentPlayerDisplay = document.getElementById("currentPlayer");
const soundButton = document.getElementById("soundButton");
const modeToggleButton = document.getElementById("modeToggleButton");

let currentPlayer = "X";
let gameIsOver = false;
let isSinglePlayerMode = false; // New variable to toggle between single and two-player mode

// Sound effects
const backgroundSound = new Audio("sounds/background.wav");
const clickSound = new Audio("sounds/click.wav");
const winSound = new Audio("sounds/win.wav");

backgroundSound.loop = true;
backgroundSound.volume = 0.1;
backgroundSound.play();

soundButton.addEventListener("click", () => {
  if (backgroundSound.paused) {
    backgroundSound.play();
    soundButton.textContent = "Sound: ON";
  } else {
    backgroundSound.pause();
    soundButton.textContent = "Sound: OFF";
  }
});

modeToggleButton.addEventListener("click", () => {
  isSinglePlayerMode = !isSinglePlayerMode;
  modeToggleButton.textContent = isSinglePlayerMode ? "Mode: Single Player" : "Mode: Two Player";
  resetGame(); 
});

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", handleCellClick);
    gameBoard.appendChild(cell);
  }
  updateCurrentPlayerDisplay(); 
}

function handleCellClick(event) {
  if (gameIsOver) return;

  const cell = event.target;
  if (!cell.textContent) {
    clickSound.play();
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWinner()) {
      resultElement.textContent = `${currentPlayer} wins!`;
      gameIsOver = true;
    } else if (isBoardFull()) {
      resultElement.textContent = "It's a draw!";
      gameIsOver = true;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      updateCurrentPlayerDisplay();

      if (isSinglePlayerMode && currentPlayer === "O") {
        setTimeout(aiMove, 500); 
      }
    }
  }
}

function aiMove() {
  const availableCells = Array.from(gameBoard.children).filter(cell => !cell.textContent);
  if (availableCells.length > 0) {
    const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    randomCell.textContent = currentPlayer;
    randomCell.classList.add(currentPlayer.toLowerCase());

    if (checkWinner()) {
      resultElement.textContent = `${currentPlayer} wins!`;
      gameIsOver = true;
    } else if (isBoardFull()) {
      resultElement.textContent = "It's a draw!";
      gameIsOver = true;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      updateCurrentPlayerDisplay();
    }
  }
}

function updateCurrentPlayerDisplay() {
  currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
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
    [2, 4, 6],
  ];

  for (let combination of winningCombinations) {
    if (
      gameBoard.children[combination[0]].textContent ===
        gameBoard.children[combination[1]].textContent &&
      gameBoard.children[combination[1]].textContent ===
        gameBoard.children[combination[2]].textContent &&
      gameBoard.children[combination[0]].textContent !== ""
    ) {
      winSound.play();
      return true;
    }
  }

  return false;
}

function isBoardFull() {
  return Array.from(gameBoard.children).every(cell => cell.textContent !== "");
}

function resetGame() {
  currentPlayer = "X";
  gameIsOver = false;
  resultElement.textContent = "";
  updateCurrentPlayerDisplay();

  for (let cell of gameBoard.children) {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  }
}

// Set up the reset button
const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetGame);

createBoard();
