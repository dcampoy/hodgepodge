<?php

function signMessage($message, $secretKey) {

  unset($message['signature']);
  // If there is no timestamp, set one to avoid replay attacks
  if (!isset($message['timestamp'])) {
    $message['timestamp'] = time();
  }
  ksort($message);
  $data = '';
  foreach($message as $key => $value) {
    $data .= $key.'='.$value;
  }
  $data .= $secretKey;

  $message['signature'] = md5($data);
  return $message;
  
}

$secretKey = "M5/0HfGAo;6D)X,)5yW6}kK4wB)0jJu>";

$message = array(
	"description"=>"",
	"image_url"=>"",
	"item_id"=>11389,
	"price"=>7,
	"product_url"=>"",
	"timestamp"=>1295110888,
	"title"=>"G-Cash 65"
);

var_dump(signMessage($message, $secretKey));

