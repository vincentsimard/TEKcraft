(function() {
  'use strict';

  var assert = require('assert');
  var intToRoman = require('./../roman').intToRoman;

  suite('Roman Numeral kata', function() {
    test('intToRoman() is defined', function() {
      assert.equal(typeof intToRoman, 'function');
    });

    test('intToRoman() should return ""', function() {
      assert.equal(intToRoman(), '');
    });

    test('intToRoman(0) should return ""', function() {
      assert.equal(intToRoman(0), '');
    });

    test('intToRoman(1) should return "I"', function() {
      assert.equal(intToRoman(1), 'I');
    });

    test('intToRoman(2) should return "II"', function() {
      assert.equal(intToRoman(2), 'II');
    });

    test('intToRoman(3) should return "III"', function() {
      assert.equal(intToRoman(3), 'III');
    });

    test('intToRoman(4) should return "IV"', function() {
      assert.equal(intToRoman(4), 'IV');
    });

    test('intToRoman(5) should return "V"', function() {
      assert.equal(intToRoman(5), 'V');
    });

    test('intToRoman(6) should return "VI"', function() {
      assert.equal(intToRoman(6), 'VI');
    });

    test('intToRoman(7) should return "VII"', function() {
      assert.equal(intToRoman(7), 'VII');
    });

    test('intToRoman(9) should return "IX"', function() {
      assert.equal(intToRoman(9), 'IX');
    });

    test('intToRoman(10) should return "X"', function() {
      assert.equal(intToRoman(10), 'X');
    });

    test('intToRoman(11) should return "XI"', function() {
      assert.equal(intToRoman(11), 'XI');
    });

    test('intToRoman(14) should return "XIV"', function() {
      assert.equal(intToRoman(14), 'XIV');
    });

    test('intToRoman(15) should return "XV"', function() {
      assert.equal(intToRoman(15), 'XV');
    });

    test('intToRoman(16) should return "XVI"', function() {
      assert.equal(intToRoman(16), 'XVI');
    });

    test('intToRoman(19) should return "XIX"', function() {
      assert.equal(intToRoman(19), 'XIX');
    });

    test('intToRoman(20) should return "XX"', function() {
      assert.equal(intToRoman(20), 'XX');
    });

    test('intToRoman(38) should return "XXXVIII"', function() {
      assert.equal(intToRoman(38), 'XXXVIII');
    });

    test('intToRoman(40) should return "XL"', function() {
      assert.equal(intToRoman(40), 'XL');
    });

    test('intToRoman(49) should return "XLIX"', function() {
      assert.equal(intToRoman(49), 'XLIX');
    });

    test('intToRoman(50) should return "L"', function() {
      assert.equal(intToRoman(50), 'L');
    });

    test('intToRoman(51) should return "LI"', function() {
      assert.equal(intToRoman(51), 'LI');
    });

    test('intToRoman(55) should return "LV"', function() {
      assert.equal(intToRoman(55), 'LV');
    });

    test('intToRoman(59) should return "LIX"', function() {
      assert.equal(intToRoman(59), 'LIX');
    });

    test('intToRoman(90) should return "XC"', function() {
      assert.equal(intToRoman(90), 'XC');
    });

    test('intToRoman(99) should return "XCIX"', function() {
      assert.equal(intToRoman(99), 'XCIX');
    });

    test('intToRoman(100) should return "C"', function() {
      assert.equal(intToRoman(100), 'C');
    });

    test('intToRoman(399) should return "CCCXCIX"', function() {
      assert.equal(intToRoman(399), 'CCCXCIX');
    });

    test('intToRoman(400) should return "CD"', function() {
      assert.equal(intToRoman(400), 'CD');
    });

    test('intToRoman(500) should return "D"', function() {
      assert.equal(intToRoman(500), 'D');
    });

    test('intToRoman(600) should return "DC"', function() {
      assert.equal(intToRoman(600), 'DC');
    });

    test('intToRoman(999) should return "CMXCIX"', function() {
      assert.equal(intToRoman(999), 'CMXCIX');
    });

    test('intToRoman(1000) should return "M"', function() {
      assert.equal(intToRoman(1000), 'M');
    });

    test('intToRoman(2012) should return "MMXII"', function() {
      assert.equal(intToRoman(2012), 'MMXII');
    });

    test('intToRoman(3976) should return "MMMCMLXXVI"', function() {
      assert.equal(intToRoman(3976), 'MMMCMLXXVI');
    });
  });
})();
