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

if (!isset($options->qa)) {
	$options->qa = false;
}

// Call API
$Mighty = new Mighty();

if ($options->qa === "true" || $options->qa === "on") {
	$path = 'http://qa.mini.aol.com/api/1.0/cards?';
} else {
	$path = 'http://mini.engadget.com/api/1.0/cards?';
}

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
	$content = $card->content;
	$author = $card->author;

	$updated = date_create();
	date_timestamp_set($updated, $card->updated);

	$now = date_create();
	$diff = date_diff($updated, $now);
	if ($diff->format('%h') < 1) {
		if ($diff->format('%i') < 1) {
			$ago = 'just now';
		} else {
			$ago = $diff->format('%i') . 'm';
		}
	} else {
		$ago = $diff->format('%h') . 'h';
	}

	if (!empty($card->content->text)) {
		// Wrap Links with anchor tags
		$text = preg_replace(
			"#((http|https|ftp)://(\S*?\.\S*?))(\s|\;|\)|\]|\[|\{|\}|,|\"|'|:|\<|$|\.\s)#ie",
			"'<a href=\"$1\" target=\"_blank\">$3</a>$4'",
			$card->content->text
		);

		$text = preg_replace(
			'/@([A-z_]\w+)/',
			"<a href=\"https://twitter.com/$1\" target=\"_blank\">@$1</a>",
			$text
		);

		// Wrap hash tags with links to a search
		$text = preg_replace(
			'/#([A-z_]\w+)/',
			"<a href=\"https://twitter.com/search?q=%23$1&src=hash\" target=\"_blank\">#$1</a>",
			$text
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

<? @include 'cards/' . $card->card_type->name . '.php'; ?>

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
		<a class="apple" href="https://itunes.apple.com/us/app/engadget-mini-real-time-updates/id739969887?ls=1&mt=8"></a>
		<a class="google" href="https://play.google.com/store/apps/details?id=com.aol.mini.engadget&hl=en"></a>
	</div>
</div>
<?php
endif;
endif;
