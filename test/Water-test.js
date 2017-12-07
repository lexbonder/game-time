const {assert} = require('chai');
const Water = require('../lib/Water.js')
const Frog = require('../lib/Frog.js')

describe('Water', function() {
  let water;
  
  beforeEach(function() {
    water = new Water(10, 10, 10, 10, 'transparent');
  })

  it('Should be a function', function() {
    assert.isFunction(Water);
  })

  it('Should create an instance of water', function() {
    assert.isObject(water);
  })

  it('Should have an X, Y, width, height, and color', function() {
    assert.equal(water.x, 10)
    assert.equal(water.y, 10)
    assert.equal(water.width, 10)
    assert.equal(water.height, 10)
    assert.equal(water.color, 'transparent')
  })
})
