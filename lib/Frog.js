class Frog {
  constructor(x, y, width, height, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.isAlive = true;
    this.lives = 3;
    this.deathClock = 0;
    this.paused = false;
  }

  draw(c) {
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }

  move(canvas) {
    window.addEventListener( 'keydown', (event) => {
      event.preventDefault();
      if (this.paused === false) {
        if (this.isAlive === true) {
          if (event.key === 'ArrowLeft' &&
            this.x - this.width * 1.5 > 0) {
            this.x -= this.dx;
          } else if (event.key === 'ArrowRight' &&
            this.x + this.width * 2.5 < canvas.width) {
            this.x += this.dx;
          } else if (event.key === 'ArrowUp' &&
            this.y >= 126) {
            this.y -= this.dy;
          } else if (event.key === 'ArrowDown' &&
            this.y < 500) {
            this.y += this.dy;
          }
        }
      }
      return this;
    })
  }

  hitByCar(laneLeft, laneRight) {
    var allCars = [...laneLeft, ...laneRight];
    
    allCars.forEach( car => {
      if ((this.x < car.x + car.width &&
          this.x + this.width > car.x &&
          this.y < car.y + car.height &&
          this.height + this.y > car.y) === true) {
        this.isAlive = false;
      }
    })
  }

  onALog (logsLeft, turtlesRight, water) {
    var allLogs = [...logsLeft, ...turtlesRight];
    if (!this.isOnLog(allLogs) && this.isInWater(water)) {
      this.isAlive = false;
    }
  }

  isOnLog(allLogs) {
    let outPutVal = false;
    
    allLogs.forEach(log => {
      if (this.x < log.x + log.width - this.width / 2 &&
             this.x + this.width / 2 > log.x &&
             this.y < log.y + log.height &&
             this.height + this.y > log.y) {
        outPutVal = true;
        this.x += log.dx;
      }
    })
    return outPutVal;
  }

  isInWater(water) {
    let outPutVal = false;
    
    if (this.x < water.x + water.width - this.width / 2 &&
        this.x + this.width / 2 > water.x &&
        this.y < water.y + water.height &&
        this.height + this.y > water.y) {
      outPutVal = true;
    }
    return outPutVal;
  }

  onLilyPad (lilyArray, canvas) {
    if (this.landedOnPad(lilyArray)) {
      this.respawn(canvas);
    }
  }

  landedOnPad (lilyArray) {
    let outPutVal = false;
    
    lilyArray.forEach(lilyPad => {
      if ((this.x < lilyPad.x + lilyPad.width &&
           this.x + this.width > lilyPad.x &&
           this.y < lilyPad.y + lilyPad.height &&
           this.height + this.y > lilyPad.y) === true &&
           lilyPad.color !== 'green') {
        outPutVal = true;
        lilyPad.landedOn = true;
      } 
    })
    return outPutVal;
  }

  outOfBounds(canvas) {
    if (this.x + this.width > canvas.width + this.width / 2 ||
        this.x + this.width / 2 < 0) {
      this.isAlive = false;
    }
  }

  die(canvas) {
    if (this.isAlive === false) {
      this.color = 'red';
      this.deathClock++;
      if ( this.deathClock < 20 ) {
        this.color = 'rgba(255, 0, 0, .8)';
      } else if ( this.deathClock < 40 ) {
        this.color = 'rgba(255, 0, 0, .6)';
      } else if ( this.deathClock < 60 ) {
        this.color = 'rgba(255, 0, 0, .4)';
      } else if ( this.deathClock < 80 ) {
        this.color = 'rgba(255, 0, 0, .2)';
      } else {
        this.deathClock = 0;
        this.lives--;
        this.respawn(canvas);
      }
    }
  }

  respawn(canvas) {
    if (this.lives >= 0) {
      this.x = canvas.width / 2 - 10;
      this.y = 500;
      this.isAlive = true;
      this.color = 'green';
    } else {
      this.lives = 0;
      console.log('GaMe OvEr!!');
      // make game over function
    }
  }
}

module.exports = Frog;
