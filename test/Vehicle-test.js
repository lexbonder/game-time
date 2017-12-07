const {assert} = require('chai');
const Vehicle = require('../lib/Vehicle.js')
const Frog = require('../lib/Frog.js')

describe('Vehicle', function() {
  let vehicle;
  
  beforeEach(function() {
    vehicle = new Vehicle(10, 10, 10, 10, 10, 'red');
  })

  it('Should be a function', function() {
    assert.isFunction(Vehicle);
  })

  it('Should create an instance of vehicle', function() {
    assert.isObject(vehicle);
  })

  it('Should have an X, Y, width, height, speed, and color', function() {
    assert.equal(vehicle.x, 10)
    assert.equal(vehicle.y, 10)
    assert.equal(vehicle.width, 10)
    assert.equal(vehicle.height, 10)
    assert.equal(vehicle.dx, 10)
    assert.equal(vehicle.color, 'red')
  })

  it('Should be able to move', function() {
    assert.equal(vehicle.x, 10);

    vehicle.drive();

    assert.equal(vehicle.x, 20);
  })
})// Should be function
// Should be able to make an instance of itself
// Should be able to take paramaters
// Should be able to move left/right
// Should increase speeed on next level