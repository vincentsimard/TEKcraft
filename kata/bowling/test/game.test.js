(function() {
  'use strict';

  var Game = require('./../game').Game;
  var chai = require('chai');
  var assert = chai.assert;

  suite('Game', function() {
    test('object is defined', function() {
      assert.notEqual(typeof Game, 'undefined');
    });

    test('should have 10 frames', function() {
      assert.equal(Game.frames.length, 10);
    });

    suite('roll(pins)', function() {
      test('function is defined', function() {
        assert.notEqual(typeof Game.roll, 'undefined');
      });

      test('throws an error if no arguments are passed', function() {
        assert.throws(Game.roll, 'No arguments passed');
      });

      test('throws an error if the argument is not a number', function() {
        assert.throws(Game.roll('a'), TypeError);
      });
    });

    suite('score()', function() {
      test('function is defined', function() {
        assert.notEqual(typeof Game.score, 'undefined');
      });
    });
  });
})();
