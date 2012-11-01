'use strict';

var Frame = (function() {
  function Frame() {
    var args = Array.prototype.slice.call(arguments, 0);

    this.rolls = arguments.length > 0 ? args : [];
  }

  Frame.prototype.getScore = function(nextRolls) {
    var score = this.getNbKnockedPins();

    nextRolls = nextRolls || [];

    if (this.isStrike()) {
      score += nextRolls[0] || 0;
      score += nextRolls[1] || 0;
    } else if (this.isSpare()) {
      score += nextRolls[0] || 0;
    }

    return score;
  };

  Frame.prototype.getNbKnockedPins = function() {
    if (this.rolls.length === 0) { return 0; }

    return this.rolls.reduce(function(a, b) { return a + b; });
  };

  Frame.prototype.isStrike = function() {
    return (this.getNbKnockedPins() === 10 && this.rolls.length === 1);
  };

  Frame.prototype.isSpare = function() {
    return (this.getNbKnockedPins() === 10 && this.rolls.length === 2);
  };

  return Frame;
})();

module.exports.Frame = Frame;