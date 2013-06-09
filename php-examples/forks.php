<?php

$array = range(0,100);

$pid = pcntl_fork();

if ($pid == 0) {
	echo "I'm the father\n";
} else {
	echo "I'm the child\n";
}

?>
