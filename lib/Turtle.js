var Vehicle = require('./Vehicle.js')

class Turtle extends Vehicle {
  constructor(x, y, width, height, dx, color) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dx = dx;
    this.color = color || '#FF3333';
  }
}

module.exports = Turtle;