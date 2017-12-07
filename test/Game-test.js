const {assert} = require('chai');
const Game = require('../lib/Game.js')

describe('Game', function() {
  it('Should be a function', function() {
    assert.isFunction(Game);
  })

  it.skip('Should create an instance of game', function() {
    let game = new Game();
    
    assert.isObject(game);
  })
})

// // Needs Game Constructor //
//   it.skip('Should increase the level if 5 lilyPads are landed on', function() {
//     let lilyArray = [];
//     for ( let i = 0; i < 5; i ++ ) {
//       lilyArray.push(new LilyPad(10,10,10,10))
//     };

//     assert.equal(game.level, 1)

//     lilyArray.forEach( lilyPad => lilyPad.color = 'lightgreen');
  
//     a
//   })
  // Should be a function
  // Should be able to instantiate a new game
  // Should report 'game over' if all lives are gone -- should be in game test
  // Should pause/unpause
  // Should go to next level when lilypads are all landed on