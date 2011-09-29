<?php
	error_reporting(E_ALL);
?>
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
<!-- Advertisement Setup start -->
<script type="text/javascript" src="http://o.aolcdn.com/ads/adsWrapper.js"></script>
<script type="text/javascript">
<!-- 
adSetTarget('_blank');
adSetAdURL('/_uac/adpage.html'); 
//-->
</script>
<!-- Advertisement Setup end -->
</head>

<body>
<h1><b>Mighty</b><b>Module</b> Test Page</h1>
<div class="content">
<pre id="log" style="font-size:12px;"></pre>
<script src="../src/mighty/mighty.js"></script> 
<script>
Mighty.log.init({ elem: document.getElementById("log") });
</script>

<!--	<h2>Source Widget (API)</h2>
	<!-- An API call to our Widget Factory, critical for SEO. -->
<!--<?php
	require_once("../src/api/widget-api.php");
	MM_Widget::render("mighty.source", array("width" => 500));
?>

<h2>Source Widget (Embed)</h2>
<!-- Our standard embed code. -->
<!--
<a name="mighty" class="mighty-source" data-selected="1" data-numItems="6" href="http://www.mightymodules.com/source/">Get the <b>Source Widget</b></a>
<script async defer src="../src/mighty/mighty.js"></script>
-->
<h2>Mighty Maker (Source)</h2>
    <!--
	<div class="mighty-maker"><a name="mighty" class="mighty-maker" data-module="source" href="http://www.mightymodules.com/source/">Get the <b>Maker Widget</b></a></div>
	<script async defer src="../src/mighty/mighty.js"></script>
    -->

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
<h2>Breaking News Widget (API)</h2>
<?php
	require_once("../src/api/widget-api.php");
	MM_Widget::render("mighty.breakingnews", array("count" => 3, "ads" => 2 ));
?>
-->
<h2>Breaking News Widget (Embed)</h2>
<a name="mighty" class="mighty-breakingnews" data-count="5" data-ads="2" href="http://www.mightymodules.com/breaking-news/">Get the <b>Breaking News Module</b></a>
<script async defer src="../src/mighty/mighty.js"></script>

<div class="mighty-maker"><a name="mighty" class="mighty-maker" data-module="breakingnews" href="http://www.mightymodules.com/breakingnews/">Get the <b>Maker Widget</b></a></div>
<script async defer src="../src/mighty/mighty.js"></script>

<h2>Most Popular Widget (API)</h2>
<!-- An API call to our Widget Factory, critical for SEO. -->
<?php
	require_once("../src/api/widget-api.php");
	//getWidget("mighty.mostpopular", array("verticals" => "Politics,Business, Entertainment", "width" => 300));
	//getWidget("mighty.mostpopular", array("verticals" => "AOL TV, Sports, Home", "width" => 300));
	MM_Widget::render("mighty.mostpopular", array("width" => 300));
?>

<h2>Most Popular Widget (Embed)</h2>
<a name="mighty" data-width="300" class="mighty-mostpopular" href="http://www.mightymodules.com/mostpopular/">Get this <b>Widget</b></a>
<script async defer src="../src/mighty/mighty.js"></script>

</div>
</body>
</html>
