'use strict';

var toRoman = function(number) {
  var ret = "";
  var key;

  var symbols = {
    "V":  5,
    "IV": 4,
    "I":  1
  };

  // Loop through each symbol
  for (key in symbols) {
    // Loop while the number is greater than the symbol value
    while (number >= symbols[key]) {
      ret += key;
      number -= symbols[key];
    }
  }

  return ret;
};

module.exports.toRoman = toRoman;