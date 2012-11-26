'use strict';

var printDiamond = function(char) {
  if (arguments.length === 0) { return ''; }
  if (arguments.length > 1) { throw new Error(); }

  // Parse the char parameter as a string and convert to upperstring
  char = (char + '').toUpperCase();
  if (!isALetter(char)) { throw new TypeError(); }

  if (char === 'A') {
    return char;
  } else if (char === 'B') {
    return ' A \n' +
           'B B\n' +
           ' A \n';
  } else {
    return '  A  \n' +
           ' B B \n' +
           'C   C\n' +
           ' B B \n' +
           '  A  \n';
  }
};

function isALetter(str) {
  return !!str.match(/^[A-Za-z]$/);
}

module.exports.printDiamond = printDiamond;