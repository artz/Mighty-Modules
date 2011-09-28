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
        
    $data = file_get_contents( '../src/api/mighty-mostpopular/mostpopular.json' );
    $data = json_decode( $data );
    $data = $data->response;
    echo "<pre><code>";
    // print_r( $data );
    echo "</code></pre>";
	
?>
<div class="mighty-mostpopular">
	<h2>Huffpost</h2>
    <h3>Most Popular</h3>
	<h3 class="tab">Politics</h3>
	<div class="panel">
		<ul>
            <?php for ( $i = 0; $i < count( $data ); $i++ ) : ?>
                <?php $entry = $data[$i]; ?>
                <?php if ( $entry->vertical_name == "Politics" ) : ?>
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
                    </li>
                <?php endif; ?>
            <?php endfor; ?>
		</ul>
	</div>
	<h3 class="tab">Business</h3>
	<div class="panel">
		<ul>
            <?php for ( $i = 0; $i < count( $data ); $i++ ) : ?>
                <?php $entry = $data[$i]; ?>
                <?php if ( $entry->vertical_name == "Business" ) : ?>
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
                    </li>
                <?php endif; ?>
            <?php endfor; ?>
		</ul>
	</div>
	<h3 class="tab">Entertainment</h3>
	<div class="panel">
		<ul>
            <?php for ( $i = 0; $i < count( $data ); $i++ ) : ?>
                <?php $entry = $data[$i]; ?>
                <?php if ( $entry->vertical_name == "Entertainment" ) : ?>
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
                    </li>
                <?php endif; ?>
            <?php endfor; ?>
		</ul>
	</div>
	<a name="mighty" class="mighty-mostpopular"<?=$dataOptions?> href="http://www.mightymodules.com/mostpopular/">Get this widget</a>
</div>
