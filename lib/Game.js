const Frog = require('./Frog.js');
const Vehicle = require('./Vehicle.js');
const Water = require('./Water.js');
const LilyPad = require('./LilyPad.js');
const WaterObject = require('./WaterObject.js');

class Game {
  constructor(canvas) {
    this.water = new Water(0, 54, canvas.width, 228, 'transparent');
    this.frogger =
      new Frog(canvas.width / 2 - 10, 500, 20, 20, '#A3C544', 35, 34);
    this.laneLeft = [];
    this.laneRight = [];
    this.lilyArray = [];
    this.logs = [];
    this.turtles = [];
    this.clickCount = 0;
    this.paused = false;
    this.level = 1
  }

  fillLeftLane() {
    for (let i = 0; i < 12; i++) {
      if (i < 3) { 
        this.laneLeft.push(
          new Vehicle(75 + i * 145, 466, 25, 20, .5, '#FADD69'));
      } else if (i < 7) { 
        this.laneLeft.push(
          new Vehicle(20 + (i - 3) * 105, 398, 25, 20, .8, '#A4359F'));
      } else if (i < 12) { 
        this.laneLeft.push(
          new Vehicle(20 + (i - 7) * 85, 330, 25, 20, 1, '#EC5EE6'));
      }
    }
  }

  fillRightLane() {
    for (let i = 0; i < 4; i++) {
      if (i < 2) {
        this.laneRight.push(
          new Vehicle(20 + i * 200, 431, 50, 20, -.6, '#61C9BC'));
      } else if (i < 4) {
        this.laneRight.push(
          new Vehicle(120 + (i - 2) * 200, 363, 50, 20, -.6, '#57AFA6'));
      } 
    }
  }

  fillWaterLeft() {
    for (let i = 0; i < 8; i++) {
      if (i < 3) {
        this.logs.push(
          new WaterObject(20 + i * 145, 226, 65, 24, .6, '#6B3F21'));
      } else if (i < 5) {
        this.logs.push(
          new WaterObject(200 + (i - 3) * 250, 192, 125, 24, 1.3, '#6B3F21'));
      } else if (i < 8) {
        this.logs.push(
          new WaterObject(20 + (i - 5) * 150, 124, 75, 24, 1, '#6B3F21'));
      }
    }
  }

  fillWaterRight() {
    for (let i = 0; i < 6; i++) {
      if (i < 3) {
        this.turtles.push(
          new WaterObject(20 + i * 155, 260, 75, 24, -.6, '#439D82'));
      } else if (i < 6) {
        this.turtles.push(
          new WaterObject(200 + (i - 3) * 140, 158, 50, 24, -1.3, '#439D82'));
      }
    }
  }
  
  makeLilys() {
    for (let i = 0; i < 5; i++) {
      this.lilyArray.push(
        new LilyPad((i * 85) + 10, 68, 40, 40, 'transparent'));
    }
  }

  newGame() {
    this.fillLeftLane();
    this.fillRightLane();
    this.makeLilys();
    this.fillWaterLeft();
    this.fillWaterRight();
    this.paused = false;
  }

  drawObjects(c, canvas) {
    this.water.draw(c);
    this.laneLeft.forEach(car => {
      car.draw(c);
      car.drive(canvas.width);
    });
    this.laneRight.forEach(car => {
      car.draw(c);
      car.opposingDrive(canvas.width);
    });
    this.logs.forEach(log => {
      log.draw(c);
      log.drive(canvas.width);
    })
    this.turtles.forEach(turtle => { 
      turtle.draw(c);
      turtle.opposingDrive(canvas.width);
    })
    this.lilyArray.forEach(lily => {
      lily.draw(c)
    })
    this.frogger.draw(c);
  }

  animate(lifeCounter, c, canvas) {
    c.clearRect(0, 0, canvas.width, canvas.height);
    lifeCounter.innerText = this.frogger.lives;
    this.water.draw(c);
    this.drawObjects(c, canvas);
    this.frogger.hitByCar(this.laneLeft, this.laneRight);
    this.frogger.floatOrSink(this.logs, this.turtles, this.water);
    this.frogger.onLilyPad(this.lilyArray, canvas.width);
    this.frogger.die(canvas);
    this.frogger.outOfBounds(canvas.width);
  }

  reset() {
    this.frogger.respawn();
    this.clearLilys();
    this.frogger.deathClock = 81;
    this.frogger.lives = 3;
  }

  speedUp() {
    this.laneLeft.forEach( car => car.dx += .2);
    this.logs.forEach( log => log.dx += .2);
    this.laneRight.forEach( car => car.dx -= .2);
    this.turtles.forEach( turtle => turtle.dx -= .2);
  }

  clearLilys() {
    this.lilyArray.forEach( lily => {
      lily.color = 'transparent';
      lily.landedOn = false;
    })
  }
}

module.exports = Game;