(function() {
  'use strict';

  var Roll = require('./../roll').Roll;
  var chai = require('chai');
  var assert = chai.assert;

  var TestUtils = require('./lib/bowling.test.utils').TestUtils;



  suite('Roll', function() {
    test('object is defined', function() {
      assert.notEqual(typeof Roll, 'undefined');
    });

    test('has a property "pins"', function() {
      assert.property(new Roll(), 'pins');
    });

    test('property "pins" is a number', function() {
      assert.isNumber(new Roll().pins);
    });

    test('property "pins" value must be between 0 and 10', function() {
      var catchError = TestUtils.catchError;

      assert.equal(catchError(Roll, -1) instanceof RangeError, true);
      assert.equal(catchError(Roll, 11) instanceof RangeError, true);

      assert.notEqual(catchError(Roll,  0) instanceof RangeError, true);
      assert.notEqual(catchError(Roll, 10) instanceof RangeError, true);
    });
  });
})();
