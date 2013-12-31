<?php
/*
	Mighty Mini Cards
	This module displays a feed of cards from a selected brand.

	Options:
		source
		count
		more_count
*/

date_default_timezone_set('UTC');

if (!isset($options->count)) {
	$options->count = '3';
}

// Call API
$Mighty = new Mighty();

$path = 'http://qa.mini.aol.com/api/1.0/cards?';
if (isset($options->continuation)) {
	$path .= 'limit=' . $options->more_count;
	$path .= '&continuation=' . $options->continuation;
} else {
	$path .= 'limit=' . $options->count;
	// Set an initial continuation key for debugging
	//$path .= '&continuation=' . '5283de1c25df6';
}

$json = $Mighty->getJSON($path);

if (isset($json)):

	$cards = $json->data->cards;

	if (count($cards) > 0):
?>

<div class="mini-header">
	<h1><?=ucfirst($cards[0]->brand)?> Mini</h1>
	<span class="reload"></span>
</div>

<div class="cards-list"
	data-continuation="<?=$json->data->continuation?>"
>
<? foreach ($cards as $card):
	$type_class = "card-type-" . $card->card_type->name;
	$source = $card->source;

	$updated = date_create();
	date_timestamp_set($updated, $card->updated);

	$now = date_create();
	$diff = date_diff($updated, $now);
	$ago = $diff->format("%h") . "h";

	if (!empty($card->content->text)) {
		$text = preg_replace(
			"#((http|https|ftp)://(\S*?\.\S*?))(\s|\;|\)|\]|\[|\{|\}|,|\"|'|:|\<|$|\.\s)#ie",
			"'<a href=\"$1\" target=\"_blank\">$3</a>$4'",
			$card->content->text
		);
	} else {
		$text = '';
	}
?>
	<article class="card card-list <?=$type_class?>"
		data-brand="<?=$card->brand?>"
		data-url="<?=$card->card_url?>"
		data-seo-url="<?=$card->seo_card_url?>"
	>

		<? switch ($card->card_type->name) {
		case "headline": ?>

		<? break; ?>
		<? case "quote": ?>

		<? break; ?>
		<? case "video": ?>

		<div
			class="card-video-poster"
			style="background-image:url('<?=@$card->content->media[1]->url?>')"
			data-content-source="<?=@$card->content->media[0]->content_source?>"
			data-url="<?=@$card->content->media[0]->url?>"
		>
				<div class="card-play"><i class="icon-play"></i></div>
		</div>

		<? break; ?>
		<? case "image": ?>
		<div class="card-image" style="background-image:url('<?=@$card->content->media[0]->url?>');"></div>
		<? break; ?>
		<? } ?>

		<? if ($card->state) { ?>
		<h4 class="card-state card-state-<?=$card->state?>"><?=ucfirst($card->state)?></h4>
		<? } ?>

		<h2 class="headline"><?=@$text?></h2>

		<? if (!empty($card->content->comment)) { ?>
		<p class="card-comment"><?=$card->content->comment?></p>
		<? } ?>

		<p class="card-meta">
			<span class="card-icon pull-left">
				<img src="<?=@$card->author->profile_image_url?>" />
			</span>

			<span class="card-meta-content">
				<span class="card-author-name"><?=$card->author->display_name?>
						<? if ($source->name) { ?>
						via <span class="card-source-name"><?=$source->name?></span>
						<? } ?>
				</span>
			</span>

			<span class="card-meta-end">
				<span class="card-ago"><?=$ago?></span>
			</span>

			<div class="card-meta-share">
				<ul>
					<li class="share facebook">Facebook</li>
					<li class="share twitter">Twitter</li>
					<li class="share email">Email</li>
				</ul>
			</div>
		</p>

	</article>
	<? endforeach; ?>

	<?
	$root = parse_url($cards[0]->card_url);
	$root_url = $root['scheme'] . '://' . $root['host'];
	?>
	<div class="more">
		<a href="<?=@$root_url?>">More from Mini &rarr;</a>
	</div>
	<div class="download">
		<a class="apple" href="#"></a>
		<a class="google" href="#"></a>
	</div>
</div>
<?php
endif;
endif;
