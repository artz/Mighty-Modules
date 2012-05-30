<?php
/*
    Mighty Most Popular Module
    Displays the most popular content from across the AOL network.

    Options:
        heading
        sub_hedaing
        source
        sort
        count
*/
if (isset($options->heading)): $heading = '<h2>' . $options->heading . '</h2>'; endif;
if (isset($options->sub_heading)): $sub_heading = '<h3>' . $options->sub_heading . '</h3>'; endif;

// Set up sorting.
$sort = '';
if (isset($options->sort) && $options->sort === 'viral'): $sort = '&viral_sort=1'; endif;

// Call API
$Mighty = new Mighty();
$json = $Mighty->getJSON('http://www.huffingtonpost.com/api/?t=most_popular_merged' . $sort);

if (isset($json)):

$articles = $json->response;
// print_r($articles);

if (count($articles) > 0):
?>
<div class="mighty-mostpopular">
    <?=@$heading?>
    <?=@$sub_heading?>
    <ol>
<?  foreach ($articles as $article):

        // Title falls back to entry title.
        $title = $article->entry_front_page_title;
        if (!$title): $title = $article->entry_title; endif;

        // If source option is set, show source site.
        if (isset($options->source)): $source = '<i><a href="' . $article->vertical_link . '">' . ($article->source === 'HuffPo' ? 'HuffPost ' : '') . $article->vertical_name . '</a></i>'; endif;
?>      <li>
        <a href="<?=@$article->entry_url?>"><img width="74" height="58" alt="<?=@$article->entry_image_keywords?>" src="<?=$Mighty->option("basePath").'images/x.gif'?>" data-src="<?=@$article->entry_image?>"></a>
        <?=@$source?>
        <b><a href="<?=@$article->entry_url?>"><?=@$title?></a></b>
        </li>
<?  endforeach; ?>
    </ol>
</div>
<?php
endif;
endif;
