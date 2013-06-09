<!DOCTYPE html>
<html>
<head>
	<link href='http://fonts.googleapis.com/css?family=Ubuntu+Mono' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" type="text/css" href="style.css" /> 
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
	<script src="interactions.js"></script>
</head>
<body>
<div id="tabmenu">
	<a class="selected" href="#">main.c</a>
	<a href="#">Curriculum.java</a>
	<a href="#">Games.php</a>
	<a href="#">thoughts.pl</a>
</div>
<div id="buffer" contenteditable="true">
<pre><code>
/********************************
 * Hello world!
 ********************************/
int main(int argc, char[] argv) {
	printf("Hello World");
}
</code></pre>
</div>

<div id="footer">
	<div id="mode" class="left"></div>
	<div class="right">12,9 All</div>
</div>

</body>
</html>
