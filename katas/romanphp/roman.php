<?php

function toArabic($roman) {
  $result = 0;
  
  $addSymbols = array(
    'M' => 1000,
    'D' => 500,
    'C' => 100,
    'L' => 50,
    'X' => 10,
    'V' => 5,
    'I' => 1
  );

  $substractSymbols = array(
    'IV' => -2*$addSymbols['I'],
    'IX' => -2*$addSymbols['I'],
    'XL' => -2*$addSymbols['X'],
    'XC' => -2*$addSymbols['X'],
    'CD' => -2*$addSymbols['C'],
    'CM' => -2*$addSymbols['C']
  );

  $symbols = array_merge($addSymbols, $substractSymbols);

  foreach ($symbols as $symbol => $value) {
    $result += substr_count($roman, $symbol) * $value;
  }

  return $result;
}
