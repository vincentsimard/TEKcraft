'use strict';

var Roll = (function() {
  function Roll(pins) {
    pins = pins || 0;

    if (isNaN(pins)) { throw new TypeError(); }
    if (pins < 0 || pins > 10) { throw new RangeError(); }

    this.pins = pins;
  }

  return Roll;
})();

module.exports.Roll = Roll;
