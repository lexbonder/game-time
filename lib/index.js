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

var car = new Vehicle(20, 465, 25, 20, .6);

var cars = [];

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

function gameLoop () {
  if (frogger.paused === false) {
    c.clearRect(0, 0, canvas.width, canvas.height);
    lifeCounter.innerText = frogger.lives;
    water.draw(c);
    car.drawCar(c);
    car.drive(canvas);
    frogger.hitByCar(canvas, car);
    // frogger.onALog(canvas, car, water); // Need to change this to log
    frogger.die(canvas);
    frogger.outOfBounds(canvas);
    frogger.draw(c);
    requestAnimationFrame(gameLoop);
  } else {
    cancelAnimationFrame(gameLoop);
  }
}

function newGame() {
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


// function carLoops () {
//   c.clearRect(0, 0, canvas.width, canvas.height);
// 	// car.drive(c);
// 	requestAnimationFrame(carLoops);
// }

// requestAnimationFrame(carLoops);

// c.beginPath();
// c.moveTo(50,50);
// c.arc(50,50,30,0,Math.PI * 2, true);
// c.fillStyle = 'green';
// c.fill();




// ROADS ------------------

// c.fillStyle = ('gray');
// c.fillRect(0,200,300,200);

// c.beginPath();
// c.setLineDash([10,10])
// c.moveTo(5,240);
// c.lineTo(400,240);
// c.moveTo(5,280);
// c.lineTo(400,280);
// c.moveTo(5,320);
// c.lineTo(400,320);
// c.moveTo(5,360);
// c.lineTo(400,360);
// c.stroke();