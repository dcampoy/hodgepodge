<?php
gc_disable();

function doesntModifyTheArray($a) {
	$sum = 0;
	foreach ($a as $v) {
		$sum += $v;
	}
	return $sum;
}

function modifyTheArray($a) {
	$a[0] = 1;
	
	$sum = 0;
	foreach ($a as $v) {
		$sum += $v;
	}
	return $sum;
}

function modifyTheArrayByReference(& $a) {
	$a[4] = 10;

	$sum = 0;
	foreach ($a as $v) {
		$sum += $v;
	}
	return $sum;
}

$a = array();
for ($i=0;$i<pow(2,20);$i++) {
	$a[] = $i;
}

echo " Memory usage with only the array:";
echo memory_get_usage(TRUE) / pow(2,10) ."\n";

echo " Memory usage after call the method that doens't modify the array:";
doesntModifyTheArray($a);
echo memory_get_usage(TRUE) / pow(2,10) ."\n";


echo " Memory usage after call the method that modify the array by copy:";
modifyTheArray($a);
echo memory_get_usage(TRUE) / pow(2,10) ."\n";

echo " Memory usage after call the method that modify the array by reference:";
modifyTheArrayByReference($a);
echo memory_get_usage(TRUE) / pow(2,10) ."\n";
