(function() {
  'use strict';

  var chai = require('chai');
  var should = chai.should();

  var printDiamond = require('./../printDiamond').printDiamond;

  describe('PrintDiamond', function() {
    it('should be defined', function() {
      printDiamond.should.not.be.undefined;
    });

    it('should return an empty string when no arguments are passed', function() {
      printDiamond().should.equal('');
    });

    it('should only accept one argument', function() {
      (function() { printDiamond('a'); }).should.not.throw(Error);
      (function() { printDiamond(1, 2); }).should.throw(Error);
      (function() { printDiamond(1, 2, 3); }).should.throw(Error);
    });

    it('should only accept a single letter as the char argument', function() {
      (function() { printDiamond(1); }).should.throw(TypeError);
    });
  });
})();