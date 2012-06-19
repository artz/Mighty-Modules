<?php

$Mighty = new Mighty();
$json = $Mighty->getJSON('http://www.huffingtonpost.com/api/?t=most_popular_merged&viral_sort=1&i=1h');

if (!isset($json->response)): exit; endif;

// Set up count if not supplied.
 $count = 6;
 if (isset($options->count)): $count = $options->count; endif;

/*
 * This function is to sort the array based on viral_views
 */
function sortStdArray($array,$index) {
    $sort=array() ;
    $return=array() ;

    for ($i=0; isset($array[$i]); $i++)
        $sort[$i]= $array[$i]->{$index};

        arsort($sort) ;

    foreach($sort as $k=>$v)
        $return[]=$array[$k] ;

        return $return;
}


/*
 * This function is to truncate the title.
 */
function truncate ($str, $length=10, $trailing='...') {
      $length-=mb_strlen($trailing);
      if (mb_strlen($str)> $length) {
         // string exceeded length, truncate and add trailing dots
         return mb_substr($str,0,$length).$trailing;
      }else{
         // string was already short enough, return the string
         $res = $str;
      }
      return $res;
}

$output = sortStdArray($json->response, "viral_views");
?>
<div class="mighty-realtime mighty-reset">
    <h2 class="header">What&rsquo;s Being Read</h2>
    <ul class="mighty-realtime-ul">
<?php

    foreach ($output as $key=>$value): // Comment this, if sorted results are needed.
        if ($key <= $count-1):
                $url = $value->entry_url;
                $title = ($value->entry_front_page_title) ? $value->entry_front_page_title : $value->entry_title;
                $vertical = $value->vertical_name;
                $views = number_format($value->viral_views);

                // Doing the following bit to assign vertical colors
                // for non-huffingtonpost sites. HP API does not return
                // any color for non-HP sites.
                // TODO: Change this to a color based on relative hotness.
                if (!empty($value->vertical_color)){
                    $vcolor = $value->vertical_color;
                } else {
                    if ( $vertical == "AOL TV" ) {
                        $vcolor = "006B9A";
                    } elseif ( $vertical == "Daily Finance" ) {
                        $vcolor = "288BCB";
                    } elseif ( $vertical == "Moviefone Blog" ) {
                        $vcolor = "ED382E";
                    } else {
                        $vcolor = "3BD512";
                    }
                }
?>
        <li class="mighty-realtime-li" data-vcolor="<?php echo "#".$vcolor; ?>" title="<?php echo $title; ?>">
            <span class="mighty-realtime-title" data-vcolor="<?php echo "#".$vcolor; ?>">
                <a href="<?php echo $url ?>"><?php echo truncate($title,40); ?></a>
            </span>
            <a class="arrow"></a>
            <span class="mighty-realtime-views">
                <a href="<?php echo $url ?>"><?php echo $views; ?></a>
            </span>
        </li>
<?php
        endif;
    endforeach;
?>
    </ul>
    <div class="footer-links">
        <a class="huffpost-logo" href="http://www.huffingtonpost.com/">Breaking News and Opinion on The Huffington Post</a>
    </div>
</div>
