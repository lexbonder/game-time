const GamePiece = require('./GamePiece');

class Frog extends GamePiece {
  constructor(x, y, width, height, color, dx, dy) {
    super(x, y, width, height, color)
    this.dx = dx;
    this.dy = dy;
    this.isAlive = true;
    this.lives = 3;
    this.deathClock = 0;
  }

  draw(c) {
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }

  move(canvas, pressedButton) {
    if (this.isAlive) {
      this.deathClock = 0;
      if (pressedButton === 'ArrowLeft' &&
        this.x - this.width * 1.5 > 0) {
        this.jump('left');
      } else if (pressedButton === 'ArrowRight' &&
        this.x + this.width * 2.5 < canvas) {
        this.jump('right');
      } else if (pressedButton === 'ArrowUp' &&
        this.y >= 126) {
        this.jump('up');
      } else if (pressedButton === 'ArrowDown' &&
        this.y < 500) {
        this.jump('down');
      }
    }
  }

  jump(direction) {
    switch (direction) {
    case 'left':
      this.x -= this.dx;
      break;
    case 'right':
      this.x += this.dx;
      break;
    case 'up':
      this.y -= this.dy;
      break;
    case 'down':
      this.y += this.dy;
      break;
    }
  }

  hitByCar(laneLeft, laneRight) {
    var allCars = [...laneLeft, ...laneRight];
    
    allCars.forEach( car => {
      if ((this.x < car.x + car.width &&
          this.x + this.width > car.x &&
          this.y < car.y + car.height &&
          this.height + this.y > car.y) === true) {
        return this.isAlive = false;
      }
    })
  }

  floatOrSink (logs, turtles, water) {
    var allLogs = [...logs, ...turtles];
    
    if (!this.isOnLog(allLogs) && this.isInWater(water)) {
      this.isAlive = false;
    }
  }

  isOnLog(allLogs) {
    let onALog = false;
    
    allLogs.forEach(log => {
      if (this.x < log.x + log.width - this.width / 2 &&
             this.x + this.width / 2 > log.x &&
             this.y < log.y + log.height &&
             this.height + this.y > log.y) {
        onALog = true;
        this.x += log.dx;
      }
    })
    return onALog;
  }

  isInWater(water) {
    return this.x < water.x + water.width - this.width / 2 &&
           this.x + this.width / 2 > water.x &&
           this.y < water.y + water.height &&
           this.height + this.y > water.y;
  }

  onLilyPad (lilyArray) {
    if (this.landedOnPad(lilyArray)) {
      this.respawn();
    }
  }

  landedOnPad (lilyArray) {
    let onLilyPad = false;
    
    lilyArray.forEach(lilyPad => {
      if ((this.x < lilyPad.x + lilyPad.width &&
           this.x + this.width > lilyPad.x &&
           this.y < lilyPad.y + lilyPad.height &&
           this.height + this.y > lilyPad.y) === true &&
           lilyPad.color !== '#A3C544') {
        onLilyPad = true;
        lilyPad.landedOn = true;
        lilyPad.color = '#A3C544';
      } 
    })
    return onLilyPad;
  }

  outOfBounds(canvas) {
    if (this.x + this.width > canvas.width + this.width / 2 ||
        this.x + this.width / 2 < 0) {
      this.isAlive = false;
    }
  }

  die() {
    if (this.isAlive === false) {
      this.color = 'red';
      this.deathClock++;

      if ( this.deathClock < 80 ) {

        for (let i = 0; i < 4; i++) {
          let start = i * 20;
          let end = start + 20;

          if ( this.deathClock >= start && this.deathClock < end ) {
            let opacity = 1 - (i * 0.2);
            
            this.color = 'rgba(255, 0, 0, ' + opacity + ')';
            break;
          }
        }

      } else {
        this.lives--;
        this.deathClock = 0;
        this.respawn();
      }
    }
  }

  respawn() {
    var frogStartPoint = { x: 190, y: 500 };
    
    if (this.lives >= 0) {
      this.x = frogStartPoint.x;
      this.y = frogStartPoint.y;
      this.isAlive = true;
      this.color = '#A3C544';
    }
  }
}

module.exports = Frog;
