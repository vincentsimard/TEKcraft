'use strict';

var Frame = require('./frame').Frame;

var Game = {
  roll: function(pins) {
    if (arguments.length === 0) {
      throw new Error('No arguments passed');
    }

    if (isNaN(pins)) {
      throw new TypeError();
    }
  },
  score: function() {},
  frames: new Array(10)
};

module.exports.Game = Game;