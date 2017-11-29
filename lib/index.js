var Frog = require('./Frog.js')
var Vehicle = require('./Vehicle.js')
var Water = require('./Water.js')

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

function gameLoop () {
  c.clearRect(0, 0, canvas.width, canvas.height)
  water.draw(c);
  // car.drawCar(c);
  car.drive();
  // frogger.hitByCar(canvas, car);
  frogger.onALog(canvas, car, water); // Need to change this to log
  frogger.outOfBounds(canvas);
  frogger.draw(c);
  requestAnimationFrame(gameLoop);
}
frogger.move(canvas)

requestAnimationFrame(gameLoop);

background.onload = function(){
    bgCtx.drawImage(background,0,0);   
}


var last = 0; 
function render(now) {

    if(!last || now - last >= 2*1000) {
        last = now;
        car.drawCar(c);
    } 
    car.drive(c);
    requestAnimationFrame(render);
}

// function carLoops () {
// 	car.drive(c);
// 	requestAnimationFrame(carLoops);
// }

// requestAnimationFrame(carLoops);
requestAnimationFrame(render);



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