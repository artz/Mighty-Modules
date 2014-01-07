<? if ($card->state) { ?>
	<h4 class="card-state card-state-<?=$card->state?>"><?=ucfirst($card->state)?></h4>
<? } ?>

<h2 class="headline"><?=@$text?></h2>

<p class="card-meta">
	<? if ($source->url) { ?>
	<a href="<?=@$source->url?>" target="_blank">
	<? } ?>
		<span class="card-icon pull-left"><img src="<?=@$source->favicon?>" /></span>
    <span class="card-meta-content">
        <span class="card-author-name">@<?=@$source->name?></span> via
        <span class="card-source-name">Twitter</span>
    </span>
    <span class="card-meta-end">
			<? if ($source->url) { ?>
			<span class="aoli-chevron-right pull-right"></span>
			<? } ?>
			<? if (!$card->comment) { ?>
				<span class="card-ago"><?=@$ago?></span>
			<? } ?>
    </span>
	<? if ($source->url) { ?></a><? } ?>
</p>

<? if ($card->comment) { ?>
<p class="card-comment"><?=@$card->comment?></p>
<p class="card-meta">
	<span class="card-icon pull-left"><img src="<?=@$author->profile_image_url?>" /></span>
    <span class="card-meta-content">
        <span class="card-author-name"><?=@$author->display_name?></span>
    </span>
    <span class="card-meta-end">
			<span class="card-ago"><?=@$ago?></span>
    </span>
</p>
<? } ?>
