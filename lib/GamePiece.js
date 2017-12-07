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

// 1. Refactor classes to use inheritance
//   * Make an abstract parent class that takes in x, y, width, height
//   * Use the abstract parent in the rest of the classes
//   * Pass the correct parameters into the super in the constructor

// 2. Pull out all instances of the dom (document, window, canvas, etc)
// from classes and put in index. Use parameters to pass the relevant info into the classes
// (canvasWidth, context, etc).



// 4. Make sure tests cover all class properties
 




// 3. Turn Turtle and Log classes into a single WaterObstacle class; in Game.js, pass in unique parameters into WaterObstacle class to create your logs and turtle