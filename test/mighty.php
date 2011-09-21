<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>Mighty Module Test Page</title>
<meta name="description" content="Test page for Mighty Modules.">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="shortcut icon" href="/favicon.ico">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="stylesheet" href="css/style.css">

<!-- Eventually we will incorporate Boot into mighty.js -->
<!--<script src="../../Boot/src/boot.js"></script>-->
<!--<script src="https://raw.github.com/artzstudio/Boot/master/src/boot.js"></script>-->

</head>

<body>
<h1><b>Mighty</b><b>Module</b> Test Page</h1>
<div class="content">
<pre id="log" style="font-size:12px;"></pre>
<script src="../src/mighty/mighty.js"></script> 
<script>
Mighty.log.init({ elem: document.getElementById("log") });
</script>

	<h2>Source Widget #1</h2>
	<!-- Simulates an API call to our Widget Factory -->
	<?php
		require_once("../api/widget-api.php");
		getWidget("mighty-source", array("width" => 500)); //include( "../src/api/mighty.source/index.php" ); ?>
	<script async defer src="../src/mighty/mighty.js"></script>

	<h2>Source Widget #2</h2>
	<a name="mighty" class="mighty-source" data-selected="1" href="http://www.mightymodules.com/source/">Get the <b>Source Widget</b></a>
	<script async defer src="../src/mighty/mighty.js"></script>
<!--
	<h2>Maker Module</h2>
	<div class="mighty-maker"><a name="mighty" class="mighty-maker" data-blueprint="mostpopular" href="http://www.mightymodules.com/source/">Get the <b>Maker Widget</b></a></div>
	<script async defer src="../src/mighty.js"></script>

<!--
	<h2>Source Widget #3</h2>
	<a name="mighty" class="mighty-source2" data-width="200" href="http://www.mightymodules.com/source2/"><b>Source</b> Mighty Module</a>
	<script defer src="../src/mighty.js"></script>


	<h2>Most Popular Widget</h2>
	<div class="mighty-mostpopular"><a name="mighty" class="mighty-mostpopular" href="http://www.mightymodules.com/source/">Get the <b>Most Popular Module</b></a></div>
	<script async defer src="../src/mighty.js"></script>

<!-- 
	Example FB Code:
	
	<script>(function(d){
	  var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
	  js = d.createElement('script'); js.id = id; js.async = true;
	  js.src = "//connect.facebook.net/en_US/all.js#appId=231151476937456&xfbml=1";
	  d.getElementsByTagName('head')[0].appendChild(js);
	}(document));</script>
	<div class="fb-like" data-send="true" data-width="450" data-show-faces="true"></div>
-->
<!--
<h2>Breaking News Widget</h2>
<div class="mighty-breakingnews"><a name="mighty" class="mighty-breakingnews" href="http://www.mightymodules.com/source/">Get the <b>Breaking News Module</b></a></div>
<script async defer src="../src/mighty.js"></script>
-->
</div>
</body>
</html>