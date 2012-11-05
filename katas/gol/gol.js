'use strict';



function setupGrid(x, y) {
  var grid = new Array(x);

  for (var i = 0; i < grid.length; i++) {
    grid[i] = new Array(y);
  }

  return grid;
}



// Constructor
var GameOfLife = function(gridDimensions) {
  var x, y;

  // Parameters validation
  if (typeof gridDimensions !== 'undefined') {
    if (isNaN(gridDimensions)) {
      if (!(gridDimensions instanceof Array)) { throw new Error(); }
      if (isNaN(gridDimensions[0]) || isNaN(gridDimensions[1])) { throw new Error(); }
    }
  }

  // Default parameters values
  gridDimensions = gridDimensions || [8,8];

  // Grid setup
  if (isNaN(gridDimensions)) {
    x = gridDimensions[0];
    y = gridDimensions[1];
  } else {
    x = y = gridDimensions;
  }

  this.grid = setupGrid(x, y);
};

GameOfLife.prototype.step = function() {};

GameOfLife.prototype.print = function() {
  var output = '';

  for (var i = 0; i < this.grid.length; i++) {
    for (var j = 0; j < this.grid[i].length; j++) {
      output += !!this.grid[j][i] ? '*' : '.';
    }
    output += '\n';
  }

  return output;
};

GameOfLife.prototype.spawn = function(x, y) {
  if (x > this.grid.length && y > this.grid[0].length) { throw new RangeError(); }

  this.grid[x][y] = true;
};

GameOfLife.prototype.kill = function(x, y) {
  if (x > this.grid.length && y > this.grid[0].length) { throw new RangeError(); }
  
  this.grid[x][y] = false;
};



module.exports.GameOfLife = GameOfLife;