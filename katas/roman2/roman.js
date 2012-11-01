'use strict';

function intToRoman(number) {
  var result = '';
  var symbols = {
    'M':  1000,
    'CM':  900,
    'D':   500,
    'CD':  400,
    'C':   100,
    'XC':   90,
    'L':    50,
    'XL':   40,
    'X':    10,
    'IX':    9,
    'V':     5,
    'IV':    4,
    'I':     1
  };

  var rest = number;
  var key;
  var value;

  if (typeof number === 'undefined' || number === 0) { return result; }

  for (key in symbols) {
    value = symbols[key];
    while (rest >= value) {
      result += key;
      rest -= value;
    }
  }

  return result;
}

module.exports.intToRoman = intToRoman;