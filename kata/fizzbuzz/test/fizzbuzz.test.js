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

    test('fizzBuzz(1) should return "1"', function() {
      assert.equal(fizzBuzz(1), '1');
    });

    test('fizzBuzz(2) should return "2"', function() {
      assert.equal(fizzBuzz(2), '2');
    });

    test('fizzBuzz(3) should return "fizz"', function() {
      assert.equal(fizzBuzz(3), 'fizz');
    });

    test('fizzBuzz(5) should return "buzz"', function() {
      assert.equal(fizzBuzz(5), 'buzz');
    });

    test('fizzBuzz(6) should return "fizz"', function() {
      assert.equal(fizzBuzz(6), 'fizz');
    });

    test('fizzBuzz(8) should return "8"', function() {
      assert.equal(fizzBuzz(8), '8');
    });

    test('fizzBuzz(10) should return "buzz"', function() {
      assert.equal(fizzBuzz(10), 'buzz');
    });

    test('fizzBuzz(15) should return "fizzbuzz"', function() {
      assert.equal(fizzBuzz(15), 'fizzbuzz');
    });
  });
})();
