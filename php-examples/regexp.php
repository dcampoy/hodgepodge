<?php

$text = "  1 de 2 ";
$pattern = "/(?'current'\d+).*(?'total'\d+)/";
$r = preg_match($pattern, $text, $matchs);
var_dump($matchs);

