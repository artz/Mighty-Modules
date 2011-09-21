<?php

    /*
     * Super simple AJAX -> JSONP Proxy
     * Like... seriously simple
     */

    header( 'content-type: application/javascript; charset=utf-8' );

    if ( isset( $_GET['file'] ) ) {
		
		// Retrieve dummy JSON data stored as a file in this directory	
		if ( file_exists( $_GET['file'] ) ) {

//			$data = file_get_contents( './' . $_GET['file'] ); 

			ob_start();
			require( './' . $_GET['file'] );
			$data = ob_get_clean();
			
			// If the file type requested is HTML, convert it to a JSON escaped string.
			if ( strstr( $_GET['file'], ".php" ) ) {
				$data = '"' . addslashes( str_replace( "\n", "", $data ) ) . '"';
			}
	
			// Simulate asynchronicity delay so nobody accidentally assumes synchronicity
			sleep( ( isset( $_GET['delay'] ) ) ? $_GET['delay'] : 1 );
		} else {
			// Return an empty object
			$data = '{ "error" : "Specified file (' . $_GET['file'] . ') not found." }';	
		}

    } elseif ( isset( $_GET['url'] ) ) {
		
        // Proxy JSON from an external URL
        // (If your API serves JSONP, why are you using this, buddy?)
        
        /* This method causes errors in my VPS
        $proxy = curl_init( urldecode( $_GET['url'] ) );

        // We want to store the return as a variable, not just output it
        curl_setopt( $proxy, CURLOPT_RETURNTRANSFER, true );

        $data = curl_exec( $proxy );
        */

        $data = file_get_contents( $_GET['url'] );

    } else {

        // Return an empty object
        $data = '{ "error" : "No file or url specified." }';

    }

    $callback = ( isset( $_GET['callback'] ) ) ? $_GET['callback'] : 'callback';

//	echo "alert(" . $callback . ");";
    echo $callback . '(' . $data . ');';
