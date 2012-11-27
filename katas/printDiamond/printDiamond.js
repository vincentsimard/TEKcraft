'use strict';

var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

var printDiamond = function(char) {
  var arr = [];

  if (arguments.length === 0) { return ''; }
  if (arguments.length > 1) { throw new Error(); }

  // Parse the char parameter as a string and convert to upperstring
  char = (char + '').toUpperCase();
  if (!isALetter(char)) { throw new TypeError(); }

  arr = buildArray(char);

  return arr.join('\n');
};



function buildArray(char) {
  var charPos = ALPHABET.indexOf(char),
      arrLen = (charPos * 2) + 1,
      lineLen = arrLen,
      arr = [];

  arr = createDefaultArray(arrLen, lineLen);

  // Top part of the diamond
  for (var i = 0; i <= charPos; i++) {
    arr[i] = createLine(i, charPos, arr[i]);
  }

  // Create the lower half part of the diamond
  for (var i = (charPos + 1); i < arrLen; i++) {
    arr[i] = arr[arrLen - 1 - i];
  }

  return arr;
}



// Builds an array with spaces only of the proper length/size
function createDefaultArray(arrLen, lineLen) {
  var arr = [];

  for (var i = 0; i < arrLen; i++) {
    arr.push(Array(lineLen + 1).join(' '));
  }

  return arr;
}



function createLine(lineNumber, charPos, emptyLine) {
  var ret = emptyLine,
      tmpChar,
      tmpCharPos;

  tmpChar = ALPHABET.charAt(lineNumber);
  tmpCharPos = ALPHABET.indexOf(tmpChar);
  ret = ret.substr(0, charPos - tmpCharPos) + tmpChar + ret.substr(charPos - tmpCharPos + 1);
  ret = ret.substr(0, charPos + tmpCharPos) + tmpChar + ret.substr(charPos + tmpCharPos + 1);

  return ret;
}



function isALetter(str) {
  return !!str.match(/^[A-Za-z]$/);
}



module.exports.printDiamond = printDiamond;