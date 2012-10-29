(function() {
  'use strict';

  var Game = require('./../game').Game;
  var chai = require('chai');
  var assert = chai.assert;

  var TestUtils = require('./lib/bowling.test.utils').TestUtils;



  suite('Game', function() {
    test('object is defined', function() {
      assert.notEqual(typeof Game, 'undefined');
    });

    test('should have 10 frames', function() {
      assert.equal(new Game().frames.length, 10);
    });



    suite('roll(pins)', function() {
      test('function is defined', function() {
        assert.notEqual(typeof new Game().roll, 'undefined');
      });

      test('throws an error if no arguments are passed', function() {
        var errObj = TestUtils.catchError(new Game().roll);

        assert.equal(errObj.name, 'Error');
        assert.equal(errObj.message, 'No arguments passed');
      });

      test('throws an error if the argument is not a number', function() {
        var errObj = TestUtils.catchError(new Game().roll, 'a');

        assert.equal(errObj instanceof TypeError, true);
      });
    });



    suite('getScore()', function() {
      test('function is defined', function() {
        assert.notEqual(typeof new Game().getScore, 'undefined');
      });

      test('returns a number', function() {
        assert.isNumber(new Game().getScore());
      });
    });




    suite('getCurrentFrameIndex()', function() {
      test('should be at first frame at the start of the game', function() {
        var game = new Game();

        assert.equal(game.getCurrentFrameIndex(), 1);
      });

      test('should be at second frame after two rolls', function() {
        var game = new Game();
        game.roll(0);
        game.roll(0);

        assert.equal(game.getCurrentFrameIndex(), 2);
      });

      test('should be at second frame after a strike', function() {
        var game = new Game();
        game.roll(10);

        assert.equal(game.getCurrentFrameIndex(), 2);
      });
    });



    test('should return 0 if a single roll does not knock pins', function() {
      var game = new Game();
      game.roll(0);

      assert.equal(game.getScore(), 0);
    });

    test('should return 1 if a single roll knocks 1 pin', function() {
      var game = new Game();
      game.roll(1);

      assert.equal(game.getScore(), 1);
    });

    test('should return the sum of two rolls', function() {
      var game = new Game();
      game.roll(1);
      game.roll(2);

      assert.equal(game.getScore(), 3);
    });

    // test('should compute spares based on next frames\' throw', function() {
    //   var game = new Game();
    //   game.roll(5);
    //   game.roll(5);
    //   game.roll(3);

    //   assert.equal(game.getScore(), 16)
    // });
  });
})();
