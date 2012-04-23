<?php

// Set up data options.
$dataOptions = '';
$ads = ''; // Var for ads
$count = ''; // Var for limiting the number of videos


if ( isset( $options ) ) {
foreach ( $options as $key => $value ) {
$dataOptions .= ' data-' . $key . '="' . $value . '"';
if ( $key == "ads" ){
$ads .= $value; // This will pickup the ad setting from data-ads
}
if ( $key == "count" ){
$count .= $value; // This will pickup the count from data-count. It limits the number of videos to be displayed in the widget.
}

}
}

$count = ( !empty($count) ) ? $count : 10;
/*
* The following curl method should be used on production.
*/

$c = curl_init();
curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($c, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Content-Type: application/json'));
curl_setopt($c, CURLOPT_URL, 'http://www.huffingtonpost.com/api/?t=most_popular_merged&verticals=video&viral_sort=1&limit=20');

$content = curl_exec($c);
curl_close($c);

$json = json_decode($content);

//$count = $count-1; // Doing this, as the index always starts from 0
?>
<div class="mighty-mostwatchedvideos mighty-reset">
    <h2 class="header">Most Watched Videos</h2>
    <ul class="mighty-videos-ul">
    <?php
    foreach($json->response as $key=>$value){
    if ($key <= $count){
    $url = $value->entry_url;
    $img = $value->entry_image_large;
    $title = ($value->entry_front_page_title) ? $value->entry_front_page_title : $value->entry_title;
    ?>
        <li class="mighty-videos-li">
        <img src="<?php echo $img; ?>" data-href="<?php echo $url;?>" data-title="<?php echo $title;?>" data-src="<?php echo $img; ?>" />
        </li>
    <?php

    } // IF condition closes here
    } // End Foreach

    ?>
    </ul>
    <div class="mighty-mostwatchedvideos-controls">
        <div class="mighty-mostwatchedvideos-controls-prev">previous slide</div>
        <div class="mighty-mostwatchedvideos-controls-next">next slide</div>
    </div>
</div>
