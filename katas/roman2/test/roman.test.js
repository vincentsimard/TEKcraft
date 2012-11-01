(function() {
  'use strict';

  var chai = require('chai');
  var should = chai.should();

  var intToRoman = require('./../roman').intToRoman;


  describe('intToRoman()', function() {
    it('should be defined', function() {
      intToRoman.should.not.be.undefined;
      intToRoman.should.be.a('function');
    });

    it('should return "" if no arguments are passed or 0', function() {
      intToRoman().should.be.empty;
      intToRoman(0).should.be.empty;
    });

    it('should return "M" for 1000', function() {
      intToRoman(1000).should.equal("M");
    });

    it('should return "MM" for 2000', function() {
      intToRoman(2000).should.equal("MM");
    });

    it('should return "CM" for 900', function() {
      intToRoman(900).should.equal("CM");
    });

    it('should return "D" for 500', function() {
      intToRoman(500).should.equal("D");
    });

    it('should return "CD" for 400', function() {
      intToRoman(400).should.equal("CD");
    });

    it('should return "C" for 100', function() {
      intToRoman(100).should.equal("C");
    });

    it('should return "MCMXCIX" for 1999', function() {
      intToRoman(1999).should.equal("MCMXCIX");
    });

    it('should return "MMMMCMXLVI" for 4946', function() {
      intToRoman(4946).should.equal("MMMMCMXLVI");
    });    
  });
})();