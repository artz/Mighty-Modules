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
<link rel="shortcut icon" href="../favicon.ico">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="stylesheet" href="css/style.css">
</head>

<body>
<h1><b>Mighty</b><b>Module</b> Test Page</h1>
<div class="content">
<pre id="log" style="font-size:12px;"></pre>
<script src="../src/mighty/mighty.js"></script>
<script>
Mighty.log.init({ elem: document.getElementById("log") });
Mighty.log("TODO: Download IE9 VM and test.");
Mighty.log("TODO: Get merged AMD working.");
Mighty.log("TODO: Make our API easier to include on any platform. Think Blogsmith, Java, PHP.");
Mighty.log("TODO: Add A/B/C testing of modules that go to separate directory in code, should they exist.");
Mighty.log("TODO: Hyphenated attributes should change to underscore or camelCase.");
Mighty.log("TODO: See if we really need Mighty.proxy.");
</script>

<h2>Source Widget (API)</h2>
<!-- An API call to our Widget Factory, critical for SEO. -->
<?php
    require_once("../src/lib/mighty.php");
    $source = new MightyModule("mighty.source", array("width" => 500));
    $source->render();
?>
<h2>Source Widget (Embed)</h2>
<!-- Our standard embed code. -->
<a name="mighty" class="mighty-source" data-selected="1" href="http://www.mightymodules.com/source/">Get the <b>Source Widget</b></a>
<script async defer src="../src/mighty/mighty.js"></script>

<h2>Mighty Maker (Source)</h2>
    <div class="mighty-maker"><a name="mighty" class="mighty-maker" data-module="source" href="http://www.mightymodules.com/source/">Get the <b>Maker Widget</b></a></div>
    <script async defer src="../src/mighty/mighty.js"></script>

</div>
</body>
</html>
