'use strict';

function fizzBuzz(number) {
  var returnVal = '';

  if (isNaN(number)) { return ''; }

  returnVal += (number % 3 === 0) ? 'fizz' : '';
  returnVal += (number % 5 === 0) ? 'buzz' : '';

  return returnVal || number;
};

module.exports.fizzBuzz = fizzBuzz;