var Frog = require('./Frog.js');
var Vehicle = require('./Vehicle.js');
var Water = require('./Water.js');
var LilyPad = require('./LilyPad.js');
var Log = require('./Log.js');
var Turtle = require('./Turtle.js');


class Game {
  constructor(canvas, c){
    this.canvas = document.getElementById('game');
    this.c = canvas.getContext('2d');
    this.water = new Water(0, 54, canvas.width, 228);
    this.frogger = new Frog(canvas.width / 2 - 10, 500, 20, 20, 35, 34, 'lightgreen');
    this.lifeCounter = document.querySelector('.lives-left');
    this.laneLeft = [];
    this.laneRight = [];
    this.lilyArray = [];
    this.logs = [];
    this.turtles = [];
    this.clickCount = 0;
  }

  fillLeftLane() {
    for (let i = 0; i < 12; i++) {
      if (i < 3) { 
        this.laneLeft.push(
          new Vehicle(75 + i * 145, 466, 25, 20, .5, 'BlueViolet'));
      } else if (i < 7) { 
        this.laneLeft.push(
          new Vehicle(20 + (i-3) * 105, 398, 25, 20, .8));
      } else if (i < 12) { 
        this.laneLeft.push(
          new Vehicle(20 + (i-7) * 85, 330, 25, 20, 1, 'blue'));
      }
    }
  };

  fillRightLane() {
  for (let i = 0; i < 4; i++) {
    if (i < 2) {
      this.laneRight.push(
        new Vehicle(20 + i * 200, 431, 50, 20, -.6, 'yellow'));
    } else if (i < 4) {
      this.laneRight.push(
        new Vehicle(120 + (i - 2) * 200, 363, 50, 20, -.6, 'aqua'));
    } 
  }
};

  fillWaterLeft() {
    for (let i = 0; i < 8; i++) {
      if (i < 3) {
        this.logs.push(
          new Log(20 + i * 145, 226, 65, 24, .6, 'Magenta'));
      } else if (i < 5) {
        this.logs.push(
          new Log(200 + (i-3) * 250, 192, 125, 24, 1.3, 'OrangeRed'));
      } else if (i < 8) {
        this.logs.push(
          new Log(20 + (i-5) * 150, 124, 75, 24, 1, 'DarkOrange'));
      };
    }
  };

  fillWaterRight() {
    for (let i = 0; i < 6; i++) {
      if (i < 3) {
        this.turtles.push(
          new Turtle(20 + i * 155, 260, 75, 24, -.6, 'white'));
      } else if (i < 6) {
        this.turtles.push(
          new Turtle(200 + (i-3) * 140, 158, 50, 24, -1.3, 'gray'));
      };
    }
  }
  
  makeLilys() {
  for (let i = 0; i < 5; i++) {
    this.lilyArray.push(
      new LilyPad((i * 85) + 10, 68, 40, 40));
  }
};

  newGame() {
    let frogger = new Frog(this.canvas.width / 2 - 10, 500, 20, 20, 35, 34, 'lightgreen');
    this.fillLeftLane();
    this.fillRightLane();
    this.makeLilys();
    this.fillWaterLeft();
    this.fillWaterRight();
    frogger.paused = false;
  };

  drawObjects(c) {
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

  animate() {
    this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.lifeCounter.innerText = this.frogger.lives;
    this.water.draw(this.c);
    this.drawLane(this.c);
    // drawLilys(this.c);
    this.frogger.hitByCar(this.laneLeft, this.laneRight);
    this.frogger.onALog(this.logs, this.turtles, this.water);
    this.frogger.onLilyPad(this.lilyArray, this.canvas);
    this.frogger.die(this.canvas);
    this.frogger.outOfBounds(this.canvas);
    this.frogger.draw(this.c);
    this.endGame();
  };

  // togglePause() {
  //   this.clickCount++;
  //   console.log(this.clickCount);
  //   if ( this.clickCount % 2 !== 0 ) {
  //     this.frogger.paused = true;
  //   } else {
  //     this.frogger.paused = false;
  //     // this.animate();
  //   }
  // };

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

};

module.exports = Game;