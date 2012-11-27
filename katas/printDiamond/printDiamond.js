'use strict';



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
  var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      charPos = alphabet.indexOf(char),
      arrLen = (charPos * 2) + 1,
      lineLen = arrLen,
      arr = [],
      index;

  arr = getDefaultArray(arrLen, lineLen);

  // Top part of the diamond
  for (var i = 0; i <= charPos; i++) {
    arr[i] = arr[i].substr(0, charPos) + 'A' + arr[i].substr(charPos+1);
  }

  // Create the lower half part of the diamond
  for (var i = (charPos + 1); i < arrLen; i++) {
    arr[i] = arr[arrLen - 1 - i];
  }

  return arr;
}



// Builds an array with spaces only of the proper length/size
function getDefaultArray(arrLen, lineLen) {
  var arr = [];

  for (var i = 0; i < arrLen; i++) {
    arr.push(Array(lineLen + 1).join(' '));
  }

  return arr;
}



function isALetter(str) {
  return !!str.match(/^[A-Za-z]$/);
}



module.exports.printDiamond = printDiamond;