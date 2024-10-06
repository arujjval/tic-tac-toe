class SoundHandler {
    constructor() {
      this.backgroundSound = new Audio('sounds/background.wav');
      this.clickSound = new Audio('sounds/click.wav');
      this.winSound = new Audio('sounds/win.wav');
  
      this.backgroundSound.loop = true;
      this.backgroundSound.volume = 0.1;
    }
  
    playBackgroundMusic() {
      this.backgroundSound.play();
    }
  
    playClickSound() {
      this.clickSound.play();
    }
  
    playWinSound() {
      this.winSound.play();
    }
  
    toggleSound() {
      if (this.backgroundSound.paused) {
        this.backgroundSound.play();
        soundButton.textContent = "Sound: ON";
      } else {
        this.backgroundSound.pause();
        soundButton.textContent = "Sound: OFF";
      }
      return !this.backgroundSound.paused;
    }
    
  }