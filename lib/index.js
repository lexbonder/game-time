const Game = require('./Game.js')
const levelDisplay = document.querySelector('.current-level');
const lifeCounter = document.querySelector('.lives-left');
const background = new Image();
const canvas = document.getElementById('game');
const bg = document.getElementById('game-bg');
const c = canvas.getContext('2d');
const game = new Game(canvas.width);
const bgCtx = bg.getContext('2d');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const newGameButton = document.getElementById('new-game-button');

background.src = "https://i.imgur.com/sYZnHMe.jpg?1";

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
    game.animate(lifeCounter, c, canvas.width, canvas.height)
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
  const landedPads = game.lilyArray.filter((lily) => {
    return lily.color === '#A3C544'
  });
  
  if (landedPads.length === 5) {
    togglePause();
    setTimeout(function() {
      game.level++;
      levelDisplay.innerText = game.level;
      game.frogger.respawn();
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