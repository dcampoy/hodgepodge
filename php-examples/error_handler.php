<?php

function handler($errno, $errstr, $errfile, $errline) {
    echo "$errno, $errstr, $errfile, $errline \n";
}

set_error_handler('handler');

//$a++;
//eval("asdf");
@eval("qwerty");

