(function () {
  'use strict';

  Array.prototype.containsArray = function(val) {
    var hash = {};
    for(var i=0; i < this.length; i++) {
      hash[this[i]] = i;
    }
    
    return hash.hasOwnProperty(val);
  };

  var Grid = function() {
    var args = Array.prototype.slice.call(arguments, 0);
    var dimensions = [[], []];

    this.liveCells = args;
    this.width = 0;
    this.height = 0;

    for (var i = 0; i < this.liveCells.length; i++) {
      dimensions[0].push(this.liveCells[i][0]);
      dimensions[1].push(this.liveCells[i][1]);
    }

    if (this.liveCells.length > 0) {
      this.maxX = Math.max.apply(null, dimensions[0]);
      this.minX = Math.min.apply(null, dimensions[0]);
      this.maxY = Math.max.apply(null, dimensions[1]);
      this.minY = Math.min.apply(null, dimensions[1]);

      this.width = this.maxX - this.minX + 1;
      this.height = this.maxY - this.minY + 1;
    }
  };

  Grid.prototype.spawn = function() {
    var grid = new Grid();
    var survivors = [];
    var cell;

    // Return empty grid if the grid is empty
    if (this.liveCells.length === 0) {
      Grid.apply(grid, survivors);
      return grid;
    }

    for (var i = 0; i < this.width; i++) {
      for (var j = 0; j < this.height; j++) {
        cell = [i, j];

        if (this.shouldSurvive(cell)) { survivors.push(cell); }
        if (this.shouldBecomeALiveCell(cell)) { survivors.push(cell); }
      }
    }

    Grid.apply(grid, survivors);
    return grid;
  };

  Grid.prototype.neighborsTo = function(x,y) {
    var cell;
    var neighbors = [];
    var dx, dy, sameCell;

    for (var i = 0; i < this.liveCells.length; i++) {
      cell = this.liveCells[i];
      dx = Math.abs(x-cell[0]);
      dy = Math.abs(y-cell[1]);
      sameCell = (dx + dy === 0);

      if (dx <= 1 && dy <= 1 && !sameCell) {
        neighbors.push(cell);
      }
    }

    return neighbors.length;
  };

  Grid.prototype.isAlive = function(cell) {
    return this.liveCells.containsArray(cell);
  };

  Grid.prototype.shouldSurvive = function(cell) {
    var survives = false;
    var neighbors;

    if (this.isAlive(cell)) {
      neighbors = this.neighborsTo(cell[0], cell[1]);
      survives = (neighbors === 2 || neighbors === 3);
    }

    return survives;
  };

  Grid.prototype.shouldBecomeALiveCell = function(cell) {
    var survives = false;
    var neighbors;

    if (!this.isAlive(cell)) {
      neighbors = this.neighborsTo(cell[0], cell[1]);
      survives = (neighbors === 3);
    }

    return survives;
  };

  module.exports.Grid = Grid;
}());