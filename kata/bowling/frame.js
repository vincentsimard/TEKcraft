'use strict';

var Frame = (function() {
  function Frame() {
    this.rolls = [];
  }

  Frame.prototype.getNbKnockedPins = function() {
    if (this.rolls.length === 0) { return 0; }

    return this.rolls.reduce(function(a, b) { return a + b; });
  };

  return Frame;
})();

module.exports.Frame = Frame;