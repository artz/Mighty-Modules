<?php

    // Set up cache TTL.
    $cache_default = 60;
    $cache_min = 15;

    if ( isset( $_GET['_cache'] ) ) {
        $cache = $_GET['_cache'];
    } else {
        $cache = $cache_default;
    }

    if ( $cache < $cache_min ) {
        $cache = $cache_min;
    }

    // Handle file requests.
    if ( isset( $_GET['_file'] ) ) {

        // Retrieve dummy JSON data stored as a file in this directory
        if ( file_exists( $_GET['_file'] ) ) {

//			$data = file_get_contents( './' . $_GET['file'] );

            ob_start();
            require( './' . $_GET['_file'] );
            $data = ob_get_clean();

            // If the file type requested is HTML, convert it to a JSON escaped string.
            if ( strstr( $_GET['_file'], ".php" ) ) {
                $data = '"' . addslashes( str_replace( "\n", "", $data ) ) . '"';
            }

            // Simulate asynchronicity delay so nobody accidentally assumes synchronicity
            sleep( ( isset( $_GET['delay'] ) ) ? $_GET['delay'] : 1 );
        } else {
            // Return an empty object
            $data = '{ "error" : "Specified file (' . $_GET['_file'] . ') not found." }';
        }

    // Handle URL requests.
    } elseif ( isset( $_GET['_url'] ) ) {

        // Proxy JSON from an external URL
        // (If your API serves JSONP, why are you using this, buddy?)

        /* This method causes errors in my VPS
        $proxy = curl_init( urldecode( $_GET['url'] ) );

        // We want to store the return as a variable, not just output it
        curl_setopt( $proxy, CURLOPT_RETURNTRANSFER, true );

        $data = curl_exec( $proxy );
        */

        $data = file_get_contents( $_GET['_url'] );

    // Module API
    } elseif ( isset( $_GET['_module'] ) ) {

        // Require the host name param for module API.
        if ( ! isset( $_GET['_host'] ) ) {
            echo '{ "error" : "A _host param is required." }';
            die;
        }

        $name = $_GET['_module'];
        unset( $_GET['_module'] );

        $options = new stdClass();
        $dataOptions = "";

        foreach ( $_GET as $key => $value ) {
            $options->$key = $value;
            $dataOptions .= ' data-' . $key . '="' . $value . '"';
        }

        $cache_key = $_SERVER['QUERY_STRING'];
        $cache_key = preg_replace( '/&_jsonp.*/', '', $cache_key ); // Strip out JSONP
        if ( apc_exists( $cache_key ) ) {
            $data = apc_fetch( $cache_key );
        } else {
            ob_start();
            $path = '../' . str_replace( '.', '/', $name ) . '/';
            // echo realpath( dirname( __FILE__ ) ) . '<br>';
            require( $path . $name . '.php');
            $data = ob_get_clean();
            apc_store( $cache_key, $data, $cache );
        }

    } else {
        // Return an empty object
        $data = '{ "error" : "No file or url specified. {Link to API Documentation}" }';
    }

    // Set up JSONP
    if ( isset( $_GET['_jsonp'] ) ) {
        header( 'content-type: application/javascript; charset=utf-8' );
        $data = $_GET['_jsonp'] . '("' . addslashes( str_replace( "\n", "", $data ) ) . '")';
    }

    echo $data;
