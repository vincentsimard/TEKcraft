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
      var getLines = function(char) {
        var result = printDiamond(char);
        return result.split('\n').clean('');
      };

      describe('the number of lines returned', function() {
        it('should equal: (position of the char in the alphabet (zero-based)) * 2 + 1', function() {
          function getNbLines(char) {
            var lines = getLines(char);
            return lines.length;
          }

          getNbLines('A').should.equal(1);
          getNbLines('B').should.equal(3);
          getNbLines('C').should.equal(5);
        });
      });

      describe('each returned line', function() {
        it('should have the same length', function() {
          function hasSameLineLength(char) {
            var lines = getLines(char);
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

        it('should have a length equal: (position of the char in the alphabet (zero-based)) * 2 + 1', function() {
          function getMaxLength(char) {
            var lines = getLines(char);
            return Math.max.apply(Math, lines.map(function (e) { return e.length; }));
          }

          getMaxLength('A').should.equal(1);
          getMaxLength('B').should.equal(3);
          getMaxLength('C').should.equal(5);
        });
      });

      describe('the first and last line returned', function() {
        it('should equal "A" when trimmed', function() {
          function testFirstAndLastEqualA(char) {
            var lines = getLines(char).trim();
            lines[0].should.equal('A');
            lines[lines.length - 1].should.equal('A');
          }

          testFirstAndLastEqualA('A');
          testFirstAndLastEqualA('B');
          testFirstAndLastEqualA('C');
        });

        it('should only have one character that is not a space', function() {
          function testOnlyOneChar(char) {
            var lines = getLines(char).trim();
            var notSpaces = lines.clean(' ');
            notSpaces[0].length.should.equal(1);
            notSpaces[notSpaces.length - 1].length.should.equal(1);
          }

          testOnlyOneChar('A');
          testOnlyOneChar('B');
          testOnlyOneChar('C');
        });

        it('should have the character A at the center of the line', function() {
          function testCharInTheMiddle(char) {
            var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var charPos = alphabet.indexOf(char);
            var lines = getLines(char);
            lines[0].indexOf('A').should.equal(charPos);
            lines[lines.length - 1].indexOf('A').should.equal(charPos);
          }

          testCharInTheMiddle('A');
          testCharInTheMiddle('B');
          testCharInTheMiddle('C');
        });
      });

      describe('lines returned that are not the first or last one', function() {
        describe('each returned line', function() {
          it('should have the proper character twice', function() {
            function testLine(char, lineNumber, expectedChar) {
              var lines = getLines(char).trim();
              var noSpaces = lines.map(function (e) { return e.replace(/ /g, ''); });
              var doubledChar = Array(3).join(expectedChar);
              noSpaces[lineNumber].should.equal(doubledChar);
            }

            testLine('B', 1, 'B');
            testLine('F', 1, 'B');
            testLine('D', 2, 'C');
            testLine('E', 4, 'E');
          });
        });
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

  Array.prototype.trim = function() {
    for (var i = 0; i < this.length; i++) {
      this[i] = this[i].trim();
    }
    return this;
  };
})();