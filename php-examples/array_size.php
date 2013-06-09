<?php

// Initial memory
$memInit = memory_get_usage(TRUE);

/**
 * Print current memory usage
 */
function cm($p) {
	global $memInit;
	echo $p ."\t" . (memory_get_usage(TRUE) - $memInit) ."b\n";
}

$a = array();
for($i=0; $i<20000; $i++) {
	$a[3478246 + $i] = $i;
	if ($i % 500 == 0) cm($i);
}


