var Frog = require('./Frog.js');
var Vehicle = require('./Vehicle.js');
var Water = require('./Water.js');
var LilyPad = require('./LilyPad.js');
var Log = require('./Log.js');

var lifeCounter = document.querySelector('.lives-left');

var background = new Image();
background.src = "https://i.imgur.com/sYZnHMe.jpg?1";

var canvas = document.getElementById('game');

var bg = document.getElementById('game-bg');

var c = canvas.getContext('2d');

var bgCtx = bg.getContext('2d');

var frogger = new Frog(canvas.width / 2 - 10, 500, 20, 20, 35, 34, 'green');

var water = new Water(0, 54, canvas.width, 228);

// Water y value = 54 --- set to 260 if want to test water over cars.

var clickCount = 0;

var startButton = document.getElementById('start-button');

var resetButton = document.getElementById('reset-button');

var pauseButton = document.getElementById('pause-button');

startButton.addEventListener('click', newGame);
resetButton.addEventListener('click', reset);
pauseButton.addEventListener('click', e => togglePause(e));
window.addEventListener('keydown', e => {
  if (e.key === 'p') {
    togglePause(e);
  }
})

background.onload = function() {
  bgCtx.drawImage(background, 0, 0);   
}

var laneLeft = [];
var laneRight = [];
var lilyArray = [];
var logsLeft = [];
var logsRight = [];

function gameLoop () {
  if (frogger.paused === false) {
    c.clearRect(0, 0, canvas.width, canvas.height);
    lifeCounter.innerText = frogger.lives;
    water.draw(c);
    drawLane(c);
    drawLilys(c);
    frogger.hitByCar(laneLeft, laneRight);
    frogger.onALog(logsLeft, logsRight, water);
    frogger.onLilyPad(lilyArray, canvas);

    frogger.die(canvas);
    frogger.outOfBounds(canvas);
    frogger.draw(c);
    console.log()
    requestAnimationFrame(gameLoop);
  } else {
    cancelAnimationFrame(gameLoop);
  }
};

function fillLeftLane() {
  for (i = 0; i < 15; i++) {
    if (i < 5) {

      laneLeft.push(new Vehicle(20 + i * 85, 465, 25, 20, .6, 'BlueViolet'));
    } else if (i < 10) {
      laneLeft.push(new Vehicle(20 + (i-5) * 85, 396, 25, 20, .6));
    } else if (i < 15) {
      laneLeft.push(new Vehicle(20 + (i-10) * 85, 330, 25, 20, 1, 'blue'));
    }
  };
};

function fillRightLane() {
  for (i = 0; i < 4; i++) {
    if (i < 2) {
      laneRight.push(new Vehicle(20 + i * 200, 431, 50, 20, -.6, 'yellow'));
    } else if (i < 4) {
      laneRight.push(new Vehicle(120 + (i-2) * 200, 363, 50, 20, -.6, 'aqua'));
    } 
  };
};

function fillWaterLeft() {
    for (i = 0; i < 8; i++) {
    if (i < 3) {
      logsLeft.push(new Log(20 + i * 95, 260, 25, 20, 1, 'Magenta'));
    } else if (i < 5) {
      logsLeft.push(new Log(200 + (i-3) * 200, 236, 100, 20, .6, 'OrangeRed'));
    } else if (i < 8) {
      logsLeft.push(new Log(20 + (i-5) * 195, 160, 50, 20, 1, 'DarkOrange'));
    }
  };
  }

function newGame() {
  fillLeftLane();
  fillRightLane();
  makeLilys();
  fillWaterLeft();
  console.log(logsLeft)
  frogger.paused = false;
  frogger.move(canvas);
  requestAnimationFrame(gameLoop); 
}

function reset() {
  frogger.respawn(canvas);
  frogger.deathClock = 81;
  frogger.lives = 4;
}

function togglePause() {
  clickCount++;
  if ( clickCount % 2 !== 0 ) {
    frogger.paused = true;
  } else {
    frogger.paused = false;
    gameLoop();
  }
}

function drawLane(c) {
  laneLeft.forEach(function(car){
    car.draw(c);
    car.drive(canvas);
  });
  laneRight.forEach(function(car){
    car.draw(c);
    car.opposingDrive(canvas);
});
  logsLeft.forEach(function(log){
    log.draw(c);
    log.drive(canvas);
  })
}

function makeLilys() {
  for(i=0; i < 5; i++) {
    lilyArray.push(new LilyPad((i * 85) + 10, 68, 40, 40));
  }
}

function drawLilys(c) {
  lilyArray.forEach(lily => lily.draw(c))
}






