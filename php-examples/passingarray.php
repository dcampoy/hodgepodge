<?php

define('SIZE',100000);
define('REPEAT',100);

$a = array();
for($i=0;$i<SIZE; $i++) {
	$a['f' . $i] = $i;
}

$o = (object) $a;

function t1(&$a) {
	for ($i=0;$i<SIZE;$i++) {
		$h = 'f' . $i;
		$a[$h] = $a[$h] + 1;
	}
	
}

function t2($o) {
	for ($i=0;$i<SIZE;$i++) {
		$field = 'f' . $i;
		$o->$field = $o->$field + 1;
	}
}




$t = microtime(TRUE);
echo "--$t\n";
for ($n=0; $n<REPEAT; $n++) {
	t2($o);
}
echo (microtime(TRUE) - $t) . "\n";


$t = microtime(TRUE);
echo "--$t\n";
for ($n=0; $n<REPEAT; $n++) {
	t1($a);
}
echo (microtime(TRUE) - $t) . "\n";
