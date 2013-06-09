<?php
$tmp = array();
$collisions = 0; 
for ($i=0;$i<100e6;$i++) {
	$c = substr(base64_encode(pack("i", $i)),0,4); // Usando el id de manera binaria
	//$c = substr(base64_encode(md5($i, true)),0,6); // Usando el md5 de algo
	if (isset($tmp[$c])) {
		$collisions++;
	}
	$tmp[$c] = $i;
}
echo "$collisions\n";
