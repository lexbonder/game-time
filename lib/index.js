var Game = require('./Game.js')

var levelDisplay = document.querySelector('.current-level');

var background = new Image();

background.src = "https://i.imgur.com/sYZnHMe.jpg?1";

var canvas = document.getElementById('game');

var bg = document.getElementById('game-bg');

var c = canvas.getContext('2d');

const game = new Game(canvas, c);

var bgCtx = bg.getContext('2d');

var startButton = document.getElementById('start-button');

var pauseButton = document.getElementById('pause-button');

var newGameButton = document.getElementById('new-game-button');

window.addEventListener( 'keydown', function(pressedButton) {
  if (!game.paused) {
    game.frogger.move(canvas.width, pressedButton.key)
  }
  if (pressedButton.key === 'p') {
    togglePause();
  }
  if (pressedButton.key === 'w') {
    cheatCode(pressedButton.key);
  }
})

startButton.addEventListener('click', e => {
  startButton.setAttribute('disabled', true);
  startButton.classList.add('start-btn-disabled');
  game.newGame(e)
  gameLoop();
});

pauseButton.addEventListener('click', e => togglePause(e));

newGameButton.addEventListener('click', reload);

background.onload = function() {
  bgCtx.drawImage(background, 0, 0);   
}

function cheatCode(pressedButton) {
  if (pressedButton === 'w') {
    game.lilyArray.forEach( lily => {
      lily.color = '#A3C544';
      lily.landedOn = true;
    })
  }
}

function reload() {
  window.location.reload(true)
}

function gameLoop () {
  if (!game.paused && game.frogger.lives >= 0 ) {
    game.animate()
    nextLevel();
    requestAnimationFrame(gameLoop);
  } else if (game.frogger.lives < 0) {
    lose();
  }
}

function togglePause() {
  game.clickCount++;
  if ( game.clickCount % 2 !== 0 ) {
    game.paused = true;
  } else {
    game.paused = false;
    gameLoop();
  }
}

function nextLevel() {
  var landedPads = game.lilyArray.filter((lily) => {
    return lily.color === '#A3C544'
  });
  
  if (landedPads.length === 5) {
    togglePause();
    setTimeout(function() {
      game.level++;
      levelDisplay.innerText = game.level;
      game.frogger.respawn(game.canvas);
      game.speedUp();
      game.clearLilys();
      togglePause();
    }, 3000)
  }
}

function lose() {
  c.fillStyle = "#000000"
  c.fillRect(0, 255, 400, 55);
  c.font = 'bold 48px serif';
  c.fillStyle = "rgba(255, 0, 0, 1)";
  c.fillText('GAME OVER', 60, 300);
  return 'Game Over'
}