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
var car2 = new Vehicle(100,430, 25, 20, 5);
var lane1 = [car, car, car, car];

function gameLoop () {
  c.clearRect(0, 0, canvas.width, canvas.height)
  lifeCounter.innerText = frogger.lives;
  water.draw(c);
  car.drawCar(c);
  car2.drawCar(c);
  car.drive(canvas);
  car2.opposingDrive(canvas)
  // frogger.hitByCar(canvas, car);
  frogger.onALog(canvas, car, water); // Need to change this to log
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

