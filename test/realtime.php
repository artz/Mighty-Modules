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
</head>
<body>
<h1><b>Mighty</b><b>Module</b> Test Page</h1>

<div class="content">
    <h2>What's Being Read - Realtime ( API )</h2>

<?php
    require_once("../src/lib/mighty.php");
    $realtime = new MM_Widget();
    $realtime->render("mighty.realtime");
?>

    <h2>What's Being Read - Realtime ( Embed )</h2>

            <a name="mighty" class="mighty-realtime" href="http://www.mightymodules.com/realtime/">Get the <b>What's Being Read - Realtime Widget</b></a>
            <script async defer src="../src/mighty/mighty.js"></script>

   <h2>Mighty Maker (RealTime widget)</h2>

    <div class="mighty-maker"><a name="mighty" class="mighty-maker" data-module="realtime" href="http://www.mightymodules.com/source/">Get the <b>Maker Widget</b></a></div>
    <script async defer src="../src/mighty/mighty.js"></script>

</div>
</body>
</html>
