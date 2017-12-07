var Vehicle = require('./Vehicle.js')

class WaterObject extends Vehicle {
  constructor(x, y, width, height, color, dx) {
    super(x, y, width, height, color, dx);
  }
}

module.exports = WaterObject;