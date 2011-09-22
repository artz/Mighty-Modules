<?php
// Super simple example of a widget API :D
function getWidget( $name, $options ) {
	require( str_replace( '.', '-', $name ) . "/index.php" );
}