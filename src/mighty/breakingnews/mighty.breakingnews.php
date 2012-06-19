<?php
$Mighty = new Mighty();
$json = $Mighty->getJSON('http://www.huffingtonpost.com/api/?t=featured_news&vertical=home&zone=1,4');

// Set up count if not supplied.
$count = 6;
if (isset($options->count)): $count = $options->count; endif;
if (!$json->response): exit; endif;
?>
<div class="mighty-breakingnews mighty-reset">
    <h2 class="header">Breaking News</h2>
    <div class="articles">
        <ul class="article-list">
<?php
    foreach ($json->response as $number => $article):
        $short_title = ''; //$article->entry_headline;
        $long_title = $article->entry_title;
        $comment = $article->entry_comment_count;

        if ($number === 0):
?>
            <li><a href="<?=@$article->entry_url?>">
                    <img class="thumb" src="<?=@$article->entry_image_large?>" alt="<?=@$article->entry_image_keywords?>" />
                    <h2><?=@$article->entry_headline?></h2>
                    <h3><?=@$article->entry_title?></h3></a>
                    <span class="comments"><b>Comments</b> (<?=@$article->entry_comment_count?>)</span>
            </li>
<?php   elseif ($number > 1 && $number <= $count): ?>
            <li><a href="<?=@$article->entry_url?>"><?=@$article->entry_title?></a></li>
<?php   endif;
    endforeach;
?>
        </ul>
    </div>
</div>
