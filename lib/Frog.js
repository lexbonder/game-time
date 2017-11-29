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

  move(c) {
    window.addEventListener( 'keydown', (event) => {
      if(event.key === 'ArrowLeft'){
        this.x -= this.dx;
      } else if (event.key === 'ArrowRight') {
        this.x += this.dx;
      } else if (event.key === 'ArrowUp') {
        this.y -= this.dy;
      } else if (event.key === 'ArrowDown') {
        this.y += this.dy;
      }
    })
    return this
  }
}



module.exports = Frog;
