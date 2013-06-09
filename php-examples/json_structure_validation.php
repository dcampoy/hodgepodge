<?php
$json = '{
	"field1": "value1",
	"field2": "value2",
	"field3": "value3"
}';

Class Data {
	public $field1;
	protected $field2;
	private $field3;
}

$d = json_decode($json);
var_dump($d);
$v = (Object) $d;
var_dump($v);
$v2 = (Data) $v;
