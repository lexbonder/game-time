var Game = require('./Game.js')
var Frog = require('./Frog.js');
var Vehicle = require('./Vehicle.js');
var Water = require('./Water.js');
var LilyPad = require('./LilyPad.js');
var Log = require('./Log.js');
var Turtle = require('./Turtle.js');


// var lifeCounter = document.querySelector('.lives-left');

var levelDisplay = document.querySelector('.current-level');

var level = 1;

var background = new Image();

background.src = "https://i.imgur.com/sYZnHMe.jpg?1";

var canvas = document.getElementById('game');

var bg = document.getElementById('game-bg');

var c = canvas.getContext('2d');

const game = new Game(canvas, c);

var bgCtx = bg.getContext('2d');

// var frogger = new Frog(
//canvas.width / 2 - 10, 500, 20, 20, 35, 34, 'lightgreen');

// var water = new Water(0, 54, canvas.width, 228);

// var clickCount = 0;

var startButton = document.getElementById('start-button');
var pauseButton = document.getElementById('pause-button');
var newGameButton = document.getElementById('new-game-button');


// Keys
window.addEventListener( 'keydown', function(pressedButton) {
  if (!paused) {
    frogger.move(canvas.width, pressedButton.key)
  }
  if (pressedButton.key === 'p') {
    togglePause();
  }
  if (pressedButton.key === 'w') {
    cheatCode(pressedButton.key);
  }
})

startButton.addEventListener('click', e => {
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
    lilyArray.forEach( lily => {
      lily.color = 'lightgreen';
      lily.landedOn = true;
    })
  }
}




// var laneLeft = [];
// var laneRight = [];
// var lilyArray = [];
// var logsLeft = [];
// var turtlesRight = [];

function reload() {
  window.location.reload(true)
}

function gameLoop () {
  if (game.frogger.paused === false) {
    game.animate();
    // c.clearRect(0, 0, canvas.width, canvas.height);
    // lifeCounter.innerText = game.frogger.lives;
    // water.draw(c);
    // game.drawLane(c);
    // drawLilys(c);
    // game.frogger.hitByCar(game.laneLeft, game.laneRight);
    // game.frogger.onALog(game.logs, game.turtles, water);
    // game.frogger.onLilyPad(game.lilyArray, canvas);
    // game.frogger.die(canvas);
    // game.frogger.outOfBounds(canvas);
    // game.frogger.draw(c);
    // endGame();
    requestAnimationFrame(gameLoop);
  } else {
    lose();
  }
}

// function fillLeftLane() {
//   for (i = 0; i < 12; i++) {
//     if (i < 3) { //0, 1, 2
//       laneLeft.push(
//         new Vehicle(75 + i * 145, 466, 25, 20, .5, 'BlueViolet'));
//     } else if (i < 7) { // 3, 4, 5, 6 
//       laneLeft.push(
//         new Vehicle(20 + (i-3) * 105, 398, 25, 20, .8));
//     } else if (i < 12) { // 7,8,9,10,11
//       laneLeft.push(
//         new Vehicle(20 + (i-7) * 85, 330, 25, 20, 1, 'blue'));
//     }
//   }
// }

// function fillRightLane() {
//   for (var i = 0; i < 4; i++) {
//     if (i < 2) {
//       laneRight.push(
//         new Vehicle(20 + i * 200, 431, 50, 20, -.6, 'yellow'));
//     } else if (i < 4) {
//       laneRight.push(
//         new Vehicle(120 + (i - 2) * 200, 363, 50, 20, -.6, 'aqua'));
//     } 
//   }
// }

// function fillWaterLeft() {
//   for (var i = 0; i < 8; i++) {
//     if (i < 3) {
//       logsLeft.push(
//         new Log(20 + i * 145, 226, 65, 24, .6, 'Magenta'));
//     } else if (i < 5) {
//       logsLeft.push(
//         new Log(200 + (i-3) * 250, 192, 125, 24, 1.3, 'OrangeRed'));
//     } else if (i < 8) {
//       logsLeft.push(
//         new Log(20 + (i-5) * 150, 124, 75, 24, 1, 'DarkOrange'));
//     };
//   }
// }

// function fillWaterRight() {
//   for (i = 0; i < 6; i++) {
//     if (i < 3) {
//       turtlesRight.push(
//         new Turtle(20 + i * 155, 260, 75, 24, -.6, 'white'));
//     } else if (i < 6) {
//       turtlesRight.push(
//         new Turtle(200 + (i-3) * 140, 158, 50, 24, -1.3, 'gray'));
//     };
//   }
// }

// function newGame() {
//   fillLeftLane();
//   fillRightLane();
//   makeLilys();
//   fillWaterLeft();
//   fillWaterRight();
//   frogger.paused = false;
//   frogger.move(canvas);
//   requestAnimationFrame(gameLoop); 
// }

function reset() {
  game.frogger.respawn(canvas);
  clearLilys();
  game.frogger.deathClock = 81;
  game.frogger.lives = 3;
  game.frogger.gameOver = false;
}

function togglePause() {
  game.clickCount++;
  if ( game.clickCount % 2 !== 0 ) {
    game.frogger.paused = true;
  } else {
    game.frogger.paused = false;
    gameLoop();
  }
}

// function drawLane(c) {
//   game.laneLeft.forEach(function(car) {
//     car.draw(c);
//     car.drive(canvas);
//   });
//   game.laneRight.forEach(function(car) {
//     car.draw(c);
//     car.opposingDrive(canvas);
//   });
//   game.logs.forEach(function(log){
//     log.draw(c);
//     log.drive(canvas);
//   })
//   game.turtles.forEach(function(turtle){ 
//     turtle.draw(c);
//     turtle.opposingDrive(canvas);
//   })
// }


// function makeLilys() {
//   for (var i = 0; i < 5; i++) {
//     lilyArray.push(
//       new LilyPad((i * 85) + 10, 68, 40, 40));
//   }
// }

// function drawLilys(c) {
//   game.lilyArray.forEach(lily => lily.draw(c))
// }

// function endGame() {
//   if (win()) {
//     nextLevel();
//   } else if (gameOver()) {
//     gameOverBanner();
//   }
// }

// function win() {
//   var outputVal = false;
//   var landedPads = game.lilyArray.filter((lily) => {
//     return lily.color === 'lightgreen'
//   })
//   if (landedPads.length === 5) {
//     outputVal = true;
//   }
//   return outputVal;
// }

function nextLevel() {
    game.togglePause();
    setTimeout(function() {
      clearLilys();
      level++;
      levelDisplay.innerText = level;
      frogger.respawn(canvas);
      speedUp();
      togglePause();
    }, 3000)
}

// function gameOver() {
//   var outputVal = false;
//   if (game.frogger.gameOver === true) {
//     var outputVal = true;
//   }
//   return outputVal;
// }

function speedUp() {
  laneLeft.forEach( car => car.dx += .2);
  logsLeft.forEach( log => log.dx += .2);
  laneRight.forEach( car => car.dx -= .2);
  turtlesRight.forEach( turtle => turtle.dx -= .2);
}

function clearLilys() {
  lilyArray.forEach( lily => {
    lily.color = 'transparent';
    lily.landedOn = false;
  })
}

function lose() {
  var page = document.getElementById('game-container');
  var msgContainer = document.createElement('article');
  var msgP = document.createElement('p')
  var msgContent = document.createTextNode('GAME OVER!');
  msgContainer.id = 'game-over-screen';

  page.appendChild(msgContainer);
  msgContainer.appendChild(msgP);
  msgP.appendChild(msgContent);
  game.lifeCounter.innerText = 0
}

