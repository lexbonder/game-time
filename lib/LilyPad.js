class LilyPad {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = 'transparent';
    this.landedOn = false;
  }

  draw(c) {
    if (this.landedOn === true) {
      c.fillStyle = 'green';
    } else {
      c.fillStyle = this.color;
    }
    c.fillRect(this.x, this.y, this.width, this.height);
  }
}


module.exports = LilyPad;