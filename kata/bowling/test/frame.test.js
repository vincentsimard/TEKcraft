(function() {
  'use strict';

  var Frame = require('./../frame').Frame;
  var chai = require('chai');
  var assert = chai.assert;

  suite('Frame', function() {
    test('object is defined', function() {
      assert.notEqual(typeof Frame, 'undefined');
    });

    test('has a property "rolls"', function() {
      assert.property(new Frame(), 'rolls');
    });

    test('property "rolls" is an array', function() {
      assert.isArray(new Frame().rolls);
    });

    test('new Frame(3) should initialize with a roll of 4', function() {
      assert.equal(new Frame(4).rolls.toString(), [4].toString());
    });

    test('new Frame(4,5) should initialize with a rolls 4 and 5', function() {
      assert.equal(new Frame(4,5).rolls.toString(), [4, 5].toString());
    });



    suite('getNbKnockedPins()', function() {
      test('[] should return 0', function() {
        var frame = new Frame();
        assert.equal(frame.getNbKnockedPins(), 0);
      });

      test('[0] should return 0', function() {
        var frame = new Frame(0);
        assert.equal(frame.getNbKnockedPins(), 0);
      });

      test('[0,0] should return 0', function() {
        var frame = new Frame(0,0);
        assert.equal(frame.getNbKnockedPins(), 0);
      });

      test('[5] should return 5', function() {
        var frame = new Frame(5);
        assert.equal(frame.getNbKnockedPins(), 5);
      });

      test('[2,7] should return 9', function() {
        var frame = new Frame(2,7);
        assert.equal(frame.getNbKnockedPins(), 9);
      });
    });



    suite('isStrike()', function() {
      test('[] should return false', function() {
        var frame = new Frame();
        assert.isFalse(frame.isStrike());
      });

      test('[1] should return false', function() {
        var frame = new Frame(1);
        assert.isFalse(frame.isStrike());
      });

      test('[1,9] should return false', function() {
        var frame = new Frame(1,9);
        assert.isFalse(frame.isStrike());
      });

      test('[10] should return true', function() {
        var frame = new Frame(10);
        assert.isTrue(frame.isStrike());
      });
    });



    suite('isSpare()', function() {
      test('[] should return false', function() {
        var frame = new Frame();
        assert.isFalse(frame.isSpare());
      });

      test('[1] should return false', function() {
        var frame = new Frame(1);
        assert.isFalse(frame.isSpare());
      });

      test('[1,9] should return false', function() {
        var frame = new Frame(1,9);
        assert.isTrue(frame.isSpare());
      });

      test('[10] should return true', function() {
        var frame = new Frame(10);
        assert.isFalse(frame.isSpare());
      });
    });



    suite('getScore()', function() {
      test('should return the number of knocked pins if the frame did not register as a strike or spare', function() {
        var frame = new Frame(2,7);
        assert.equal(frame.getScore(), 9);
      });

      test('should return (10 + nb knocked pins on next roll) if it is a spare', function() {
        var frame = new Frame(9,1);
        var nextFrame = new Frame(3,5);
        assert.equal(frame.getScore(), 10);
        assert.equal(frame.getScore(nextFrame.rolls), 13);
      });

      test('should return (10 + nb knocked pins on next 2 rolls) if it is a strike', function() {
        var frame = new Frame(10);
        var nextFrame = new Frame(4,6);
        var nextRolls = nextFrame.rolls;

        assert.equal(frame.getScore(), 10);
        assert.equal(frame.getScore(nextRolls), 20);
      });
    });
  });
})();