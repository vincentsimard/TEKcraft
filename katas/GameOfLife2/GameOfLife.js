(function () {
  'use strict';

  var GameOfLife = GameOfLife || {};

  GameOfLife = function(liveCells) {
    this.liveCells = liveCells || [];
  };

  GameOfLife.prototype.step = function() {
    this.liveCells = [];
  };

  GameOfLife.prototype.neighborsTo = function(x, y) {

  };

  module.exports.GameOfLife = GameOfLife;
}());