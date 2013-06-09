<?php
error_reporting(E_ALL);

abstract class A {
	abstract public function a();

	public function f() {
		return ($this->a());
	}
}

class B extends A {

	public function f() {
		return "I'm B";
	}
}

$b = new B();
