<?php
	
/*
	Mighty Most Popular Module
	
    ...	

*/

	// Set up data options.
	$dataOptions = '';
	
	if ( isset( $options ) ) {
		foreach ( $options as $key => $value ) {
			$dataOptions .= ' data-' . $key . '="' . $value . '"';
		}
	}

<<<<<<< HEAD:src/api/mighty-mostpopular/index.php
    // print_r( $options );

    if ( isset( $options["verticals"] ) ) {
        $verticals = $options["verticals"];
        $verticals = explode( ",", $verticals );
    }

    // Trim any whitespace from vertical names
    // (comma-separated lists look better with spaces anyway)
    function trim_value(&$value) { 
        $value = trim($value); 
    }

    array_walk($verticals, 'trim_value');

    $data = file_get_contents( 'http://www.huffingtonpost.com/api/?t=most_popular_merged' );
    // $data = file_get_contents( '../src/api/mighty-mostpopular/mostpopular.json' );
=======
    $data = file_get_contents( '../src/mighty/mostpopular/mighty.mostpopular.json' );
>>>>>>> 6f1107d9e4dc157ed6f64bc881e06b20475233e5:src/mighty/mostpopular/mighty.mostpopular.php
    $data = json_decode( $data );
    $data = $data->response;

    // Sort data by verticals
    uasort($data, "sort_by_vertical");

    function sort_by_vertical( $a, $b ) {
        return $a->vertical_name > $b->vertical_name;
    }

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
<div id="fb-root"></div>
<script>(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) {return;}
js = d.createElement(s); js.id = id;
js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<div class="mighty-mostpopular">
	<h2>Huffpost</h2>
    <h3>Most Popular</h3>

    <?php for ( $i = 0; $i < count( $verticals ); $i++ ) : ?>

        <h3 class="tab"><?php echo $verticals[$i]; ?></h3>

        <div class="panel">
            <ul>

                <?php for ( $j = 0; $j < count( $data ); $j++ ) : ?>
                    <?php $entry = $data[$j]; ?>
                    <?php if ( $entry->vertical_name == $verticals[$i] ) : ?>
                        <li>
                            <a href="<?php echo $entry->entry_url; ?>"><img src="<?php echo $entry->entry_image; ?>"></a>
                            <a href="<?php echo $entry->entry_url; ?>" title="<?php echo $entry->entry_title ?>" >
                                <?php
                                    if ( ! empty( $entry->entry_front_page_title ) ) {
                                        echo $entry->entry_front_page_title;
                                    } else {
                                        echo $entry->entry_title;
                                    }
                                ?>
                            </a>
                            <div class="fb-like" data-href="<?php echo $entry->entry_url; ?>" data-send="false" data-layout="button_count" data-width="450" data-show-faces="false" data-font="arial"></div>
                        </li>
                    <?php endif; ?>
                <?php endfor; ?>

            </ul>
        </div>
    <?php endfor; ?>
	<a name="mighty" class="mighty-mostpopular"<?=$dataOptions?> href="http://www.mightymodules.com/mostpopular/">Get this widget</a>
</div>
