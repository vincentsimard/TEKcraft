'use strict';

var printDiamond = function(char) {
  if (arguments.length === 0) { return ''; }
  if (arguments.length > 1) { throw new Error(); }

  // Parse the char parameter as a string and convert to upperstring
  char = (char + '').toUpperCase();
  if (char.length !== 1) { throw new TypeError(); }
  if (char.charCodeAt(0) < 65 || char.charCodeAt(0) > 90) { throw new TypeError(); }
};

module.exports.printDiamond = printDiamond;