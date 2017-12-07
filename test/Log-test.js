const {assert} = require('chai');
const Log = require('../lib/Log.js')
const Frog = require('../lib/Frog.js')

describe('Log', function() {
  let log;
  
  beforeEach(function() {
    log = new Log(10, 10, 10, 10, 10, 'brown');
  })

  it('Should be a function', function() {
    assert.isFunction(Log);
  })

  it('Should create an instance of log', function() {
    assert.isObject(log);
  })

  it('Should have an X, Y, width, height, speed, and color', function() {
    assert.equal(log.x, 10)
    assert.equal(log.y, 10)
    assert.equal(log.width, 10)
    assert.equal(log.height, 10)
    assert.equal(log.dx, 10)
    assert.equal(log.color, 'brown')
  })

  it('Should be able to move', function() {
    
  })
})
// Should be function
// Should be able to make an instance of itself
// Should be able to take paramaters
// Should move to left/right
// Should be able to carry frog