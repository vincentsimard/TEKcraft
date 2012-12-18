<?php

require_once "PHPUnit/Autoload.php";
require_once "roman.php";

class RomanTest extends PHPUnit_Framework_TestCase
{
  public function testEmptyStringReturns0() {
    $this->assertEquals(toArabic(''), 0);
  }

  public function testSingleSymbol() {
    $this->assertEquals(toArabic('I'), 1);
    $this->assertEquals(toArabic('V'), 5);
    $this->assertEquals(toArabic('X'), 10);
    $this->assertEquals(toArabic('L'), 50);
    $this->assertEquals(toArabic('C'), 100);
    $this->assertEquals(toArabic('D'), 500);
    $this->assertEquals(toArabic('M'), 1000);
  }

  public function testMultipleSymbols() {
    $this->assertEquals(toArabic('II'), 2);
    $this->assertEquals(toArabic('III'), 3);

    $this->assertEquals(toArabic('XX'), 20);
    $this->assertEquals(toArabic('XXX'), 30);

    $this->assertEquals(toArabic('MM'), 2000);
    $this->assertEquals(toArabic('MMM'), 3000);
  }

  public function testMultiplesSymbolsThatCanBeAddedUp() {
    $this->assertEquals(toArabic('VI'), 6);
    $this->assertEquals(toArabic('VII'), 7);

    $this->assertEquals(toArabic('XII'), 12);
    $this->assertEquals(toArabic('XVIII'), 18);

    $this->assertEquals(toArabic('MMMDCCLXVIII'), 3768);
  }

  public function testIbeforeVorXShouldSubtract1() {
    $this->assertEquals(toArabic('IV'), 4);
    $this->assertEquals(toArabic('IX'), 9);
    $this->assertEquals(toArabic('XIV'), 14);
  }

  public function testXbeforeLorCShouldSubstract10() {
    $this->assertEquals(toArabic('XL'), 40);
    $this->assertEquals(toArabic('XC'), 90);
    $this->assertEquals(toArabic('MXCI'), 1091);
  }

  public function testCbeforeDorMShouldSubstract100() {
    $this->assertEquals(toArabic('CD'), 400);
    $this->assertEquals(toArabic('CM'), 900);
  }

  public function testRandomNumbers() {
    $this->assertEquals(toArabic('MMMMDCCXXXII'), 4732);
    $this->assertEquals(toArabic('MCMXLIV'), 1944);
    $this->assertEquals(toArabic('MMCCCXLV'), 2345);
  }  
}
