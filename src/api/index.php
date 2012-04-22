<?php


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

        $host = $_GET['_host'];
        unset( $_GET['_host'] );

        $cache = $_GET['_cache'];
        unset( $_GET['_cache'] );

        $options = new stdClass();
        $dataOptions = "";

        foreach ( $_GET as $key => $value ) {
            $options->$key = $value;
            $dataOptions .= ' data-' . $key . '="' . $value . '"';
        }
        unset( $key );
        unset( $value );

        $cache_key = $_SERVER['QUERY_STRING'];
        $cache_key = preg_replace( '/[&]*_host=[^&]*/', '', $cache_key ); // Strip out host
        $cache_key = preg_replace( '/&_jsonp.*/', '', $cache_key ); // Strip out JSONP

        if ( function_exists( 'apc_exists' ) && apc_exists( $cache_key ) ) {
            $data = apc_fetch( $cache_key );
        } else {

            // Grab the module's view.
            ob_start();
            require( '../' . str_replace( '.', '/', $name ) . '/' . $name . '.php');
            $data = ob_get_clean();

            // Set up cache TTL.
            // TODO: Allow cache TTL at a module level.
            $cache_default = 60;
            $cache_min = 15;

            if ( ! isset( $cache ) ) {
                $cache = $cache_default;
            }

            if ( $cache < $cache_min ) {
                $cache = $cache_min;
            }

            if ( function_exists( 'apc_store' ) ) {
                apc_store( $cache_key, $data, $cache );
            }
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
