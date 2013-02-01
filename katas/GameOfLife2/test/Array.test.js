(function() {
  'use strict';

  var chai = require('chai');
  var should = chai.should();

  describe('Array', function() {
    describe('.contains()', function() {
      it('should return false if no parameters are passed', function() {
        [].contains().should.be.false;
      });

      it('should return false if the object is not contained in the array', function() {
        [].contains([1]).should.be.false;
      });

      it('should return true if the object is contained in the array', function() {
        var loc = {a: 1, b: 2};
        var otherLoc = {a: 1, b: 2};

        [loc].contains(otherLoc).should.be.true;
      });
    });
  });
})();