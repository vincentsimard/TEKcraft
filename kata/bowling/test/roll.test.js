(function() {
  'use strict';

  var Roll = require('./../roll').Roll;
  var chai = require('chai');
  var assert = chai.assert;

  suite('Roll', function() {
    test('object is defined', function() {
      assert.notEqual(typeof Roll, 'undefined');
    });

    test('should has pins property', function() {
      assert.notEqual(typeof Roll.pins, 'undefined');
    });
  });
})();
