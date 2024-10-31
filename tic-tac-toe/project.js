const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

let currentPlayer = "X"; // Starting player
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

// Winning combinations
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Check for a winner or a tie
function checkWinner() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      return boardState[a];
    }
  }
  return boardState.includes("") ? null : "Tie";
}

// Handle cell clicks
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute("data-index");

  // Ignore if the cell is already filled or if the game is over
  if (boardState[index] !== "" || !gameActive) return;

  // Mark the board and update UI
  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  // Check for a winner
  const winner = checkWinner();
  if (winner) {
    gameActive = false;
    statusText.textContent = winner === "Tie" ? "It's a Tie!" : `${winner} Wins!`;
  } else {
    // Switch player turn
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Restart the game
function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  boardState = ["", "", "", "", "", "", "", "", ""];
  document.querySelectorAll(".cell").forEach(cell => (cell.textContent = ""));
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Add event listeners to cells and restart button
document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
