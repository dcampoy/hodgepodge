<?php
class A  {
	const yes = TRUE;
	const no = FALSE;
	function q() {
		return false;
	}
}

$a = new A();
$expr = $a->q() == A::yes ? "One" : "Two";

var_dump($expr);


