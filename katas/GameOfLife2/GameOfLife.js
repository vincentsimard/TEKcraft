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
    var cell;

    for (var i = 0; i < this.liveCells.length; i++) {
      cell = this.liveCells[i];

      if (this.shouldSurvive(cell)) { cells.push(cell); }
    }

    this.liveCells = cells;
  };

  GameOfLife.prototype.shouldSurvive = function(cell) {
    var neighbors = this.neighborsTo(cell.x, cell.y);

    return neighbors === 2 || neighbors === 3;
  };

  GameOfLife.prototype.shouldBecomeAlive = function(location) {
    // var neighbors;

    // if (this.cellIsAliveAt(location)) { return false; }

    // neighbors = this.neighborsTo(location.x, location.y);

    // return neighbors === 3;
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

        if (this.cellIsAliveAt(location) && !location.isAt(x, y)) {
          neighbors.push(location);
        }
      }
    }

    return neighbors.length;
  };

  GameOfLife.prototype.cellIsAliveAt = function(location) {
    return this.liveCells.contains(location);
  };

  GameOfLife.prototype.minMax = function(dimension) {
    var values = [];
    var max, min;

    for (var i = 0; i < this.liveCells.length; i++) {
      values.push(this.liveCells[i][dimension]);
    }

    max = Math.max.apply(null, values);
    min = Math.min.apply(null, values);

    return [min, max];
  };

  GameOfLife.prototype.width = function() {
    var minMax = this.minMax('x');
    var min = minMax[0];
    var max = minMax[1];

    return this.liveCells.length <= 0 ? 0 : max - min + 1;
  };

  GameOfLife.prototype.height = function() {
    var minMax = this.minMax('y');
    var min = minMax[0];
    var max = minMax[1];

    return this.liveCells.length <= 0 ? 0 : max - min + 1;
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