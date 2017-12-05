const {assert} = require('chai');
const Frog = require('../lib/Frog.js');

describe('Frog', function() {
  it('Should be a function', function() {
    assert.isFunction(Frog);
  })
 
  it('Should be able to make a new frogger', function() {
    var frogger = new Frog();
    assert.isObject(frogger);
  })
  
  it('Should be able to take an x, y, width, height, Xspeed, Yspeed, and color value', function() {
    var frogger = new Frog(10,20,30,40,50,60,'green');

    assert.equal(frogger.x, 10);
    assert.equal(frogger.y, 20);
    assert.equal(frogger.width, 30);
    assert.equal(frogger.height, 40);
    assert.equal(frogger.dx, 50);
    assert.equal(frogger.dy, 60);
    assert.equal(frogger.color, 'green');
  })
  
  it('Should be able to move up', function() {
    var frogger = new Frog(10,10,10,10,10,10,'green');

    assert.equal(frogger.y, 10);

    frogger.moveUp();

    assert.equal(frogger.y, 0);
  })
  
  it('Should be able to move down', function() {
    var frogger = new Frog(10,10,10,10,10,10,'green');

    assert.equal(frogger.y, 10);

    frogger.moveDown();

    assert.equal(frogger.y, 20);
  })
  
  it('Should be able to move left', function() {
    var frogger = new Frog(10,10,10,10,10,10,'green');

    assert.equal(frogger.x, 10);

    frogger.moveLeft();

    assert.equal(frogger.x, 0);
  }) 

  it('Should be able to move right', function() {
    var frogger = new Frog(10,10,10,10,10,10,'green');

    assert.equal(frogger.x, 10);

    frogger.moveRight();

    assert.equal(frogger.x, 20);
  })

  // Should be able to stand on turtle/log
  // Should move the same speed as turtle/log while on it.
  // Should respawn if killed
  // Should respawn if landed on lilypad
  // Should be killed by car
  // Should be killed by water
  // Should lose life if killed
  // Should report 'game over' if all lives are gone

})