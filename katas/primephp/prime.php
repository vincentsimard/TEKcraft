<?php

function prime($number) {
  $primes = Array();

  for ($nominee = 2; $nominee < $number; $nominee++) {
    while ($number % $nominee === 0) {
      array_push($primes, $nominee);
      $number = $number / $nominee;
    }
  }

  if ($number > 1) {
    array_push($primes, $number);
  }

  return $primes;
}