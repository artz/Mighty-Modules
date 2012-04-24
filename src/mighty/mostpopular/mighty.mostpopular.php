<?php

/*
    Mighty Most Popular Module

    ...

*/

    // Set up data options.
    $dataOptions = '';
    $header = 'Most Popular'; // This is just a test for adding a 'text' based field to Mighty Maker module for Most Popular Widget.

    // print_r( $options );
    // Artz: Seems like we need a way to set default options in PHP.
    // Not sure if somehow options can be shared between JS and PHP?
    if ( isset( $options->verticals ) ) {
        $verticals = $options->verticals;
        $verticals = explode( ",", $verticals );
    } else {
        $verticals = array();
    }

    // Trim any whitespace from vertical names
    // (comma-separated lists look better with spaces anyway)
    function trim_value(&$value) {
        $value = trim($value);
    }

    // For each item in verticals, trim whitespace
    array_walk($verticals, 'trim_value');

    // Live Data
    $Mighty = new Mighty();
    $data = $Mighty->getJSON('http://www.huffingtonpost.com/api/?t=most_popular_merged');

    // Local Data
    // $data = $Mighty->getJSON('mighty.mostpopular.json');

//    $data = json_decode( $data );
    $data = $data->response;

    // Sort data by verticals
    function sort_by_vertical( $a, $b ) {
        return $a->vertical_name > $b->vertical_name;
    }
    // Artz: See if using a closure here works?
    uasort($data, "sort_by_vertical");

    // If no verticals are requested, build a list of all the verticals returned by the API call
    if ( ! $verticals ) {
        for ( $i = 0; $i < count( $data ); $i++ ) {
            if ( ! in_array( $data[$i]->vertical_name, $verticals ) ) {
                $verticals[] = $data[$i]->vertical_name;
            }
        }
    }

    /*
    echo "<pre><code>";
    print_r( $data );
    echo "</code></pre>";
    */

?>
<div class="mighty-mostpopular mighty-reset">
    <h2>Huffpost</h2>
    <h3><?php echo $header; ?></h3>

    <?php // Artz: Does this (what I did) work?
            for ( $i = 0, $l = count( $verticals ); $i < $l; $i++ ) : ?>
        <!-- Artz: Move this to a <b> inside of <h3> above. -->
        <h3 class="tab"><?php echo $verticals[$i]; ?></h3>

        <div class="panel">
            <ul>
        <?php for ( $j = 0; $j < count( $data ); $j++ ) :
                $entry = $data[$j];
                if ( $entry->vertical_name == $verticals[$i] ) : ?>
                <li>
                    <a href="<?php echo $entry->entry_url; ?>"><img src="<?php echo $entry->entry_image; ?>"></a>
                    <a href="<?php echo $entry->entry_url; ?>" title="<?php echo $entry->entry_title ?>" >
                        <?php
                            // Artz: Give some thought to the value of the title attribute.
                            // Perhaps it should store the excerpt instead, and we give
                            // the user a "quickread" sort of experience.
                            if ( ! empty( $entry->entry_front_page_title ) ) {
                                echo $entry->entry_front_page_title;
                            } else {
                                echo $entry->entry_title;
                            }
                        ?>
                    </a>
                    <div class="fb-like" data-href="<?php echo $entry->entry_url; ?>" data-send="false" data-layout="button_count" data-width="450" data-show-faces="false" data-font="arial"></div>
                </li>
            <?php endif;
                endfor; ?>
            </ul>
        </div>
    <?php endfor; ?>
</div>
