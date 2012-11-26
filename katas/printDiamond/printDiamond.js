'use strict';

var printDiamond = function(char) {
  var alphabet,
      charPos,
      arrLen,
      lineLen,
      arr = [];

  if (arguments.length === 0) { return ''; }
  if (arguments.length > 1) { throw new Error(); }

  // Parse the char parameter as a string and convert to upperstring
  char = (char + '').toUpperCase();
  if (!isALetter(char)) { throw new TypeError(); }

  alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  charPos = alphabet.indexOf(char);
  arrLen = (charPos * 2) + 1;
  lineLen = arrLen;

  for (var i = 0; i < arrLen; i++) {
    arr.push(Array(lineLen + 1).join(' '));
  }

  return arr.join('\n');
};

function isALetter(str) {
  return !!str.match(/^[A-Za-z]$/);
}

module.exports.printDiamond = printDiamond;