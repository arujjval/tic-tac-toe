// Tic-Tac-Toe
const gameBoard = document.getElementById("gameBoard");
const resultElement = document.getElementById("result");
const resetButton = document.getElementById("resetButton");
const currentPlayerDisplay = document.getElementById("currentPlayer");
const soundButton = document.getElementById("soundButton");

let currentPlayer = "X";
let gameIsOver = false;

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
    soundButton.textContent = "Sound: On";
  } else {
    backgroundSound.pause();
    soundButton.textContent = "Sound: Off";
  }
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
  clickSound.play();
  const cell = event.target;
  if (
    !cell.textContent &&
    !cell.classList.contains("x") &&
    !cell.classList.contains("o") &&
    !gameIsOver
  ) {
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    if (checkWinner()) {
      resultElement.textContent = `${currentPlayer} wins!`;
      gameIsOver = true;
      winSound.play();
      highlightWinningCells();
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
  return winningCombinations.some((combination) => {
    const [a, b, c] = combination;
    return (
      gameBoard.children[a].classList.contains(currentPlayer.toLowerCase()) &&
      gameBoard.children[b].classList.contains(currentPlayer.toLowerCase()) &&
      gameBoard.children[c].classList.contains(currentPlayer.toLowerCase())
    );
  });
}

function highlightWinningCells() {
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
  winningCombinations.forEach((combination) => {
    const [a, b, c] = combination;
    if (
      gameBoard.children[a].classList.contains(currentPlayer.toLowerCase()) &&
      gameBoard.children[b].classList.contains(currentPlayer.toLowerCase()) &&
      gameBoard.children[c].classList.contains(currentPlayer.toLowerCase())
    ) {
      gameBoard.children[a].classList.add("winner");
      gameBoard.children[b].classList.add("winner");
      gameBoard.children[c].classList.add("winner");
    }
  });
}

function isBoardFull() {
  return [...gameBoard.children].every(
    (cell) => cell.classList.contains("x") || cell.classList.contains("o")
  );
}

function resetGame() {
  currentPlayer = "X";
  gameIsOver = false;
  resultElement.textContent = "";
  updateCurrentPlayerDisplay();
  [...gameBoard.children].forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("x", "o", "winner");
  });
}

resetButton.addEventListener("click", resetGame);
createBoard();