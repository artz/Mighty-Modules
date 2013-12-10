<?php

    $url = "https://github.com/artzstudio/Mighty-Modules/commits/master.atom";
    $ch = curl_init($url);
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
    $response = simplexml_load_string(curl_exec($ch));
    curl_close($ch);
    if (isset($response->entry)) {
        $commits = $response->entry;
    } else {
        $commits = array();
    }

    // http://www.php.net/manual/en/function.time.php#91864
    function ago($tm,$rcs = 0) {
        $cur_tm = time(); $dif = $cur_tm-$tm;
        $pds = array('second','minute','hour','day','week','month','year','decade');
        $lngh = array(1,60,3600,86400,604800,2630880,31570560,315705600);
        for($v = sizeof($lngh)-1; ($v >= 0)&&(($no = $dif/$lngh[$v])<=1); $v--); if($v < 0) $v = 0; $_tm = $cur_tm-($dif%$lngh[$v]);

        $no = floor($no); if($no <> 1) $pds[$v] .='s'; $x=sprintf("%d %s ",$no,$pds[$v]);
        if(($rcs == 1)&&($v >= 1)&&(($cur_tm-$_tm) > 0)) $x .= time_ago($_tm);
        return $x;
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <title>Mighty Module Factory</title>
  <meta name="description" content="">
  <meta name="author" content="Dave Artz">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="stylesheet" href="css/style.css?v=2">
</head>

<body>

<div class="header">
    <h1 class="logo"><img src="css/mighty-logo.png" width="324" height="185"
        alt="">Mighty Modules</h1>
</div>

<div class="chooser">
    <h2>Pick a Module</h2>
    <ul>
        <li><a class="widget" data-widget="mini" href="#">Mini</a></li>
        <li><a class="widget" data-widget="mostpopular" href="#">Most Popular
            Stories</a></li>
        <li><a class="widget" data-widget="breakingnews" href="#">Breaking News</a></li>
        <li><a class="widget" data-widget="bloggers" href="#">Featured Bloggers</a></li>
<!--        <li><a class="widget" data-widget="slideshow"
    href="#">Slideshow</a></li>
        <li><a class="widget" data-widget="mostwatchedvideos" href="#">Most
            Watched Videos</a></li>-->
        <li><a class="widget" data-widget="realtime" href="#">What's Being Read</a></li>
        <li><a class="widget" data-widget="localnews" href="#">Local News</a></li>
        <li><a class="widget" data-widget="amber" href="#">Amber Alerts</a></li>
        <li><a class="widget" data-widget="autos_lifestyle" href="#">AOL Autos - Lifestyle</a></li>
        <li><a class="widget" data-widget="autos_newcar" href="#">AOL Autos - New Car</a></li>
    </ul>
</div>

<div class="factory">
    <h1>Welcome to Mighty Modules</h1>
    <p>Our goal is to provide a simple, fast, SEO-friendly platform for widget
    deployment. Check out our
    <a href="https://trello.com/board/mighty-modules/4fc7d67b578636997b45e9e7">Trello
        board</a> to see what we&rsquo;re up to, or paruse our modules below. </p>
    <ul class="widgets">
        <li class="widget" data-widget="mini">
            <h3>Mini</h3>
            <p>Displays the Mini cards feed.</p>
        </li>
        <li class="widget" data-widget="mostpopular">
            <h3>Most Popular Stories</h3>
            <p>Surfaces the most popular content in a vertical or keyword, ensuring your visitors are a click away from the hottest stories on the web.</p>
        </li>
        <li class="widget" data-widget="breakingnews">
            <h3>Breaking News</h3>
            <p>Must see and trending content ensure your visitors have immediate, real time access to content before anyone else on the web.</p>
        </li>
        <li class="widget" data-widget="bloggers">
            <h3>Featured Bloggers</h3>
            <p>Featured Bloggers</p>
        </li>
<!--        <li class="widget" data-widget="slideshow">
            <h3>Slideshow</h3>
            <p>Pictures are worth a thousand words - satisfy your users' natural desire to witness breaking, popular photo galleries across our network of sites.</p>
        </li>
        <li class="widget" data-widget="mostwatchedvideos">
            <h3>Most Watched Videos</h3>
            <p>Viral videos are key drivers of visitor engagement. Give your users the best of the web.</p>
            </li>-->
        <li class="widget" data-widget="realtime">
            <h3>What's Being Read</h3>
            <p>What people are reading right now!!!</p>
        </li>
        <li class="widget" data-widget="localnews">
            <h3>Local News</h3>
            <p>News from your City!!!</p>
        </li>
        <li class="widget" data-widget="amber">
            <h3>Amber Alerts</h3>
            <p>Widget that displays current Amber Alerts.</p>
        </li>
        <li class="widget" data-widget="autos_lifestyle">
            <h3>AOL Autos - Lifestyle Research</h3>
            <p>Description coming soon! Cough, Andy.</p>
        </li>
        <li class="widget" data-widget="autos_newcar">
            <h3>AOL Autos - New Car Research</h3>
            <p>Description coming soon! Cough, Andy.</p>
        </li>
    </ul>

    <div class="commits">
    <h2>Recent Code Updates</h2>
<?
    $day = '';
    foreach ($commits as $commit) {

        $commit_day = date('F j, Y', strtotime($commit->updated));

        if ($commit_day !== $day) {
            if ($day !== '') {
                echo '</ul>';
            }
            echo '<h3>' . $commit_day . '</h3><ul>';
            $day = $commit_day;
        }

        echo '<li><a class="title" href="' . $commit->link->attributes()->href . '">' .
        $commit->title . '</a> <i><a href="' . $commit->author->uri . '">' .
        $commit->author->name . '</a> authored ' .
        /*date('M j \a\t g:i A T', strtotime($commit->updated))*/
        ago(strtotime($commit->updated)) . ' ago</i></li>';
    }
?>
    </ul>
    <p><b><a href="https://github.com/artzstudio/Mighty-Modules/commits/master">Mighty Module Update History</a></b> ☛</p>
    </div>
</div>

<script src="mighty.js"></script>
<script src="js/jquery.min.js"></script>
<script src="js/factory.js"></script>
</body>
</html>
