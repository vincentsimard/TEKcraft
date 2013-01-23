<?php

class NumercialRange {  

  private $num1;
  private $num2;

 public function __construct($param1, $param2)
 {
    $this->num1 = $param1;
    $this->num2 = $param2;
 }

  public function contains($number) {

    return (($number >= $this->num1) && ($number <= $this->num2));
    
  }
}
