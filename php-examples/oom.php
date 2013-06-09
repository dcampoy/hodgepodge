<?php

ini_set('memory_limit','2M');
register_shutdown_function('shutdown');

function fillMemory() {
  for ($i=0;$i<1000;$i++) {
        for ($j=0;$j<1000;$j++) {
            $a[] = $i + $j;
        }
    }
}

function shutdown() { 
	ini_set('memory_limit','16M');
	// [2] Function shutdown is called just after OOM
	while(TRUE) {
		// How many memory I have available in "shutdown context"?
		echo $i++ ." " . memory_get_usage(TRUE) . "Kb\n";flush();
		$a[] = $i;
	}
}




var_dump(memory_get_usage(TRUE));

// [1] Produce out of memory
fillMemory();

var_dump(memory_get_usage(TRUE));
