const {assert} = require('chai');
const Turtle = require('../lib/Turtle.js')
const Frog = require('../lib/Frog.js')

describe('Turtle', function() {
  let turtle;
  
  beforeEach(function() {
    turtle = new Turtle(10, 10, 10, 10, 10, 'green');
  })

  it('Should be a function', function() {
    assert.isFunction(Turtle);
  })

  it('Should create an instance of turtle', function() {
    assert.isObject(turtle);
  })

  it('Should have an X, Y, width, height, speed, and color', function() {
    assert.equal(turtle.x, 10)
    assert.equal(turtle.y, 10)
    assert.equal(turtle.width, 10)
    assert.equal(turtle.height, 10)
    assert.equal(turtle.dx, 10)
    assert.equal(turtle.color, 'green')
  })

  it('Should be able to move', function() {
    assert.equal(turtle.x, 10);

    turtle.drive();

    assert.equal(turtle.x, 20);
  })
})