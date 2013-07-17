<?php
function m1($className) {
   echo "1 - $className\n"; 
   @include "$className";
}

function m2($className) {
   echo "2 - $className\n"; 
   @include "$className";
}

spl_autoload_register('m1');
spl_autoload_register('m2');

new Hola();

