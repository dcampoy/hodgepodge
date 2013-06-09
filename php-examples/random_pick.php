<?php

$wanted = 15;
$extractions = 100;
$granularity = 1000;
$repeat = 25;

$p = $granularity * $wanted / $extractions;

echo "I want get $wanted items in $extractions extractions so I need a prob of $p/$granularity\n";

for ($rep=1; $rep<=$repeat; $rep++) {
    $count = 0;
    for ($e = 0; $e < $extractions; $e++) {
        $value = rand(0,$granularity);
        if ($value < $p) $count++;
    }
    echo "$rep: $count\n";
}

