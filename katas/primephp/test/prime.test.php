<?php

require_once "PHPUnit/Autoload.php";
require_once "prime.php";

class PrimeTest extends PHPUnit_Framework_TestCase
{
  public function testShouldReturnCorrectArray() {
    $tests = Array(
      2 => Array(2),
      3 => Array(3),
      4 => Array(2,2),
      5 => Array(5),
      6 => Array(2,3),
      7 => Array(7),
      8 => Array(2,2,2),
      9 => Array(3,3),
      10 => Array(2,5),
      11 => Array(11),
      12 => Array(2,2,3),
      13 => Array(13),
      14 => Array(2,7),
      15 => Array(3,5),
      25 => Array(5,5),
      49 => Array(7,7),
      486136 => Array(2,2,2,7,8681),
      987432457 => Array(11,1933,46439)
    );

    foreach($tests as $key=>$value) {
      $this->assertEquals(prime($key), $value);
    }
  }
}
