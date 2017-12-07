const { assert } = require('chai');
const WaterObject = require('../lib/WaterObject.js')
const Frog = require('../lib/Frog.js')

describe('WaterObject', function() {
  let turtle;
  let log;
  
  beforeEach(function() {
    turtle = new WaterObject(10, 10, 10, 10, -10, 'green');
    log = new WaterObject(10, 10, 10, 10, 10, 'brown');
  })

  it('Should be a function', function() {
    assert.isFunction(WaterObject);
  })

  it('Should create an instance of turtle or log', function() {
    assert.isObject(turtle);
    assert.isObject(log);
  })

  it('Should have an X, Y, width, height, speed, and color', function() {
    assert.equal(turtle.x, 10)
    assert.equal(turtle.y, 10)
    assert.equal(turtle.width, 10)
    assert.equal(turtle.height, 10)
    assert.equal(turtle.dx, -10)
    assert.equal(turtle.color, 'green')

    assert.equal(log.x, 10)
    assert.equal(log.y, 10)
    assert.equal(log.width, 10)
    assert.equal(log.height, 10)
    assert.equal(log.dx, 10)
    assert.equal(log.color, 'brown')
  })

  it('Turtles move to the right, Logs Move to the left', function() {
    assert.equal(turtle.x, 10);
    assert.equal(log.x, 10);

    turtle.drive();
    log.drive();

    assert.equal(turtle.x, 0);
    assert.equal(log.x, 20);
  })
})