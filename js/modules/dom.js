class DOMHandler {
    constructor() {
      this.gameBoard = document.getElementById('gameBoard');
      this.resultElement = document.getElementById('result');
      this.currentPlayerDisplay = document.getElementById('currentPlayer');
      this.soundButton = document.getElementById('soundButton');
      this.resetButton = document.getElementById('resetButton');
    }
  
    createBoard(clickHandler) {
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', clickHandler);
        this.gameBoard.appendChild(cell);
      }
    }
  
    setupResetButton(resetHandler) {
      this.resetButton.addEventListener('click', resetHandler);
    }
  
    setupSoundButton(soundToggleHandler) {
      this.soundButton.addEventListener('click', soundToggleHandler);
    }
  
    updateCurrentPlayerDisplay(currentPlayer) {
      this.currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
    }
  
    showResult(message) {
      this.resultElement.textContent = message;
    }
  
    resetBoard() {
      this.resultElement.textContent = '';
      Array.from(this.gameBoard.children).forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
      });
    }
  
    getCells() {
      return Array.from(this.gameBoard.children);
    }
  
    updateSoundButtonText(isPlaying) {
      this.soundButton.textContent = `Sound: ${isPlaying ? 'On' : 'Off'}`;
    }
  }
  