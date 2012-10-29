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
  });
})();