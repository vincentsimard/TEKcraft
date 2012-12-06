<?php
require_once "PHPUnit/Autoload.php";
require_once "fizzbuzz.php";

class FizzBuzzTest extends PHPUnit_Framework_TestCase
{
  public function testShouldReturnNumber() {
    $this->assertEquals(fizzbuzz(1), "1");
    $this->assertEquals(fizzbuzz(2), "2");
    $this->assertEquals(fizzbuzz(16), "16");
    $this->assertEquals(fizzbuzz(41), "41");
    $this->assertEquals(fizzbuzz(88), "88");
  }

  public function testShouldReturnFizzForDivisibleBy3() {
    $this->assertEquals(fizzbuzz(3), "Fizz");
    $this->assertEquals(fizzbuzz(6), "Fizz");
  }

  public function testShouldReturnBuzzForDivisibleBy5() {
    $this->assertEquals(fizzbuzz(5), "Buzz");
    $this->assertEquals(fizzbuzz(10), "Buzz");
  }

  public function testShouldReturnFizzBuzzForDivisibleBy3and5() {
    $this->assertEquals(fizzbuzz(15), "FizzBuzz");
    $this->assertEquals(fizzbuzz(30), "FizzBuzz");
  }

  /**
   * @expectedException InvalidArgumentException
   */
  public function testInvalidArgument() {
    fizzBuzz('a');
  }
}
