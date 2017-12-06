var Frog = require('./Frog.js');
var Vehicle = require('./Vehicle.js');
var Water = require('./Water.js');
var LilyPad = require('./LilyPad.js');
var Log = require('./Log.js');
var Turtle = require('./Turtle.js')

// Canvases -------------------------------

var background = new Image();

background.src = "https://i.imgur.com/sYZnHMe.jpg?1";

var canvas = document.getElementById('game');

var bg = document.getElementById('game-bg');

var c = canvas.getContext('2d');

var bgCtx = bg.getContext('2d');

background.onload = function() {
  bgCtx.drawImage(background, 0, 0);   
}

// On Screen Buttons ----------------------

var startButton = document.getElementById('start-button');
var pauseButton = document.getElementById('pause-button');
var newGameButton = document.getElementById('new-game-button');

// Event Listeners ------------------------

  // Buttons
startButton.addEventListener('click', newGame);
pauseButton.addEventListener('click', togglePause);
newGameButton.addEventListener('click', reload);

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

// On Screen Display ----------------------

var lifeCounter = document.querySelector('.lives-left');
var levelDisplay = document.querySelector('.current-level');






// Bodies On Screen -----------------------

var frogger = new Frog(canvas.width / 2 - 10, 500, 20, 20, 35, 34, 'lightgreen');

var water = new Water(0, 54, canvas.width, 228);

function fillLeftLane() {
  for (i = 0; i < 12; i++) {
    if (i < 3) {
      laneLeft.push(
        new Vehicle(75 + i * 145, 466, 25, 20, .5, 'BlueViolet'));
    } else if (i < 7) {
      laneLeft.push(
        new Vehicle(20 + (i-3) * 105, 398, 25, 20, .8));
    } else if (i < 12) {
      laneLeft.push(
        new Vehicle(20 + (i-7) * 85, 330, 25, 20, 1, 'blue'));
    }
  }
}

function fillRightLane() {
  for (var i = 0; i < 4; i++) {
    if (i < 2) {
      laneRight.push(
        new Vehicle(20 + i * 200, 431, 50, 20, -.6, 'yellow'));
    } else if (i < 4) {
      laneRight.push(
        new Vehicle(120 + (i - 2) * 200, 363, 50, 20, -.6, 'aqua'));
    } 
  }
}

function fillWaterLeft() {
  for (var i = 0; i < 8; i++) {
    if (i < 3) {
      logsLeft.push(
        new Log(20 + i * 145, 226, 65, 24, .6, 'Magenta'));
    } else if (i < 5) {
      logsLeft.push(
        new Log(200 + (i-3) * 250, 192, 125, 24, 1.3, 'OrangeRed'));
    } else if (i < 8) {
      logsLeft.push(
        new Log(20 + (i-5) * 150, 124, 75, 24, 1, 'DarkOrange'));
    }
  }
}

function fillWaterRight() {
  for (i = 0; i < 6; i++) {
    if (i < 3) {
      turtlesRight.push(
        new Turtle(20 + i * 155, 260, 75, 24, -.6, 'white'));
    } else if (i < 6) {
      turtlesRight.push(
        new Turtle(200 + (i-3) * 140, 158, 50, 24, -1.3, 'gray'));
    };
  }
}

function makeLilys() {
  for (var i = 0; i < 5; i++) {
    lilyArray.push(
      new LilyPad((i * 85) + 10, 68, 40, 40));
  }
}


// Game Functions -------------------------

function cheatCode(pressedButton) {
  if (pressedButton === 'w') {
    lilyArray.forEach( lily => {
      lily.color = 'lightgreen';
      lily.landedOn = true;
    })
  }
}

function reload() {
  window.location.reload(true)
}

function togglePause() {
  clickCount++;
  if ( clickCount % 2 !== 0 ) {
    paused = true;
  } else {
    paused = false;
    gameLoop();
  }
}


// Draw Functions -------------------------

function drawObjects(c) {
  water.draw(c);
  laneLeft.forEach(car => {
    car.draw(c);
    car.drive(canvas);
  });
  laneRight.forEach(car => {
    car.draw(c);
    car.opposingDrive(canvas);
  });
  logsLeft.forEach(log => {
    log.draw(c);
    log.drive(canvas);
  })
  turtlesRight.forEach(turtle => { 
    turtle.draw(c);
    turtle.opposingDrive(canvas);
  })
  lilyArray.forEach(lily => {
    lily.draw(c)
  })
  frogger.draw(c);
}



// Variables ------------------------------
var laneLeft = [];
var laneRight = [];
var lilyArray = [];
var logsLeft = [];
var turtlesRight = [];
var level = 1;
var clickCount = 0;



function gameLoop () {
  if (!paused && frogger.lives >= 0) {
    c.clearRect(0, 0, canvas.width, canvas.height);
    lifeCounter.innerText = frogger.lives;
    drawObjects(c);
    frogger.hitByCar(laneLeft, laneRight);
    frogger.floatOrSink(logsLeft, turtlesRight, water);
    frogger.onLilyPad(lilyArray);
    frogger.die();
    frogger.outOfBounds(canvas);
    checkWin();
    requestAnimationFrame(gameLoop);
  } else if (frogger.lives < 0) {
    lose();
    return 'Game Over'
  }
}

function newGame() {
  fillLeftLane();
  fillRightLane();
  makeLilys();
  fillWaterLeft();
  fillWaterRight();
  paused = false;
  requestAnimationFrame(gameLoop); 
}

function reset() {
  frogger.respawn(canvas);
  clearLilys();
  frogger.deathClock = 81;
  frogger.lives = 3;
}

function checkWin() {
  var landedPads = lilyArray.filter((lily) => {
    return lily.color === 'lightgreen'
  })
  if (landedPads.length === 5) {
    nextLevel()
  }
}

function nextLevel() {
  togglePause();
  setTimeout(function() {
    level++;
    levelDisplay.innerText = level;
    frogger.respawn(canvas);
    speedUp();
    clearLilys();
    togglePause();
  }, 3000)
}

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
  lifeCounter.innerText = 0;
}
