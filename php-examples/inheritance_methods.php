<?php
error_reporting(E_ALL);

class A {

 protected $name;

 public function __construct() {
  $this->name = "A"; 
 }
 
 public function m1($one) {
  echo $this->name ." " .$one ."\n";
 }
}

class B extends A {

 public function __construct() {
  $this->name = "B";
 }

 public function m1($one, $two) {
  parent::m1($one);
  echo $this->name ." " .$two . "\n";
 }
}

$o = new A();
$o->m1("one");

$o = new B();
$o->m1("one","two");
