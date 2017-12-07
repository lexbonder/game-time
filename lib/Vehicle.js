const GamePiece = require('./GamePiece');

class Vehicle extends GamePiece {
  constructor(x, y, width, height, dx, color) {
    super(x, y, width, height, color)
    this.dx = dx;
  }

  draw(c) {
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.width, this.height);
  }

  drive(canvas) {
    if (this.x > canvas) {
      this.x = 0 - this.width;
    }
    this.x += this.dx;
  }

  opposingDrive(canvas) {
    if (this.x + this.width < 0) {
      this.x = canvas;
    }
    this.x += this.dx;
  }
}

module.exports = Vehicle;