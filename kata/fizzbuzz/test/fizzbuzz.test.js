(function() {
  'use strict';

  var assert = require('assert');
  var fizzBuzz = require('./../fizzbuzz').fizzBuzz;

  suite('FizzBuzz kata', function() {
    test('fizzBuzz() is defined', function() {
      assert.equal(typeof fizzBuzz, 'function');
    });

    test('fizzBuzz() should return an empty string', function() {
      assert.equal(fizzBuzz(), '');
    });

    test('fizzBuzz("a") should return an empty string', function() {
      assert.equal(fizzBuzz('a'), '');
    });

    test('fizzBuzz(n) where n is a number not divisible by 3 or 5 should return the number', function() {
      assert.equal(fizzBuzz(1), '1');
      assert.equal(fizzBuzz(2), '2');
    });

    test('fizzBuzz(3n) should return "fizz"', function() {
      assert.equal(fizzBuzz(3), 'fizz');
      assert.equal(fizzBuzz(6), 'fizz');
    });

    test('fizzBuzz(5n) should return "buzz"', function() {
      assert.equal(fizzBuzz(5), 'buzz');
      assert.equal(fizzBuzz(10), 'buzz');
    });

    test('fizzBuzz(3*5*n) should return "fizzbuzz"', function() {
      assert.equal(fizzBuzz(15), 'fizzbuzz');
      assert.equal(fizzBuzz(30), 'fizzbuzz');
    });
  });
})();
