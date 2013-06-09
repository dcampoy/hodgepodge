<?php

$texts = array(
	'D.O.C.C',
	'D.O.C.C S.L.',
	'St.Fran',
	'asd s.a.l.',
	'St.Mari t.M',
	'St.Mari t.M.',
	'Ñ.O.Ñ.O');

$pattern = "/([a-zA-ZñÑ]\.([a-zA-ZñÑ]\.)+)/u";
foreach ($texts as $text) {
echo "\n". $text ."\n";
	preg_match_all($pattern, $text, $matches);
	
	foreach ($matches[0] as $match) {
		$replace = str_replace('.','', $match);
		echo " $match -> $replace\n";
		$text = str_replace($match, $replace, $text);
	}
	var_dump($text);
}
