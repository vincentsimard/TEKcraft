(function() {
  'use strict';

  var chai = require('chai');
  var should = chai.should();
  var assert = chai.assert, expect = chai.expect;

  var calendar = require('./../calendar').calendar;

  describe('calendar', function() {
    describe('with no events or arguments', function() {
      it('should return an empty array', function() {
        calendar().should.be.empty;
        calendar().should.eql([]);     
      });
    });

    describe('with one event', function() {
      var event1 = Object.freeze({
        id: 1,
        start: 60,
        end: 120
      });
      var result = calendar(event1)[0];

      it('should have 600px width', function() {
        result.width.should.equal(600);
      });

      it('should be positioned to the far left', function() {
        result.left.should.equal(0);
      });

      it('should be positioned to at the start time', function() {
        result.top.should.equal(60);
      });

      it('should have 1px height for each minute', function() {
        var height = Math.abs(event1.start - event1.end);
        result.height.should.equal(height);
      });
    })
  });
})();