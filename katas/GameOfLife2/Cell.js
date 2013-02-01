(function() {
  'use strict';

  var Cell = Cell || {};

  Cell = function(x, y) {
    this.x = x;
    this.y = y;
  };

  Cell.prototype.isAt = function(x, y) {
    return this.x === x && this.y === y;
  };

  module.exports.Cell = Cell;
}());