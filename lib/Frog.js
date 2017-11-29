class Frog {
  constructor(x, y, width, height, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
  }

  draw(c) {
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }

  move(canvas) {
    window.addEventListener( 'keydown', (event) => {
      event.preventDefault();
      if(event.key === 'ArrowLeft' && this.x - this.width > 0){
        this.x -= this.dx;
      } else if (event.key === 'ArrowRight' && this.x + this.width * 2 < canvas.width) {
        this.x += this.dx;
      } else if (event.key === 'ArrowUp' && this.y >= 126) {
        this.y -= this.dy;
      } else if (event.key === 'ArrowDown' && this.y < 500) {
        this.y += this.dy;
      }
    })
    return this
  }

  hitByCar(canvas, car) {
    if ((this.x < car.x + car.width &&
         this.x + this.width > car.x &&
         this.y < car.y + car.height &&
         this.height + this.y > car.y) === true) {
      // Be Dead
    }
  }

// ---- NEED TO CHANGE CAR TO LOG ONCE LOGS ARE BUILT ----
  onALog (canvas, car, water) {
    if ((this.x < car.x + car.width - this.width / 2 &&
         this.x + this.width / 2 > car.x &&
         this.y < car.y + car.height &&
         this.height + this.y > car.y) === true) {
      this.x += car.dx;
      this.color = 'pink'
    } else if ((this.x < water.x + water.width - this.width / 2 &&
                this.x + this.width / 2 > water.x &&
                this.y < water.y + water.height &&
                this.height + this.y > water.y) === true){
      // Be Dead
      this.color = 'black';
    }
  }

  onLillypad (canvas, lillypad) {
    if ((this.x < car.x + car.width &&
         this.x + this.width > car.x &&
         this.y < car.y + car.height &&
         this.height + this.y > car.y) === true) {
      // WIN!!!
    }
  }

  outOfBounds(canvas) {
    if (this.x + this.width > canvas.width + this.width / 2 ||
        this.x + this.width / 2 < 0) {
      // Be Dead
    }
  }
} 

module.exports = Frog;
