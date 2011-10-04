<?php

// Set up data options.
$dataOptions = '';
$ads = ''; // Var for ads


if ( isset( $options ) ) {
	foreach ( $options as $key => $value ) {
		$dataOptions .= ' data-' . $key . '="' . $value . '"';
		if ( $key == "ads" ){
			$ads .= $value; // This will pickup the ad setting from data-ads
		}
		
	}
}

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

?>
<div class="mighty-mostwatchedvideos">
<h2 class="header">Most Watched Videos</h2>
		<ul class="mighty-videos-ul">
<?php
	foreach($json->response as $key=>$value){
		$url = $value->entry_url;
		$img = $value->entry_image_large;
		$title = ($value->entry_front_page_title) ? $value->entry_front_page_title : $value->entry_title;
		?>
			<li class="mighty-videos-li">
				<img src="<?php echo $img; ?>" data-href="<?php echo $url;?>" data-title="<?php echo $title;?>" data-src="<?php echo $img; ?>" />
			</li>
			
			<?php	
			
			}
	
?>
		</ul>
		<div class="mighty-mostwatchedvideos-controls">			
			<div class="mighty-mostwatchedvideos-controls-prev">previous slide</div>
			<div class="mighty-mostwatchedvideos-controls-next">next slide</div>
		</div>
<a name="mighty" class="mighty-mostwatchedvideos"<?=$dataOptions?> href="http://www.mightymodules.com/source/">Get the <b>Most Watched Videos Module</b></a>
</div>