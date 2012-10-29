'use strict';

var Frame = require('./Frame').Frame;

var Game = (function() {
  function Game() {
    this.frames = [];

    var nbFrames = 10;

    while(nbFrames--) {
      this.frames.push(new Frame());
    }
  }

  Game.prototype.roll = function(pins) {
    if (arguments.length === 0) { throw new Error('No arguments passed'); }
    if (isNaN(pins)) { throw new TypeError(); }

    var currentFrameIndex = this.getCurrentFrameIndex() - 1;
    this.frames[currentFrameIndex].rolls.push(pins);

    // console.log(this.frames[currentFrameIndex].rolls);
  };
  
  Game.prototype.getScore = function() {
    var score = 0;

    for (var i = 0; i < this.frames.length; i++) {
      score += this.frames[i].getNbKnockedPins();
    }

    return score;
  };

  Game.prototype.getCurrentFrameIndex = function() {
    var frame;
    var frameIndex = 0;
    var nbRolls = 0;
    var nbKnockedPins = 0;

    for (var i = 0; i < this.frames.length; i++) {
      frame = this.frames[i];
      nbRolls = frame.rolls.length;

      if (nbRolls === 0) {
        frameIndex = i;
        break;
      }

      nbKnockedPins = frame.getNbKnockedPins();

      if (nbRolls < 2 && nbKnockedPins < 10) {
        frameIndex = i;
        break;
      }
    }

    return frameIndex + 1;
  };

  return Game;
})();

module.exports.Game = Game;