<?php

// Set up data options.
$dataOptions = '';
$count = ''; // Declaring the variable for number of items from data-count
$vertical = ''; // Var for vertical name in slug format - data-vertical

if ( isset( $options ) ) {
    foreach ( $options as $key => $value ) {
        $dataOptions .= ' data-' . $key . '="' . $value . '"';
        if ( $key == "count" ){
            $count .= $value; // This will pickup the numitems from data-count
        }
        if ( $key == "vertical" ){
            $vertical .= $value; // This will pickup the vertical names from data-vertical
        }
    }
}

$count = ( !empty($count) ) ? $count : 7;
$vertical = ( !empty($vertical) ) ? $vertical : "chicago";
$vname = ( !empty($vname) ) ? $vname : "Chicago";

/*
 * The following curl method should be used on production.
 */

$Mighty = new Mighty();
$json = $Mighty->getJSON('http://www.huffingtonpost.com/api/?t=featured_news&limit=7&vertical=' . $vertical);
if (!isset($json->response)): exit; endif;

$vname = $json->response[0]->vertical_name;
$vcolor = $json->response[0]->vertical_color;

//print_r($json);
?>
<div class="mighty-localnews mighty-reset">
    <div class="header">
        <h2>HuffPost</h2>
        <span class="vertical-name" style="color: #<?php echo $vcolor; ?>"><?php echo $vname; ?></span>
    </div>
    <div class="articles">
        <ul class="article-list">
<?php
    foreach($json->response as $key=>$value){
        $url = $value->entry_url;
        $img = $value->entry_image_large;
        $short_title = $value->entry_headline;
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
            }if($key < $count && $key != 0 ) { ?>
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
</div>
