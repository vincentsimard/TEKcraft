<?php

function fizzBuzz($number) {
  $return = '';

  if ($number % 3 === 0) { $return .= 'Fizz'; }
  if ($number % 5 === 0) { $return .= 'Buzz'; }

  return ($return === '' ? $number : $return);
}
