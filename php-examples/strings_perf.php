<?php

$iterations = pow(10,7);

echo "Test 1: Substitution of an constant value\n";

$c = "World";

$start = microtime(TRUE);
for ($i=0;$i<$iterations;$i++) {
	$str = 'Hello ' . $c;
}
echo "Simple: " . (microtime(TRUE) - $start) . "\n";

$start = microtime(TRUE);
for ($i=0;$i<$iterations;$i++) {
	$str = "Hello $c";
}
echo "Double: " . (microtime(TRUE) - $start) . "\n";


echo "Test 2: Substitution of an incremental value\n";

$start = microtime(TRUE);
for ($i=0;$i<$iterations;$i++) {
	$str = 'Hello world' . $i;
}
echo "Simple: " . (microtime(TRUE) - $start) . "\n";

$start = microtime(TRUE);
for ($i=0;$i<$iterations;$i++) {
	$str = "Hello world $i";
}
echo "Double: " . (microtime(TRUE) - $start) . "\n";


echo "Test 3: Printing in an internal buffer\n";

$start = microtime(TRUE);
ob_start();
for ($i=0;$i<$iterations;$i++) {
	echo 'Hello world' . $i;
}
ob_end_clean();
echo "Simple: " . (microtime(TRUE) - $start) . "\n";

$start = microtime(TRUE);
ob_start();
for ($i=0;$i<$iterations;$i++) {
	echo "Hello world $i";
}
ob_end_clean();
echo "Double: " . (microtime(TRUE) - $start) . "\n";


