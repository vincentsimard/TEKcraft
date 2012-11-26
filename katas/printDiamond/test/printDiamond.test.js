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
      it('returned line length should be equal to: (position of the char in the alphabet (zero-based)) * 2 + 1', function() {
        function getMaxLength(char) {
          var result = printDiamond(char);
          var lines = result.split('\n').clean('');
          return Math.max.apply(Math, lines.map(function (e) { return e.length }));
        }

        getMaxLength('A').should.equal(1);
        getMaxLength('B').should.equal(3);
        getMaxLength('C').should.equal(5);
      });

      it('each returned line should have the same length', function() {
        function hasSameLineLength(char) {
          var result = printDiamond(char);
          var lines = result.split('\n').clean('');
          var ret = true;

          if (lines.length < 2) { return true; }

          for (var i = 1; i < lines.length; i++) {
            ret = ret && (lines[0].length === lines[i].length);
          }

          return ret;
        }

        hasSameLineLength('A').should.be.true;
        hasSameLineLength('B').should.be.true;
        hasSameLineLength('C').should.be.true;
      });


/*
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
*/
    });
  });



  Array.prototype.clean = function(deleteValue) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == deleteValue) {         
        this.splice(i, 1);
        i--;
      }
    }
    return this;
  };
})();