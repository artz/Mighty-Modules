<?php

error_reporting(-1);

// Set up data options.
$dataOptions = '';
$header = 'Photo Galleries'; // This is just a test for adding a 'text' based field to Mighty Maker module for Most Popular Widget.

if ( isset( $options ) ) {
    foreach ( $options as $key => $value ) {
        $dataOptions .= ' data-' . $key . '="' . $value . '"';
        if ( $key == "header" ){
            $header = $value; // This will pickup the header name from data-header
        }
    }
}

$c = curl_init();
curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($c, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Content-Type: application/json'));
curl_setopt($c, CURLOPT_URL, 'http://www.huffingtonpost.com/slideshow/api/search.php?popular&limit=10');

$content = curl_exec($c);
curl_close($c);

$slideshows = json_decode($content);

//print_r($slideshows);

$i = 0;

$slideShowsCount = 0;

?>
<div class="mighty-slideshow mighty-reset">
    <div class="mighty-slideshow-header">
        <h1><?php echo $header; ?></h1>
    </div>
    <div class="mighty-slideshow-viewer">

<?php foreach ( $slideshows as $slideshow ) {

    $slideCount = count( $slideshow->slides );

    if ( $slideCount !== 0 ) {

        if ( $i === 0 ) {
            //build featured slideshow
            $ulWidth = $slideCount * 298;
            $firstHeadline = !empty($slideshow->front_headline) ? $slideshow->front_headline : $slideshow->entry_title;

            echo '<ul class="mighty-slideshow-viewer-ul" style="width:'.$ulWidth.'px;">';

            foreach ( $slideshow->slides as $slide ) {
                echo '<li class="mighty-slideshow-viewer-li"><img data-src="'.$slide.'" src="" width="292"></li>';
            }

            echo '</ul>';

        } else {
            $slideShowsCount .= 2;
            //build more slideshows
        }

        $i .= 1;

    }

} ?>
        <div class="mighty-slideshow-controls">
            <div class="mighty-slideshow-controls-prev">previous slide</div>
            <div class="mighty-slideshow-controls-next">next slide</div>
        </div>
        <div class="clearboth"></div>
        <h3><?=$firstHeadline;?></h3>
    </div>
    <div class="mighty-slideshow-prev">previous</div>
    <div class="more-slideshows">
        <ul style="width: 596px; ">
            <li>
                <a href="http://www.huffingtonpost.com/2011/09/30/eco-friendly-ponchos-cloaks-capes_n_989061.html">
                    <img src="http://i.huffpost.com/gen/364693/thumbs/s-ECOFRIENDLY-CAPES-small.jpg">
                    <h4>Stay Warm And Eco-friendly This Fall</h4>
                </a>
            </li>
        </ul>
        <div class="clearboth"></div>
    </div>
    <div class="mighty-slideshow-next">next</div>
    <div class="clearboth"></div>
</div>
