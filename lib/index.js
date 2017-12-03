var Frog = require('./Frog.js');
var Vehicle = require('./Vehicle.js');
var Water = require('./Water.js');

var lifeCounter = document.querySelector('.lives-left');

var background = new Image();

background.src = "https://i.imgur.com/sYZnHMe.jpg?1";

var canvas = document.getElementById('game');

var bg = document.getElementById('game-bg');

var c = canvas.getContext('2d');

var bgCtx = bg.getContext('2d');

var frogger = new Frog(canvas.width / 2 - 10, 500, 20, 20, 35, 34, 'green');

var water = new Water(0, 54, canvas.width, 228);

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

function gameLoop () {
  if (frogger.paused === false) {
    c.clearRect(0, 0, canvas.width, canvas.height);
    lifeCounter.innerText = frogger.lives;
    water.draw(c);
    drawLane(c);
    // car.drive(canvas);
    // frogger.hitByCar(canvas);
    // frogger.onALog(canvas, car, water); // Need to change this to log
    frogger.die(canvas);
    frogger.outOfBounds(canvas);
    frogger.draw(c);
    requestAnimationFrame(gameLoop);
  } else {
    cancelAnimationFrame(gameLoop);
  }
}


function fillLeftLane() {
  for (i = 0; i < 15; i++) {
    if (i < 5) {
      laneLeft.push(new Vehicle(20 + i * 85, 465, 25, 20, .6, 'green'));
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
      laneRight.push(new Vehicle(20 + i * 200, 431, 50, 20, .6, 'yellow'));
    } else if (i < 4) {
      laneRight.push(new Vehicle(120 + (i-2) * 200, 363, 50, 20, .6, 'aqua'));
    } 
  };
};




function newGame() {
  fillLeftLane();
  fillRightLane();
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
}






