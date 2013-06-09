<?php
$json = '{"saludo":"hola maria"}';
$comm = '/* comentario */';

var_dump(json_decode($json));
var_dump(json_decode($comm . $json));

