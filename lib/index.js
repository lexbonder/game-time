var Frog = require('./Frog.js')
var Vehicle = require('./Vehicle.js')
var Water = require('./Water.js')

var lifeCounter = document.querySelector('.lives-left');

var background = new Image();

background.src = "https://i.imgur.com/sYZnHMe.jpg?1";

var canvas = document.getElementById('game');
var bg = document.getElementById('game-bg');
var c = canvas.getContext('2d');
var bgCtx = bg.getContext('2d');

background.onload = function() {
  bgCtx.drawImage(background, 0, 0);   
}

var frogger = new Frog(canvas.width / 2 - 10, 500, 20, 20, 35, 34, 'green');
var water = new Water(0, 54, canvas.width, 228)
var car = new Vehicle(20, 465, 25, 20, .6);
var laneLeft = [];
var laneRight = [];

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


fillLeftLane();
fillRightLane();

function gameLoop () {
  c.clearRect(0, 0, canvas.width, canvas.height)
  lifeCounter.innerText = frogger.lives;
  water.draw(c);
  drawLane(c);
  frogger.hitByCar(canvas, car);
  // frogger.onALog(canvas, car, water); // Need to change this to log
  frogger.outOfBounds(canvas);
  frogger.draw(c);
  requestAnimationFrame(gameLoop);
}

document.getElementById('start-button').addEventListener('click', (e) => {
  e.preventDefault();
  frogger.move(canvas)
  requestAnimationFrame(gameLoop);
})

document.getElementById('reset-button').addEventListener('click', (e) => {
  e.preventDefault();
  frogger.lives = 3;
  frogger.respawn(canvas);
})

background.onload = function(){
    bgCtx.drawImage(background,0,0);   
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






