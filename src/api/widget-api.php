<?php
// Super simple example of a widget API :D
class MM_Widget {
	function render( $name, $options=array() ) {
		// $name looks like 'mighty.source'
		$id = str_replace( '.', '-', $name );
		// Replace with configurable absolute path eventually.
		$path = '../src/' . str_replace( '.', '/', $name ) . '/';
		$file = $name . '.php';
		require( $path . $file );
	}
}