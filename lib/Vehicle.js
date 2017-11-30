class Vehicle {
	constructor(x, y, width, height, dx) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.dx = dx;
	}

	drawCar(c) {
		// this.drive();
		c.fillStyle = "#FF0066";
		c.fillRect(this.x, this.y, this.width, this.height);
	}
  drive(canvas) {
  	var canvas = document.getElementById('game');
        if (this.x > canvas.width) {
          this.x = 0 - this.width;
        }
        this.x += this.dx;
    }
  opposingDrive(canvas) {
  	 var canvas = document.getElementById('game');
       if (this.x + this.width < 0) {
          this.x = canvas.width;
        }
        this.x -= this.dx;
  }

module.exports = Vehicle;