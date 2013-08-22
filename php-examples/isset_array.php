<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$a = array();
isset($a['first']['second']); // No errors here
isset($b['first']['second']); // No errors here neither

class C {

    private $a = array();
    private $b = 5;

    public function foo() {
        isset($this->a['first']); // No errors
        isset($this->b['first']); // No errors here neither
    }
}

$c = new C();
$c->foo();
