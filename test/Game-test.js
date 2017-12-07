const {assert} = require('chai');
const Game = require('../lib/Game.js')
const LilyPad = require('../lib/LilyPad.js');
const WaterObject = require('../lib/WaterObject.js');
const Vehicle = require('../lib/Vehicle.js');

global.document = {
  getElementById: function (){},
  querySelector: function () {
    return {
      removeAttribute: function() {},
      setAttribute: function() {
      }
    };
  }
};

const canvas = {
  getContext: function() {}
};

let game;

describe('Game', function() {
  beforeEach(function() {
    game = new Game(canvas)
  })
  it('Should be a function', function() {
    assert.isFunction(Game);
  })

  it('Should create an instance of game', function() {
    assert.isObject(game);
  })

  it('Should be able to clear the landed lilypads', function() {
    let lilyPad = new LilyPad(10,10,10,10, 'transparent')
    game.lilyArray.push(lilyPad)

    assert.equal(lilyPad.color, 'transparent');
    lilyPad.color = '#A3C544';
    assert.equal(lilyPad.color, '#A3C544');
    game.clearLilys();
    assert.equal(lilyPad.color, 'transparent');
  })

  it('Should increase the speed of logs, turtles, and cars', function() {
    let log = new WaterObject(10,10,10,10,10,'brown');
    let leftCar = new Vehicle(10,10,10,10,10,'red');
    let rightCar = new Vehicle(10,10,10,10,-10,'red');
    let turtle = new WaterObject(10,10,10,10,-10,'green');

    game.logs.push(log) 
    game.laneLeft.push(leftCar)
    game.laneRight.push(rightCar)
    game.turtles.push(turtle)

    assert.equal(log.dx, 10)
    assert.equal(leftCar.dx, 10)
    assert.equal(rightCar.dx, -10)
    assert.equal(turtle.dx, -10)

    game.speedUp()

    assert.equal(log.dx, 10.2)
    assert.equal(leftCar.dx, 10.2)
    assert.equal(rightCar.dx, -10.2)
    assert.equal(turtle.dx, -10.2)

  })
})