<?php

    /*
     * Super simple AJAX Proxy
     * Like... seriously simple
     */

    header( 'content-type: application/javascript; charset=utf-8' );

    if ( isset( $_GET['file'] ) && file_exists( $_GET['file'] ) ) {
        // Retrieve dummy JSON data stored as a file in this directory

        $data = file_get_contents( './' . $_GET['file'] ); 

        // Simulate asynchronicity delay so nobody accidentally assumes synchronicity
        sleep( ( isset( $_GET['delay'] ) ) ? $_GET['delay'] : 1 );

    } elseif ( isset( $_GET['url'] ) ) {
        // Proxy JSON from an external URL
        // (If your API serves JSONP, why are you using this, buddy?)

        $proxy = curl_init( urldecode( $_GET['url'] ) );

        // We want to store the return as a variable, not just output it
        curl_setopt( $proxy, CURLOPT_RETURNTRANSFER, true );

        $data = curl_exec( $proxy );

    } else {

        // Return an empty object
        $data = '{ "error" : "No file or url specified" }';

    }

    $callback = ( isset( $_GET['callback'] ) ) ? $_GET['callback'] : 'callback';

    echo $callback . '(' . $data . ')';
?>
