<?php

function prime($number) {
  $primes = Array();

  for ($candidate = 2; $candidate < $number; $candidate++) {
    while ($number % $candidate === 0) {
      array_push($primes, $candidate);
      $number = $number / $candidate;
    }
  }

  if ($number > 1) {
    array_push($primes, $number);
  }

  return $primes;
}