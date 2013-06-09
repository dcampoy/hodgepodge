<?php
error_reporting(E_ALL);

list($one,$two) = array("One", "Two");
list($one,) = array("One", "Two");
list(,$two) = array("One", "Two");
