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
    this.grid = setupGrid(gridDimensions[0], gridDimensions[1]);
  } else {
    this.grid = setupGrid(gridDimensions, gridDimensions);
  }
};

GameOfLife.prototype.step = function() {};



module.exports.GameOfLife = GameOfLife;