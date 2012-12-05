<?php

  function fizzBuzz($number) {
    $this->number = $number;
  }

class User {
  protected $name;

  public function getName() {
    return $this->name;
  }

  public function setName($name) {
    $this->name = $name;
  }

  public function talk() {
    return "Hello world!";
  }
}
