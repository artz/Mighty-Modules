<?php

// Exit if there are no parameters.
if (!$_SERVER['QUERY_STRING']) {
    exit;
}

class Mighty {

    public $cache_ttl = 60;

    public function option($key = NULL) {
        $mightyOptions = json_decode(file_get_contents('../mighty-options.json'));
        if (isset($key)) {
            return $mightyOptions->$key;
        } else {
            return $mightyOptions;
        }
    }

    public function get( $url ) {

        if ( function_exists( 'apc_exists' ) && apc_exists( $url ) ) {
            $response = apc_fetch( $url );
        } else {

            if ( ! isset( $ttl ) ) {
                $ttl = $this->cache_ttl;
            }

            // If this is an HTTP request, cURL it.
            if ( strpos( $url, 'http' ) === 0 ) {
                $ch = curl_init($url);
                curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );

                $response = curl_exec($ch);

                curl_close($ch);

            // Otherwise, attempt to pull from local file system.
            } else {

                $url = realpath( dirname( __FILE__ ) ) .  '/../' .
                    str_replace('.', '/', $_GET['_module']) . '/' . $url ;
                $response = file_get_contents($url);
            }

            if ( function_exists( 'apc_store' ) ) {
                apc_store( $url, $response, $ttl );
            }
        }

        return $response;
    }

    public function getJSON( $url ) {
        $response = $this->get( $url );
        return json_decode( $response );
    }

    public function getXML( $url ) {
        $response = $this->get( $url );
        return simplexml_load_string( $response );
    }
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

        $params = $_GET;

        $name = $params['_module'];
        unset( $params['_module'] );

        if ( isset( $params['_host'] ) ) {
            $host = $params['_host'];
            unset( $params['_host'] );
        }

        if ( isset( $params['_cache'] ) ) {
            $cache = $params['_cache'];
            unset( $params['_cache'] );
        }

        if ( isset( $params['_jsonp'] ) ) {
            $jsonp = $params['_jsonp'];
            unset( $params['_jsonp'] );
        }

        $options = new stdClass();
        $dataOptions = "";

        foreach ( $params as $key => $value ) {
            $options->$key = $value;
            $dataOptions .= ' data-' . $key . '="' . $value . '"';
        }
        unset( $key );
        unset( $value );
        unset( $params );

        $cache_key = '/' . $_SERVER['QUERY_STRING'];
        $cache_key = preg_replace( '/[&]*_host=[^&]*/', '', $cache_key ); // Strip out host
        $cache_key = preg_replace( '/&_jsonp.*/', '', $cache_key ); // Strip out JSONP

        if ( function_exists( 'apc_exists' ) && apc_exists( $cache_key ) ) {
            $data = apc_fetch( $cache_key );
        } else {

            // Grab the module's view.
            ob_start();
            require( realpath( dirname( __FILE__ ) ) . '/../' . str_replace( '.', '/', $name ) . '/' . $name . '.php');
            $data = ob_get_clean();

            // Set up cache TTL.
            // TODO: Allow cache TTL at a module level.
            $cache_default = 5;
            $cache_min = 5;

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

        // Inject Mighty Anchor if not JSONP
        if ( ! isset( $jsonp ) ) {
            $anchor = '<a name="mighty" class="' . str_replace( '.', '-', $name ) . '"' . $dataOptions . ' href="#">Get the <b>Mighty Module</b></a>';
            $data = preg_replace( '/(<\/[A-Za-z]+>[\s]*$)/', $anchor . '\1', $data );
        }

    } else {
        // Return an empty object
        $data = '{ "error" : "No file or url specified. {Link to API Documentation}" }';
    }

    // Set up JSONP
    if ( isset( $jsonp ) ) {
        header( 'content-type: application/javascript; charset=utf-8' );

        // Remove carriage returns
        $data = str_replace("\n", "", $data);

        // Escape backslashes
        $data = str_replace("\\", "\\\\", $data);

        // Remove duplicate whitespace
        $data = preg_replace('/[\s]+/', ' ', $data);

        // Remove trailing whitespace before tags
        $data = preg_replace('/[\s]*<\//', '</', $data);

        // Escape single quotes
        $data = str_replace("'", "\'", $data);

        // Add padding
        $data = $jsonp . "('" . $data .  "');";
    }

    // Leverage Etags to only return content when it updates.
    // http://www.php.net/manual/en/function.header.php#85146
    $etag = '"' . md5($data) . '"';

/*
    // Send proper Etag in hopes of one day Akamai is updated.
    if (isset($_SERVER['HTTP_IF_NONE_MATCH']) && trim($_SERVER['HTTP_IF_NONE_MATCH']) === $etag) {
        header("HTTP/1.1 304 Not Modified");
        exit;
    } else {
        header('Etag: ' . $etag);
    }
 */

    // Hack: If your CDN does not support Etags (like AOL's Akamai config).
    // Calculate Last-Modified date and save it in memory.
    if (function_exists('apc_exists')) {
        $cache_key = $cache_key . '_last_modified';
        // If we have an etag and last modified date for this URL.
        if (apc_exists($cache_key) ) {
            $cache_info = explode('|', apc_fetch($cache_key));
            $etag_cache = $cache_info[0];
            $last_modified_cache = $cache_info[1];
        } else {
            $etag_cache = "";
        }

        if ($etag !== $etag_cache) {
            // Generate new Last-Modified date.
            $last_modified_cache = gmdate("D, d M Y H:i:s", time()) . ' GMT';
            // Store cache info for a month.
            apc_store($cache_key, $etag . '|' . $last_modified_cache, 2629743);
        }

        if (@$_SERVER['HTTP_IF_MODIFIED_SINCE'] === $last_modified_cache) {
            header("HTTP/1.1 304 Not Modified");
            exit;
        } else {
            header("Last-Modified: " . $last_modified_cache);
        }
    }

    echo $data;
