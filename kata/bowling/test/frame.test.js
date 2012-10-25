(function() {
  'use strict';

  var Frame = require('./../frame').Frame;
  var chai = require('chai');
  var assert = chai.assert;

  suite('Frame', function() {
    test('object is defined', function() {
      assert.notEqual(typeof Frame, 'undefined');
    });
  });
})();
