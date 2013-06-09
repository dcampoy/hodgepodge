<?php
error_reporting(E_ALL);

$str = "This is AWESOME";

function asdf($str) {
	return levenshtein($str, mb_strtolower($str)) / mb_strlen($str);
}

var_dump(asdf($str));
