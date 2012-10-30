'use strict';

var Frame = require('./Frame').Frame;

var Game = (function() {
  function Game() {
    var args = Array.prototype.slice.call(arguments, 0);
    var nbFrames = 10;

    this.frames = [];

    // Initialize with 10 empty frames
    while(nbFrames--) {
      this.frames.push(new Frame());
    }

    // If frames where passed as arguments, add them to the game object
    for (var i = 0; i < arguments.length; i++) {
      this.frames[i].rolls = args[i];
    }
  }

  Game.prototype.roll = function(pins) {
    if (arguments.length === 0) { throw new Error('No arguments passed'); }
    if (isNaN(pins)) { throw new TypeError(); }

    var currentFrameIndex = this.getCurrentFrameIndex() - 1;

    this.frames[currentFrameIndex].rolls.push(pins);
  };
  
  Game.prototype.getScore = function() {
    var score = 0;
    var nextRolls = [];

    for (var i = 0; i < this.frames.length; i++) {
      // Get rolls from next two frames
      for (var j = 1; j <= 2; j++) {
        if (typeof this.frames[i + j] !== 'undefined') {
          nextRolls.concat(this.frames[i + j].rolls);
        }
      }

      score += this.frames[i].getScore(nextRolls);
    }

    return score;
  };

  Game.prototype.getCurrentFrameIndex = function() {
    var frame;
    var frameIndex = 0;
    var nbRolls = 0;

    for (var i = 0; i < this.frames.length; i++) {
      frame = this.frames[i];
      nbRolls = frame.rolls.length;

      if (nbRolls === 0) {
        frameIndex = i;
        break;
      }

      if (i < 9) {
        if (nbRolls < 2 && !frame.isStrike()) {
          frameIndex = i;
          break;
        }
      } else {
        frameIndex = 8;
        break;
      }
    }

    return frameIndex + 1;
  };

  return Game;
})();

module.exports.Game = Game;