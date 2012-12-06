<?php

function fizzBuzz($number) {
  if (!is_int($number)) throw new InvalidArgumentException('fizzBuzz function only accepts integers. Input was: '.$number);

  $return = '';

  if ($number % 3 === 0) { $return .= 'Fizz'; }
  if ($number % 5 === 0) { $return .= 'Buzz'; }

  return ($return === '' ? $number : $return);
}
