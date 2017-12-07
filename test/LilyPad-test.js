const {assert} = require('chai');
const LilyPad = require('../lib/LilyPad.js')
const Frog = require('../lib/Frog.js')

describe('LilyPad', function() {
  let lilyPad;
  
  beforeEach(function() {
    lilyPad = new LilyPad(10, 10, 10, 10, 'transparent');
  })

  it('Should be a function', function() {
    assert.isFunction(LilyPad)
  })

  it('Should be able to make a new LilyPad', function() {
    assert.isObject(lilyPad);
  })

  it('Should have an X, Y, Width, and Height', function() {
    assert.equal(lilyPad.x, 10)
    assert.equal(lilyPad.y, 10)
    assert.equal(lilyPad.width, 10)
    assert.equal(lilyPad.height, 10)
  })

  it('Should change color when the frog lands on it', function() {
    let frogger = new Frog(10,10,10,10,10,10,'green');

    assert.equal(lilyPad.landedOn, false)
    assert.equal(lilyPad.color, 'transparent')
    frogger.landedOnPad([lilyPad])
    assert.equal(lilyPad.landedOn, true)
    assert.equal(lilyPad.color, '#A3C544')
  })
})