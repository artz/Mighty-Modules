<?php

// Set up data options.
$dataOptions = '';
$count = ''; // Declaring the variable for number of items from data-count
$ads = ''; // Var for ads


if ( isset( $options ) ) {
    foreach ( $options as $key => $value ) {
        $dataOptions .= ' data-' . $key . '="' . $value . '"';
        if ( $key == "count" ){
            $count .= $value; // This will pickup the numitems from data-count
        }
        if ( $key == "ads" ){
            $ads .= $value; // This will pickup the ad setting from data-ads
        }

    }
}

$numItems = (isset($_GET['count'])) ? $_GET['count'] : $count;

/*
 * The following curl method should be used on production.
 */

$c = curl_init();
curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($c, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Content-Type: application/json'));
curl_setopt($c, CURLOPT_URL, 'http://www.huffingtonpost.com/api/?t=featured_news&vertical=home&zone=1,4');
//curl_setopt($c, CURLOPT_URL, '../api/hpapi.json');

$content = curl_exec($c);
curl_close($c);


//$content = file_get_contents($_SERVER["DOCUMENT_ROOT"].'/api/hpapi.json'); // This is not for production

$json = json_decode($content);

//print_r($json);
?>
<div class="mighty-breakingnews mighty-reset">
<h2 class="header">Breaking News</h2>
    <div class="articles">
        <ul class="article-list">
<?php
    foreach($json->response as $key=>$value){
        $url = $value->entry_url;
        $img = $value->entry_image_large;
        $short_title = ''; //$value->entry_headline;
        $long_title = $value->entry_title;
        $comment = $value->entry_comment_count;

        if ($key == "0"){
            if ( empty($img) ){
                $img = "http://i.huffpost.com/gen/360023/thumbs/r-MONEY-medium260.jpg"; // Placeholder image, if first result does not have an image;
            }
            ?>
            <li><a href="<?php echo $url;?>">
                    <img class="thumb" src="<?php echo $img; ?>" alt="" />
                    <h2><?php echo $short_title; ?></h2>
                    <?php echo $long_title; ?>
                    <span class="comments"><b>Comments</b>(<?php echo $comment; ?>)</span>
                </a>
            </li>
            <?php
            }if($key < $numItems && $key != 0 ) { ?>
            <li><a href="<?php echo $url;?>">
                    <?php echo $long_title; ?>
                </a>
            </li>

            <?php

            }
    }
?>
        </ul>
</div>
<a name="mighty" class="mighty-breakingnews"<?=$dataOptions?> href="http://www.mightymodules.com/source/">Get the <b>Breaking News Module</b></a>
</div>
