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
    var cell, neighbors;

    // if (this.liveCells.length > 0) {
    //   for (var i = 0; i < this.width; i++) {
    //     for (var j = 0; j < this.height; j++) {
    //       cell = [i, j];
    //       neighbors = this.neighborsTo(cell[0], cell[1]);

    //       if (this.liveCells.containsArray(cell)) {
    //         if (neighbors === 2 || neighbors === 3) {
    //           survivors.push(cell);
    //         }
    //       } else {
    //         if (neighbors === 3) {
    //           survivors.push(cell);
    //         }
    //       }
    //     }
    //   }
    // }

    for (var i = 0; i < this.liveCells.length; i++) {
      cell = this.liveCells[i];
      neighbors = this.neighborsTo(cell[0], cell[1]);

      if (neighbors === 2 || neighbors === 3) {
        survivors.push(cell);
      }
    }

    Grid.apply(grid, survivors);
    return grid;
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
}());