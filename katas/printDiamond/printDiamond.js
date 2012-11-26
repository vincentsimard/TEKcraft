'use strict';

var printDiamond = function(char) {
  if (arguments.length === 0) { return ''; }
  if (arguments.length > 1) { throw new Error(); }

  // Parse the char parameter as a string and convert to upperstring
  char = (char + '').toUpperCase();
  if (!isALetter(char)) { throw new TypeError(); }
};

function isALetter(str) {
  return !!str.match(/^[A-Za-z]$/);
}

module.exports.printDiamond = printDiamond;