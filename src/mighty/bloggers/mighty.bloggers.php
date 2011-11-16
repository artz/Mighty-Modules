<?php

// Set up data options.
$dataOptions = '';
$count = ''; // Declaring the variable for number of items from data-count


if ( isset( $options ) ) {
	foreach ( $options as $key => $value ) {
		$dataOptions .= ' data-' . $key . '="' . $value . '"';
		if ( $key == "count" ){
			$count .= $value; // This will pickup the numitems from data-count
		}
	}
}

$count = ( !empty($count) ) ? $count : 7;

/**
 * Modifies a string to remove all non ASCII characters and spaces.
 * Note : Works with UTF-8
 * @param  string $string The text to slugify
 * @return string         The slugified text
 */
function slugify ($string) {
  $string = utf8_decode($string);
  $string = html_entity_decode($string);
 
  $a = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ';
  $b = 'AAAAAAaaaaaaOOOOOOooooooEEEEeeeeCcIIIIiiiiUUUUuuuuyNn';
  $string = strtr($string, utf8_decode($a), $b);
 
  $ponctu = array("?", ".", "!", ",");
  $string = str_replace($ponctu, "", $string);
 
  $string = trim($string);
  $string = preg_replace('/([^a-z0-9]+)/i', '-', $string);
  $string = strtolower($string);
 
  if (empty($string)) return 'n-a';
 
  return utf8_encode($string);
}

/*
 * The following curl method should be used on production. 
 */
 
$c = curl_init();
curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($c, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Content-Type: application/json'));
curl_setopt($c, CURLOPT_URL, 'http://www.huffingtonpost.com/api/?t=featured_news&vertical=aol&zone=4&limit=7');

$content = curl_exec($c);
curl_close($c);

$json = json_decode($content);

?>
<div class="mighty-bloggers">
		<h2 class="header">Featured Bloggers</h2>
	<div class="articles">
		<ul class="article-list">
<?php
	foreach($json->response as $key=>$value){
		$url = $value->entry_url;
		$img = $value->author_headshot;
		$author = $value->author_name;
		$authorslug = slugify( $author );
		$short_title = $value->entry_headline;
		$long_title = $value->entry_title;
		$comment = $value->entry_comment_count;
		$vname = $value->vertical_name;
		$vlink = $value->vertical_link; 
		
			if ($key == 0){	
				if ( empty($img) ){
					$img = "http://i.huffpost.com/gen/360023/thumbs/r-MONEY-medium260.jpg"; // Placeholder image, if first result does not have an image;
				}
				?>
			<li class="first-result">
				<a class="huffpost-logo" href="http://www.huffingtonpost.com/">Breaking News and Opinion on The Huffington Post</a>
						<div class="main-promo">
							<a href="http://www.huffingtonpost.com/<?php echo $authorslug; ?>"><img class="thumb" src="<?php echo $img; ?>" alt="" /></a>
							<div class="author-info-main">
								<span class="author-name"><a href="http://www.huffingtonpost.com/<?php echo $authorslug; ?>"><?php echo $author; ?></a></span>
								<span class="vertical-name"><a href="<?php echo $vlink; ?>"><?php echo $vname; ?></a></span>
							</div>
						</div>
						<a href="<?php echo $url;?>">
						<h2><?php echo strip_tags($short_title); ?></h2>
						<span class="comments"><b>Comments</b>(<?php echo $comment; ?>)</span>
					    </a>
		</li>
			<?php 
			} else { 
				if ( $key < $count ){
			?>
			<li class="article-list-post">
				<div class="author-info-list">
					<span class="author-name"><a href="http://www.huffingtonpost.com/<?php echo $authorslug; ?>"><?php echo $author; ?></a></span>
					<span class="vertical-name"><a href="<?php echo $vlink; ?>"><?php echo $vname; ?></a></span>
				</div>
				<a href="<?php echo $url;?>" class="list-post-title">
					<?php echo strip_tags($short_title); ?>
				</a>
				<span class="comments"><b>Comments</b>(<?php echo $comment; ?>)</span>					
			</li>
			
			<?php	
			
			}
			}
	}
?>
		</ul>
</div>
<a name="mighty" class="mighty-bloggers"<?=$dataOptions?> href="http://www.mightymodules.com/source/">Get the <b>Local News Module</b></a>
</div>
