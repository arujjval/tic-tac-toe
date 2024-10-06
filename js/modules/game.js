// game.js
class Game {
    constructor(domHandler, soundHandler) {
      this.domHandler = domHandler;
      this.soundHandler = soundHandler;
      this.currentPlayer = 'X';
      this.gameIsOver = false;
      this.winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];
    }
  
    init() {
      this.domHandler.createBoard(this.handleCellClick.bind(this));
      this.domHandler.setupResetButton(this.resetGame.bind(this));
      this.domHandler.setupSoundButton(this.soundHandler.toggleSound.bind(this.soundHandler));
      this.updateCurrentPlayerDisplay();
      this.soundHandler.playBackgroundMusic();
    }
  
    handleCellClick(event) {
      const cell = event.target;
      if (!cell.textContent && !this.gameIsOver) {
        this.soundHandler.playClickSound();
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());
  
        if (this.checkWinner()) {
          this.endGame(`${this.currentPlayer} wins!`);
          this.soundHandler.playWinSound();
        } else if (this.isBoardFull()) {
          this.endGame("It's a draw!");
        } else {
          this.switchPlayer();
        }
      }
    }
  
    switchPlayer() {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      this.updateCurrentPlayerDisplay();
    }
  
    updateCurrentPlayerDisplay() {
      this.domHandler.updateCurrentPlayerDisplay(this.currentPlayer);
    }
  
    checkWinner() {
      return this.winningCombinations.some(combination => {
        const [a, b, c] = combination;
        const cells = this.domHandler.getCells();
        return cells[a].textContent &&
               cells[a].textContent === cells[b].textContent &&
               cells[b].textContent === cells[c].textContent;
      });
    }
  
    isBoardFull() {
      return this.domHandler.getCells().every(cell => cell.textContent !== '');
    }
  
    endGame(message) {
      this.gameIsOver = true;
      this.domHandler.showResult(message);
    }
  
    resetGame() {
      this.currentPlayer = 'X';
      this.gameIsOver = false;
      this.domHandler.resetBoard();
      this.updateCurrentPlayerDisplay();
    }
  }
  