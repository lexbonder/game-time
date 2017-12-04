class Vehicle {
  constructor(x, y, width, height, dx, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dx = dx;
    this.color = color || '#FF0066';
  }
	draw(c) {
		c.fillStyle = this.color;
		c.fillRect(this.x, this.y, this.width, this.height);
	}
  drive(canvas) {
    if (this.x > canvas.width) {
      this.x = 0 - this.width;
    }
    this.x += this.dx;
  }
  opposingDrive(canvas) {
    if (this.x + this.width < 0) {
      this.x = canvas.width;
    }
    this.x += this.dx;
  }
}

module.exports = Vehicle;