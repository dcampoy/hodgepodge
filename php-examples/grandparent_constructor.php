<?php
class A {
	function __construct() {
		echo "I'm grandpa\n";
	}
}

class B extends A {
}

class C extends B {
	function __construct() {
		parent::__construct();
	}
}

new C;
