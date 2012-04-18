<?php
// Super simple example of a widget API :D
class MM_Widget {

    // Path to Mighty API.
    public $basePath = "http://mighty.aol.com/api/";

    // Host name of this user.
    public $host = "";

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

    public function render( $name, $options=array() ) {

        $url = $this->basePath . '?_host=' . $this->host . '&_module=' . $name . '&' . $this->param( $options );

        $ch = curl_init($url);
        curl_exec($ch);
        curl_close($ch);

	}
}
