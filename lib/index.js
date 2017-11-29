var background = new Image();
background.src = "https://i.imgur.com/sYZnHMe.jpg?1";



var Frog = require('./Frog.js')
var Vehicle = require('./Vehicle.js')

var canvas = document.getElementById('game');
var bg = document.getElementById('game-bg');
var c = canvas.getContext('2d');
var bgCtx = bg.getContext('2d');


var car = new Vehicle(20,464, 25, 20, 1);


background.onload = function(){
    bgCtx.drawImage(background,0,0);   
}

function carLoops () {
	c.clearRect(0, 0, canvas.width, canvas.height);
	car.drawCar(c);
	// car.drive(c);
	requestAnimationFrame(carLoops);
}

requestAnimationFrame(carLoops);

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