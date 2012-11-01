'use strict';

function intToRoman(number) {
  var returnValue = '';
  var symbolPatterns = {
    'IIII': 'IV',
    'IVI':  'V',
    'VIV':  'IX',
    'IXI':  'X',
    'XXXX': 'XL',
    'XLX':  'L',
    'LXL':  'XC',
    'XCX':  'C',
    'CCCC': 'CD',
    'CDC':  'D',
    'DCD':  'CM',
    'CMC':  'M'
  };

  if (number < 1) { return returnValue; }

  for (var i = 0; i < number; i++) {
    returnValue += 'I';

    for (var pattern in symbolPatterns) {
      var conversion = symbolPatterns[pattern];
      returnValue = returnValue.replace(pattern, conversion);
    }
  }

  return returnValue;
}

module.exports.intToRoman = intToRoman;