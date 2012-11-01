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

    test('new Game([1,2], [5,3]) should initialize with a rolls 1,2,5,3', function() {
      assert.equal(new Game([1,2], [5,3]).getScore(), 11);
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
        var game = new Game([0,0]);
        assert.equal(game.getCurrentFrameIndex(), 2);
      });

      test('should be at second frame after a strike', function() {
        var game = new Game([10]);
        assert.equal(game.getCurrentFrameIndex(), 2);
      });

      test('should be at third frame after four rolls', function() {
        var game = new Game([0,0], [0,0]);
        assert.equal(game.getCurrentFrameIndex(), 3);
      });
    });



    test('should return 0 if a single roll does not knock pins', function() {
      var game = new Game([0]);
      assert.equal(game.getScore(), 0);
    });

    test('should return 1 if a single roll knocks 1 pin', function() {
      var game = new Game([1]);
      assert.equal(game.getScore(), 1);
    });

    test('should return the sum of two rolls', function() {
      var game = new Game([1,2]);
      assert.equal(game.getScore(), 3);
    });

    test('should compute spares based on next throw', function() {
      var game = new Game([5,5], [3,4]);
      assert.equal(game.getScore(), 16);

      var game2 = new Game([5,5], [3,0], [2,7]);
      assert.equal(game2.getScore(), 25);
    });

    test('should compute strikes based on next 2 throws', function() {
      var game = new Game([10], [3,4], [2,7]);
      assert.equal(game.getScore(), 24);

      var game2 = new Game([10], [10], [2,7]);
      assert.equal(game2.getScore(), 50);
    });   

    // test('perfect game should score 300', function() {
    //   var game = new Game([10]
    //                      ,[10]
    //                      ,[10]
    //                      ,[10]
    //                      ,[10]
    //                      ,[10]
    //                      ,[10]
    //                      ,[10]
    //                      ,[10]
    //                      ,[10,10,10]);
    //   assert.equal(game.getScore(), 300);
    // });
  });
})();
