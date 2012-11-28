'use strict';

var chai = require('chai');
var should = chai.should();

var toRoman = require('./../roman.js').toRoman;

describe('toRoman', function() {
  describe('with argument number', function() {
    it('1 should return "I"', function() {
      toRoman(1).should.equal("I");
    });

    it('2 should return "II"', function() {
      toRoman(2).should.equal("II");
    });

    it('3 should return "III"', function() {
      toRoman(3).should.equal("III");
    });

    it('4 should return "IV"', function() {
      toRoman(4).should.equal("IV");
    });

    it('5 should return "V"', function() {
      toRoman(5).should.equal("V");
    });

    it('6 should return "VI"', function() {
      toRoman(6).should.equal("VI");
    });
  });
});