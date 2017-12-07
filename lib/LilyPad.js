const GamePiece = require('./GamePiece');

class LilyPad extends GamePiece {
  constructor(x, y, width, height, color) {
    super(x, y, width, height, color)
    this.landedOn = false;
  }

  draw(c) {
    if (this.landedOn === true) {
      this.color = '#A3C544';
    }
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.width, this.height);
  }
}

module.exports = LilyPad;