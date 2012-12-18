'use strict';

var Grid = function() {
  var args = Array.prototype.slice.call(arguments, 0);

  this.liveCells = args;
};

Grid.prototype.spawn = function() {
  return new Grid();
};

Grid.prototype.neighborsTo = function(x,y) {
  var neighbors = [];
  var dx, dy, sameCell;

  for (var i = 0; i < this.liveCells.length; i++) {
    dx = Math.abs(x-this.liveCells[i][0]);
    dy = Math.abs(y-this.liveCells[i][1]);
    sameCell = (dx + dy === 0);

    if (dx <= 1 && dy <= 1 && !sameCell) {
      neighbors.push(this.liveCells[i]);
    }
  }
  return neighbors.length;
};

module.exports.Grid = Grid;