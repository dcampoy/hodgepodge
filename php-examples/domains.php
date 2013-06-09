<?php



function getDomain($url) {
	$pattern = "/^((http(s)?:\/\/)?([^\/]+)(\/)?)(.*)/";
	if (preg_match($pattern, $url, $matches)) {
		return $matches[4];
	} else {
		return NULL;
    }
}

echo getDomain('javascript:void(0)');
