<?php


function f($param1) {
	var_dump($param1);
}

//f(); // Missing param error
f(1); // OK
f(1,2); //OK


Class A {}

function g1(A $a) {
}

function g2(A $a=NULL) {
}

g1(NULL); 
g2("hello");


