<?php

class ClassA {
	function method1() {
		echo "Connecting to database\n";
		return true;
	}

	function method2() {
		echo "Connecting to memcache!\n";
		return true;
	}
}


class ExampleTest extends PHPUnit_Framework_TestCase {
	
	function test1() {
		$mock = $this->getMock('ClassA');
		$mock->expects($this->at(0))
			->method('method1');

		$mock->expects($this->at(1))
			->method('method2');

		$mock->expects($this->at(2))
			->method('method1');

		// Test pass
		//$mock->method1(); // at(0)
		//$mock->method2(); // at(1)
		//$mock->method1(); // at(2)

		// Test fail
		$mock->method1(); // at(0) Ok!
		$mock->method1(); // at(1) Fail because I expected method2
	}
}
