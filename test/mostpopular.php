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
    <h2>Most Popular Widget (API)</h2>
    <?php
        require_once("../src/lib/mighty.php");
        $amber = new MightyModule("mighty.mostpopular");
        $amber->render(array('heading' => 'Dave Artz', 'sort' => 'viral'));
    ?>

    <h2>Most Popular Widget (Embed)</h2>
    <a name="mighty" class="mighty-mostpopular" href="http://www.mightymodules.com/mostpopular/">Get the <b>Most Popular Widget</b></a>
    <script async defer src="../src/mighty.js"></script>

    <h2>Mighty Maker (Most Popular Widget)</h2>
    <div class="mighty-maker"><a name="mighty" class="mighty-maker" data-module="mostpopular" href="http://www.mightymodules.com/source/">Get the <b>Maker Widget</b></a></div>
    <script async defer src="../src/mighty.js"></script>
</div>
</body>
</html>
