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
      arr = [];

  arr = getDefaultArray(arrLen, lineLen);

  // Place the letter on the line
  for (var i = 0; i < arrLen; i++) {
    // Center the letter
    arr[i] = arr[i].substr(0, charPos) + 'A' + arr[i].substr(charPos+1);
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