/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);

	var levelDisplay = document.querySelector('.current-level');

	var lifeCounter = document.querySelector('.lives-left');

	var canvas = document.getElementById('game');

	var bg = document.getElementById('game-bg');

	var c = canvas.getContext('2d');

	const game = new Game(canvas, c);

	var bgCtx = bg.getContext('2d');

	var startButton = document.getElementById('start-button');

	var pauseButton = document.getElementById('pause-button');

	var newGameButton = document.getElementById('new-game-button');

	window.addEventListener('keydown', function (pressedButton) {
	  if (!game.paused) {
	    game.frogger.move(canvas.width, pressedButton.key);
	  }
	  if (pressedButton.key === 'p') {
	    togglePause();
	  }
	  if (pressedButton.key === 'w') {
	    cheatCode(pressedButton.key);
	  }
	});

	startButton.addEventListener('click', e => {
	  startButton.setAttribute('disabled', true);
	  startButton.classList.add('start-btn-disabled');
	  game.newGame(e);
	  gameLoop();
	});

	pauseButton.addEventListener('click', e => togglePause(e));

	newGameButton.addEventListener('click', reload);

	background.onload = function () {
	  bgCtx.drawImage(background, 0, 0);
	};

	function cheatCode(pressedButton) {
	  if (pressedButton === 'w') {
	    game.lilyArray.forEach(lily => {
	      lily.color = '#A3C544';
	      lily.landedOn = true;
	    });
	  }
	}

	function reload() {
	  window.location.reload(true);
	}

	function gameLoop() {
	  if (!game.paused && game.frogger.lives >= 0) {
	    game.animate(lifeCounter, c, canvas);
	    nextLevel();
	    requestAnimationFrame(gameLoop);
	  } else if (game.frogger.lives < 0) {
	    lose();
	  }
	}

	function togglePause() {
	  game.clickCount++;
	  if (game.clickCount % 2 !== 0) {
	    game.paused = true;
	  } else {
	    game.paused = false;
	    gameLoop();
	  }
	}

	function nextLevel() {
	  var landedPads = game.lilyArray.filter(lily => {
	    return lily.color === '#A3C544';
	  });

	  if (landedPads.length === 5) {
	    togglePause();
	    setTimeout(function () {
	      game.level++;
	      levelDisplay.innerText = game.level;
	      game.frogger.respawn(canvas);
	      game.speedUp();
	      game.clearLilys();
	      togglePause();
	    }, 3000);
	  }
	}

	function lose() {
	  c.fillStyle = "#000000";
	  c.fillRect(0, 255, 400, 55);
	  c.font = 'bold 48px serif';
	  c.fillStyle = "rgba(255, 0, 0, 1)";
	  c.fillText('GAME OVER', 60, 300);
	  return 'Game Over';
	}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	const Frog = __webpack_require__(2);
	const Vehicle = __webpack_require__(4);
	const Water = __webpack_require__(5);
	const LilyPad = __webpack_require__(6);
	const WaterObject = __webpack_require__(7);

	class Game {
	  constructor(canvas) {
	    this.water = new Water(0, 54, canvas.width, 228, 'transparent');
	    this.frogger = new Frog(canvas.width / 2 - 10, 500, 20, 20, '#A3C544', 35, 34);
	    this.laneLeft = [];
	    this.laneRight = [];
	    this.lilyArray = [];
	    this.logs = [];
	    this.turtles = [];
	    this.clickCount = 0;
	    this.paused = false;
	    this.level = 1;
	  }

	  fillLeftLane() {
	    for (let i = 0; i < 12; i++) {
	      if (i < 3) {
	        this.laneLeft.push(new Vehicle(75 + i * 145, 466, 25, 20, .5, '#FADD69'));
	      } else if (i < 7) {
	        this.laneLeft.push(new Vehicle(20 + (i - 3) * 105, 398, 25, 20, .8, '#A4359F'));
	      } else if (i < 12) {
	        this.laneLeft.push(new Vehicle(20 + (i - 7) * 85, 330, 25, 20, 1, '#EC5EE6'));
	      }
	    }
	  }

	  fillRightLane() {
	    for (let i = 0; i < 4; i++) {
	      if (i < 2) {
	        this.laneRight.push(new Vehicle(20 + i * 200, 431, 50, 20, -.6, '#61C9BC'));
	      } else if (i < 4) {
	        this.laneRight.push(new Vehicle(120 + (i - 2) * 200, 363, 50, 20, -.6, '#57AFA6'));
	      }
	    }
	  }

	  fillWaterLeft() {
	    for (let i = 0; i < 8; i++) {
	      if (i < 3) {
	        this.logs.push(new WaterObject(20 + i * 145, 226, 65, 24, .6, '#6B3F21'));
	      } else if (i < 5) {
	        this.logs.push(new WaterObject(200 + (i - 3) * 250, 192, 125, 24, 1.3, '#6B3F21'));
	      } else if (i < 8) {
	        this.logs.push(new WaterObject(20 + (i - 5) * 150, 124, 75, 24, 1, '#6B3F21'));
	      }
	    }
	  }

	  fillWaterRight() {
	    for (let i = 0; i < 6; i++) {
	      if (i < 3) {
	        this.turtles.push(new WaterObject(20 + i * 155, 260, 75, 24, -.6, '#439D82'));
	      } else if (i < 6) {
	        this.turtles.push(new WaterObject(200 + (i - 3) * 140, 158, 50, 24, -1.3, '#439D82'));
	      }
	    }
	  }

	  makeLilys() {
	    for (let i = 0; i < 5; i++) {
	      this.lilyArray.push(new LilyPad(i * 85 + 10, 68, 40, 40, 'transparent'));
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
	    });
	    this.turtles.forEach(turtle => {
	      turtle.draw(c);
	      turtle.opposingDrive(canvas.width);
	    });
	    this.lilyArray.forEach(lily => {
	      lily.draw(c);
	    });
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
	    this.frogger.respawn(canvas.height);
	    this.clearLilys();
	    this.frogger.deathClock = 81;
	    this.frogger.lives = 3;
	  }

	  speedUp() {
	    this.laneLeft.forEach(car => car.dx += .2);
	    this.logs.forEach(log => log.dx += .2);
	    this.laneRight.forEach(car => car.dx -= .2);
	    this.turtles.forEach(turtle => turtle.dx -= .2);
	  }

	  clearLilys() {
	    this.lilyArray.forEach(lily => {
	      lily.color = 'transparent';
	      lily.landedOn = false;
	    });
	  }
	}

	module.exports = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	const GamePiece = __webpack_require__(3);

	class Frog extends GamePiece {
	  constructor(x, y, width, height, color, dx, dy) {
	    super(x, y, width, height, color);
	    this.dx = dx;
	    this.dy = dy;
	    this.isAlive = true;
	    this.lives = 3;
	    this.deathClock = 0;
	  }

	  draw(c) {
	    c.fillStyle = this.color;
	    c.fillRect(this.x, this.y, this.width, this.height);
	    return this;
	  }

	  move(canvas, pressedButton) {
	    if (this.isAlive) {
	      this.deathClock = 0;
	      if (pressedButton === 'ArrowLeft' && this.x - this.width * 1.5 > 0) {
	        this.jump('left');
	      } else if (pressedButton === 'ArrowRight' && this.x + this.width * 2.5 < canvas) {
	        this.jump('right');
	      } else if (pressedButton === 'ArrowUp' && this.y >= 126) {
	        this.jump('up');
	      } else if (pressedButton === 'ArrowDown' && this.y < 500) {
	        this.jump('down');
	      }
	    }
	  }

	  jump(direction) {
	    switch (direction) {
	      case 'left':
	        this.x -= this.dx;
	        break;
	      case 'right':
	        this.x += this.dx;
	        break;
	      case 'up':
	        this.y -= this.dy;
	        break;
	      case 'down':
	        this.y += this.dy;
	        break;
	    }
	  }

	  hitByCar(laneLeft, laneRight) {
	    var allCars = [...laneLeft, ...laneRight];

	    allCars.forEach(car => {
	      if ((this.x < car.x + car.width && this.x + this.width > car.x && this.y < car.y + car.height && this.height + this.y > car.y) === true) {
	        return this.isAlive = false;
	      }
	    });
	  }

	  floatOrSink(logs, turtles, water) {
	    var allLogs = [...logs, ...turtles];

	    if (!this.isOnLog(allLogs) && this.isInWater(water)) {
	      this.isAlive = false;
	    }
	  }

	  isOnLog(allLogs) {
	    let onALog = false;

	    allLogs.forEach(log => {
	      if (this.x < log.x + log.width - this.width / 2 && this.x + this.width / 2 > log.x && this.y < log.y + log.height && this.height + this.y > log.y) {
	        onALog = true;
	        this.x += log.dx;
	      }
	    });
	    return onALog;
	  }

	  isInWater(water) {
	    return this.x < water.x + water.width - this.width / 2 && this.x + this.width / 2 > water.x && this.y < water.y + water.height && this.height + this.y > water.y;
	  }

	  onLilyPad(lilyArray) {
	    if (this.landedOnPad(lilyArray)) {
	      this.respawn();
	    }
	  }

	  landedOnPad(lilyArray) {
	    let onLilyPad = false;

	    lilyArray.forEach(lilyPad => {
	      if ((this.x < lilyPad.x + lilyPad.width && this.x + this.width > lilyPad.x && this.y < lilyPad.y + lilyPad.height && this.height + this.y > lilyPad.y) === true && lilyPad.color !== '#A3C544') {
	        onLilyPad = true;
	        lilyPad.landedOn = true;
	        lilyPad.color = '#A3C544';
	      }
	    });
	    return onLilyPad;
	  }

	  outOfBounds(canvas) {
	    if (this.x + this.width > canvas.width + this.width / 2 || this.x + this.width / 2 < 0) {
	      this.isAlive = false;
	    }
	  }

	  die() {
	    if (this.isAlive === false) {
	      this.color = 'red';
	      this.deathClock++;

	      if (this.deathClock < 80) {

	        for (let i = 0; i < 4; i++) {
	          let start = i * 20;
	          let end = start + 20;

	          if (this.deathClock >= start && this.deathClock < end) {
	            let opacity = 1 - i * 0.2;

	            this.color = 'rgba(255, 0, 0, ' + opacity + ')';
	            break;
	          }
	        }
	      } else {
	        this.lives--;
	        this.deathClock = 0;
	        this.respawn();
	      }
	    }
	  }

	  respawn() {
	    var frogStartPoint = { x: 190, y: 500 };

	    if (this.lives >= 0) {
	      this.x = frogStartPoint.x;
	      this.y = frogStartPoint.y;
	      this.isAlive = true;
	      this.color = '#A3C544';
	    }
	  }
	}

	module.exports = Frog;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	class GamePiece {
	  constructor(x, y, width, height, color) {
	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	    this.color = color;
	  }
	}

	module.exports = GamePiece;

	// 4. Make sure tests cover all class properties

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	const GamePiece = __webpack_require__(3);

	class Vehicle extends GamePiece {
	  constructor(x, y, width, height, dx, color) {
	    super(x, y, width, height, color);
	    this.dx = dx;
	  }

	  draw(c) {
	    c.fillStyle = this.color;
	    c.fillRect(this.x, this.y, this.width, this.height);
	  }

	  drive(canvas) {
	    if (this.x > canvas) {
	      this.x = 0 - this.width;
	    }
	    this.x += this.dx;
	  }

	  opposingDrive(canvas) {
	    if (this.x + this.width < 0) {
	      this.x = canvas;
	    }
	    this.x += this.dx;
	  }
	}

	module.exports = Vehicle;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	const GamePiece = __webpack_require__(3);

	class Water extends GamePiece {
	  constructor(x, y, width, height, color) {
	    super(x, y, width, height, color);
	  }

	  draw(c) {
	    c.fillStyle = this.color;
	    c.fillRect(this.x, this.y, this.width, this.height);
	    return this;
	  }
	}

	module.exports = Water;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	const GamePiece = __webpack_require__(3);

	class LilyPad extends GamePiece {
	  constructor(x, y, width, height, color) {
	    super(x, y, width, height, color);
	    this.landedOn = false;
	  }

	  draw(c) {
	    if (this.landedOn === true) {
	      this.color = '#A3C544';
	    }
	    c.fillStyle = this.color;
	    c.fillRect(this.x, this.y, this.width, this.height);
	  }
	}

	module.exports = LilyPad;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var Vehicle = __webpack_require__(4);

	class WaterObject extends Vehicle {
	  constructor(x, y, width, height, color, dx) {
	    super(x, y, width, height, color, dx);
	  }
	}

	module.exports = WaterObject;

/***/ })
/******/ ]);