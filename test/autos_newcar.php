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
    <h2>Autos New Car Widget (API)</h2>
    <?php
        require_once("../src/lib/mighty.php");
        $amber = new MightyModule("mighty.autos_newcar");
        $amber->render();
    ?>

    <h2>Autos New Car Widget (Embed)</h2>
    <a name="mighty" class="mighty-autos_newcar" data-nohtml data-nojs href="http://www.mightymodules.com/amber/">Get the <b>Autos New Car Widget</b></a>
    <script async defer src="../src/mighty.js"></script>

   <h2>Mighty Maker (Autos New Car Widget)</h2>
    <div class="mighty-maker"><a name="mighty" class="mighty-maker" data-module="autos_newcar" href="http://www.mightymodules.com/source/">Get the <b>Maker Widget</b></a></div>
    <script async defer src="../src/mighty.js"></script>

</div>
</body>
</html>
