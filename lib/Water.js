const GamePiece = require('./GamePiece');

class Water extends GamePiece {
  constructor(x, y, width, height, color) {
    super(x, y, width, height, color)
  }

  draw(c) {
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }
}

module.exports = Water;