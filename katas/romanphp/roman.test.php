<?php

require_once "PHPUnit/Autoload.php";
require_once "roman.php";

class RomanTest extends PHPUnit_Framework_TestCase
{
  public function testIShouldReturn1() {
    $this->assertEquals(prime('I'), 1);
  }
}
