<?php
/*
 *  This file demonstrates how to make a simple class
 *  for quickly rendering a module using the API.
 */

// Super simple example of JSON configuration.
global $MightyConfig;
$MightyConfig = json_decode( file_get_contents( realpath( dirname(dirname( __FILE__ )) ) . '/mighty-options.json' ) );
// Super simple example of a widget API :D
class MightyModule {

    public function __construct( $name, $options=array() ) {
        $this->name = $name;
        $this->options = $options;
    }

    // JavaScript encodeURIComponent Equivalent
    // http://stackoverflow.com/questions/1734250/what-is-the-equivalent-of-javascripts-encodeuricomponent-in-php
    public function encodeURIComponent($str) {
        $revert = array( '%21'=>'!', '%2A'=>'*', '%27'=>"'", '%28'=>'(', '%29'=>')' );
        return strtr( rawurlencode($str), $revert );
    }

    public function param( $obj ) {
        $params = array();
        foreach ( $obj as $key => $value ):
            $params[] = $this->encodeURIComponent( $key ) . '=' . $this->encodeURIComponent( $value );
        endforeach;
        return implode( $params, '&' );
    }

    public function render( $options=array() ) {

        if ( count( $options ) === 0 ) {
            $options = $this->options;
        } else {
            $options = array_merge( $this->options, $options );
        }

        global $MightyConfig;
        $url = $MightyConfig->basePath . 'api/?_host=' . $MightyConfig->host . '&_cache=' . $MightyConfig->cache . '&_module=' . $this->name . '&' . $this->param( $options );
        $ch = curl_init($url);
        curl_exec($ch);
        curl_close($ch);

    }
}
