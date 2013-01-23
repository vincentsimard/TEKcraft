<?php
require_once "PHPUnit/Autoload.php";
require_once "range.php";

class RangeTest extends PHPUnit_Framework_TestCase
{
  public function testShouldReturnTrueWhenNumberInsideOfRange() {
    $r = new NumercialRange(0,2);
    $this->assertEquals($r->contains(1), true);
    $this->assertEquals($r->contains(2), true);
  }

  public function testShouldReturnFalseWhenNumberNotInsideOfRange() {
    $r = new NumercialRange(0,2);
    $this->assertEquals($r->contains(3), false);
    $this->assertEquals($r->contains(4), false);
    $this->assertEquals($r->contains(5), false);
  }
}
