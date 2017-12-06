const {assert} = require('chai');
const Frog = require('../lib/Frog.js');
const Vehicle = require('../lib/Vehicle.js');
const Water = require('../lib/Water.js')
const Log = require('../lib/Log.js')
const LilyPad = require('../lib/LilyPad.js')


describe('Frog', function() {
  let frogger;

  beforeEach( function() {
    frogger = new Frog(10,10,10,10,10,10,'green');
  });

  it('Should be a function', function() {
    assert.isFunction(Frog);
  })
 
  it('Should be able to make a new frogger', function() {
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
    assert.equal(frogger.y, 10);

    frogger.moveUp();

    assert.equal(frogger.y, 0);
  })
  
  it('Should be able to move down', function() {
    assert.equal(frogger.y, 10);

    frogger.moveDown();

    assert.equal(frogger.y, 20);
  })
  
  it('Should be able to move left', function() {
    assert.equal(frogger.x, 10);

    frogger.moveLeft();

    assert.equal(frogger.x, 0);
  }) 

  it('Should be able to move right', function() {
    assert.equal(frogger.x, 10);

    frogger.moveRight();

    assert.equal(frogger.x, 20);
  })

  it('Should die when colliding with a car', function() {
    var leftCar = new Vehicle(10,10,10,10,1,'red');
    var rightCar = new Vehicle(20,20,20,20,1,'red');

    assert.equal(frogger.isAlive, true)

    frogger.hitByCar([leftCar], [rightCar])

    assert.equal(frogger.isAlive, false);
  })

  it('Should die when on water and not on a log', function () {
    let water = new Water(10,10,10,10)
    let leftLog = new Log(20,20,20,20)
    let rightLog = new Log(30,30,30,30)

    assert.equal(frogger.isAlive, true)

    frogger.floatOrSink([leftLog], [rightLog],water)

    assert.equal(frogger.isAlive, false)
  })

  it('Should move with a log', function() {
    let log = new Log(10,10,10,10,10,'brown')

    assert.equal(frogger.x, 10)
    frogger.isOnLog([log])
    assert.equal(frogger.x, 20)
  })

  it('Should not die when on a log or turtle', function() {
    let water = new Water(10,10,10,10)
    let leftLog = new Log(10,10,10,10)
    let rightTurtle = new Log(30,30,30,30)

    assert.equal(frogger.isAlive, true)

    frogger.floatOrSink([leftLog], [rightTurtle],water)

    assert.equal(frogger.isAlive, true)
  })

  it('Should lose a life if it is killed', function() {
    assert.equal(frogger.lives, 3)
    
    assert.equal(frogger.isAlive, true)
    
    frogger.isAlive = false;
    frogger.deathClock = 80;
    
    assert.equal(frogger.isAlive, false)
    
    frogger.die()

    assert.equal(frogger.lives, 2)
  })

  it('Should go back to start when it respawns', function() {
    assert.equal(frogger.x, 10)

    frogger.moveLeft()

    assert.equal(frogger.x, 0)

    frogger.respawn()

    assert.equal(frogger.x, 190);
  })

  it('Should respawn when it dies', function() {
    assert.equal(frogger.x, 10)

    frogger.isAlive = false;
    frogger.deathClock = 80;
    frogger.die();

    assert.equal(frogger.x, 190)
  })

  it('Should respawn after landing on a lilyPad', function() {
    let lilyPad = new LilyPad(10,10,10,10)

    assert.equal(frogger.x, 10)

    frogger.onLilyPad([lilyPad])

    assert.equal(frogger.x, 190)
  })
})