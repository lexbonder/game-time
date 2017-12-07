const { assert } = require('chai');
const GamePiece = require('../lib/GamePiece.js');


describe('GamePiece', function() {
  let gamePiece;
  
  beforeEach(function() {
    gamePiece = new GamePiece(10, 10, 10, 10, 'blue');
  })

  it('Should be a function', function() {
    assert.isFunction(GamePiece);
  })

  it('Should create an instance of water', function() {
    assert.isObject(gamePiece);
  })

  it('Should have an X, Y, width, height, and color', function() {
    assert.equal(gamePiece.x, 10)
    assert.equal(gamePiece.y, 10)
    assert.equal(gamePiece.width, 10)
    assert.equal(gamePiece.height, 10)
    assert.equal(gamePiece.color, 'blue')
  })
})
