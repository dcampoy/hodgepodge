<?php

define("ITER",1000);
define("SIZE",1000);
define("METHOD","COPY"); // COPY


$a = array();
for ($i = 0; $i<SIZE;$i++) {
  $a[$i] = $i;
}

if (METHOD == "REF") {
  byRef($a);
} else {
  byCopy($a);
}

function byRef(&$a) {
 for ($j = 0; $j < ITER; $j++) {
   for ($i = 0; $i<SIZE; $i++) {
     $a[$i] = $a[$i]++;
   }
 }
}

function byCopy($a) {
 for ($j = 0; $j < ITER; $j++) {
   for ($i = 0; $i<SIZE; $i++) {
     $a[$i] = $a[$i]++;
   }
 }
}

