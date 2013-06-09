<?php
error_reporting(E_ALL);

class A {

 const C1 = 'A'; 
 const C2 = '1';
}

class B extends A {
 const C1 = 'B';
}


var_dump(B::C1);
var_dump(B::C2);
