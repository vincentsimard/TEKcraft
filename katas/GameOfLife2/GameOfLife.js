(function () {
  'use strict';

  var _ = require('underscore');
  var Cell = require('./Cell').Cell;

  var GameOfLife = GameOfLife || {};

  GameOfLife = function(liveCells) {
    this.liveCells = liveCells || [];
  };

  GameOfLife.prototype.step = function() {
    var cells = [];
    var cell, neighbors;

    for (var i = 0; i < this.liveCells.length; i++) {
      cell = this.liveCells[i];
      neighbors = this.neighborsTo(cell.x, cell.y);

      if (neighbors === 2 || neighbors === 3) {
        cells.push(cell);
      }
    }

    this.liveCells = cells;
  };

  GameOfLife.prototype.neighborsTo = function(x, y) {
    var neighbors = [];
    var location;

    var minX = x - 1;
    var maxX = x + 1;
    var minY = y - 1;
    var maxY = y + 1;

    for (var i = minX; i <= maxX; i++) {
      for (var j = minY; j <= maxY; j++) {
        location = new Cell(i, j);

        if (this.liveCells.contains(location) && !location.isAt(x, y)) {
          neighbors.push(location);
        }
      }
    }

    return neighbors.length;
  };

  Array.prototype.contains = function(obj) {
    var result = false;

    for (var i = 0; i < this.length; i++) {
      result = result || _.isEqual(this[i], obj);
    }

    return result;
  };

  module.exports.GameOfLife = GameOfLife;
}());