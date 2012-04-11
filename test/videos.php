<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>Mighty Module Test Page</title>
<meta name="description" content="Test page for Mighty Modules.">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="shortcut icon" href="../favicon.ico">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="stylesheet" href="css/style.css">

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
	<h2>Most Watched Videos Widget ( API )</h2>

		<?php
			require_once("../src/api/widget-api.php");
			MM_Widget::render("mighty.mostwatchedvideos", array( "ads" => 1 ));
		?>

	<h2>Most Watched Videos Widget ( Embed )</h2>

		<a name="mighty" class="mighty-mostwatchedvideos" href="http://www.mightymodules.com/source/">Get the <b>Most Watched Videos Module</b></a>
		<script async defer src="../src/mighty/mighty.js"></script>

</div>
</body>
</html>
