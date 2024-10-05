const gameBoard = document.getElementById("gameBoard");
const resultElement = document.getElementById("result");
const currentPlayerDisplay = document.getElementById("currentPlayer");
const soundButton = document.getElementById("soundButton");
const resetButton = document.getElementById("resetButton");

// Scoreboard elements
const gamesPlayedElement = document.getElementById("gamesPlayed");
const winsXElement = document.getElementById("winsX");
const winsOElement = document.getElementById("winsO");
const drawsElement = document.getElementById("draws");

let currentPlayer = "X";
let gameIsOver = false;
let gamesPlayed = 0;
let winsX = 0;
let winsO = 0;
let draws = 0;

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

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", handleCellClick);
    gameBoard.appendChild(cell);
  }
  updateCurrentPlayerDisplay(); // Show the initial player
}

function handleCellClick(event) {
  clickSound.play();
  const cell = event.target;
  if (!cell.textContent && !gameIsOver) {
    cell.textContent = currentPlayer;

    // Add class for styling based on current player
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWinner()) {
      resultElement.innerHTML = `<span style="color: ${currentPlayer === 'X' ? '#00f0ff' : '#ff4f94'};">${currentPlayer} wins!</span>`;
      gameIsOver = true;
      updateScoreboard(currentPlayer); // Update the scoreboard for a win
    } else if (isBoardFull()) {
      resultElement.textContent = "It's a draw!";
      gameIsOver = true;
      updateScoreboard("draw"); // Update the scoreboard for a draw
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      updateCurrentPlayerDisplay(); // Update display after each turn
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
  for (let i = 0; i < gameBoard.children.length; i++) {
    if (gameBoard.children[i].textContent === "") {
      return false;
    }
  }
  return true;
}

function updateScoreboard(result) {
  gamesPlayed++;
  gamesPlayedElement.textContent = gamesPlayed;

  if (result === "X") {
    winsX++;
    winsXElement.innerHTML = `<span style="color: #00f0ff;">${winsX}</span>`; // X wins in blue
  } else if (result === "O") {
    winsO++;
    winsOElement.innerHTML = `<span style="color: #00f0ff;">${winsO}</span>`; // O wins in blue
  } else if (result === "draw") {
    draws++;
    drawsElement.textContent = draws; // Draws remain in default color
  }
}

function resetGame() {
  currentPlayer = "X";
  gameIsOver = false;
  resultElement.textContent = "";
  updateCurrentPlayerDisplay(); // Reset display on game reset

  for (let i = 0; i < gameBoard.children.length; i++) {
    gameBoard.children[i].textContent = "";
    gameBoard.children[i].classList.remove("x", "o"); // Remove the classes
  }
}

// Set up the reset button
resetButton.addEventListener("click", resetGame);

createBoard();

