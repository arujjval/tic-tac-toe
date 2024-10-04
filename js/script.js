const gameBoard = document.getElementById("gameBoard");
const resultElement = document.getElementById("result");
const currentPlayerDisplay = document.getElementById("currentPlayer");
const soundButton = document.getElementById("soundButton");
const resetButton = document.getElementById("resetButton");

let currentPlayer = "X";
let gameIsOver = false;
let scoreX = 0;
let scoreO = 0;

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
  updateScoreBoard();
}

function handleCellClick(event) {
  clickSound.play();
  const cell = event.target;
  if (!cell.textContent && !gameIsOver) {
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWinner()) {
      resultElement.textContent = `${currentPlayer} wins!`;
      gameIsOver = true;
      winSound.play();

      if (currentPlayer === 'X') {
        scoreX++;
      } else {
        scoreO++;
      }
      updateScoreBoard();
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
      gameBoard.children[combination[0]].textContent === gameBoard.children[combination[1]].textContent &&
      gameBoard.children[combination[1]].textContent === gameBoard.children[combination[2]].textContent &&
      gameBoard.children[combination[0]].textContent !== ""
    ) {
      return true;
    }
  }
  return false;
}

function isBoardFull() {
  for (let i = 0; i < gameBoard.children.length; i++) {
    if (gameBoard.children[i].textContent === "") {
      return false;
    }
  }
  return true;
}

function resetGame() {
  currentPlayer = "X";
  gameIsOver = false;
  resultElement.textContent = "";
  updateCurrentPlayerDisplay();

  for (let i = 0; i < gameBoard.children.length; i++) {
    gameBoard.children[i].textContent = "";
    gameBoard.children[i].classList.remove("x", "o");
  }
}

function updateScoreBoard() {
  document.getElementById('scoreX').textContent = `Player X: ${scoreX}`;
  document.getElementById('scoreO').textContent = `Player O: ${scoreO}`;
}

// Set up the reset button
resetButton.addEventListener("click", resetGame);

createBoard();