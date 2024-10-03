// Get the game board element, result display, and scoreboard elements from the DOM
const gameBoard = document.getElementById('gameBoard');
const resultElement = document.getElementById('result');
const gamesPlayedElement = document.getElementById('gamesPlayed');
const winsXElement = document.getElementById('winsX');
const winsOElement = document.getElementById('winsO');
const drawsElement = document.getElementById('draws');

// Initialize variables for the current player, game status, and scoreboard
let currentPlayer = 'X';    // Start the game with player 'X'
let gameIsOver = false;     // Track if the game has ended
let gamesPlayed = 0;        // Track number of games played
let winsX = 0;              // Track wins for player 'X'
let winsO = 0;              // Track wins for player 'O'
let draws = 0;              // Track the number of draw games


function createBoard() {
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
        cell.textContent = currentPlayer;   
        
        // Add class for styling based on current player
        cell.classList.add(currentPlayer.toLowerCase()); 

        if (checkWinner()) {                         
            resultElement.textContent = `${currentPlayer} wins!`; 
            gameIsOver = true;                     
            updateScore(currentPlayer);             
        } else if (isBoardFull()) {                  // Check if the board is full (resulting in a draw)
            resultElement.textContent = "It's a draw!"; // Display the draw message
            gameIsOver = true;                       // Mark the game as over
            draws++;                                 // Increment the draw count
            drawsElement.textContent = draws;        // Update the draws element in the scoreboard
        } else {                                    
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
        }
    }
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
        if (gameBoard.children[combination[0]].textContent ===
            gameBoard.children[combination[1]].textContent &&
            gameBoard.children[combination[1]].textContent ===
            gameBoard.children[combination[2]].textContent &&
            gameBoard.children[combination[0]].textContent !== '') {
            return true; 
        }
    }
    return false; 
}


function isBoardFull() {
    for (let i = 0; i < gameBoard.children.length; i++) {
        if (gameBoard.children[i].textContent === '') {
            return false; 
        }
    }
    return true; 
}

// Update the scoreboard based on the winner
// This function increments wins for 'X' or 'O', or the number of games played
function updateScore(winner) {
    if (winner === 'X') {
        winsX++;                                 // Increment wins for player 'X'
        winsXElement.textContent = winsX;        // Update the display for 'X' wins
    } else {
        winsO++;                                 // Increment wins for player 'O'
        winsOElement.textContent = winsO;        // Update the display for 'O' wins
    }
    gamesPlayed++;                               // Increment the number of games played
    gamesPlayedElement.textContent = gamesPlayed; // Update the display for games played
}


function resetGame() {
    currentPlayer = 'X';                         // Reset to start with player 'X'
    gameIsOver = false;                          // Mark the game as not over
    resultElement.textContent = '';              // Clear the result display

    
    for (let i = 0; i < gameBoard.children.length; i++) {
        gameBoard.children[i].textContent = '';  
        gameBoard.children[i].classList.remove('x', 'o'); // Remove the classes
    }
}

//setup the reset button
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame);


createBoard();


