(function() {
  'use strict';

  var chai = require('chai');
  var should = chai.should();

  var printDiamond = require('./../printDiamond').printDiamond;

  describe('printDiamond', function() {
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
      (function() { printDiamond('a'); }).should.not.throw(TypeError);
      (function() { printDiamond('ab'); }).should.throw(TypeError);
      (function() { printDiamond(1); }).should.throw(TypeError);
    });

    describe('with argument "char"', function() {
      describe('"A"', function() {
        it('should return "A"', function() {
          printDiamond('A').should.equal('A');
        });
      });

      describe('"B"', function() {
        it('should return " A \\nB B\\n A \\n"', function() {
          printDiamond('B').should.equal(' A \nB B\n A \n');
        });
      });

      describe('"C"', function() {
        it('should return "  A  \\n B B \\nC   C\\n B B \\n  A  \\n"', function() {
          printDiamond('C').should.equal('  A  \n B B \nC   C\n B B \n  A  \n');
        });
      });
    });
  });
})();