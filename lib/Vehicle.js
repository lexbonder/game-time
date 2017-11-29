class Vehicle {
	constructor(x, y, width, height, dx) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.dx = dx;
	}

	drawCar(c) {
		c.fillStyle = "#FF0000";
		c.fillRect(this.x, this.y, this.width, this.height);
	}
	drive(c) {
		this.x++;
		console.log('bro')
	}
}

module.exports = Vehicle;