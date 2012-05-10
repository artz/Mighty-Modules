/*
    BOOT UTILITY LIBRARY
    Version 0.2
*/
(function( namespace, window, undefined ) {

    // Return if global is already defined.
    if ( window[ namespace ] ) {
        return;
    }

        // Initialize the library's namespace.
        // This is controlled via arguments injected
        // into the closure at the bottom of this script.
//        var global = window[ namespace ] || ( window[ namespace ] = {} ),
    var global = window[ namespace ] = {},

        // Localize global objects and functions for better compression.
        document = window.document,
        JSON = window.JSON,
        encode = encodeURIComponent,

//        slice = Array.prototype.slice,

        // String compression optimizations for the library.
        strLoad = "load",
        strString = "string",
        strFunction = "function",
        strObject = "object",
        strNumber = "number",
        strBoolean = "boolean",

        strScript = "script",
        strReadyState = "readyState",
        strOnReadyStateChange = "onreadystatechange",
        strOnLoad = "onload",
        strComplete = "complete",

        strSpace = " ",
        strDot = ".";

//        eventNamespace = namespace.toLowerCase() + ".";

/*
    Function: Boot.now

    Gets a current timestamp.

    Returns:

    Timestamp
*/
    function now() {
        return new Date().getTime();
    }
//    global.now = now;


/*
    Function: global.log

    Simple method for keeping a log and outputting to the screen.

    Parameters:

        message - String of the message to log.

    Returns:

    Boot
*/
    var logList,
        body,
        logItems = [],
        startTime = now(),
        logEnabled = 0;

    function log( msg, ul ) {

        body || (body = document.body);

        logItems.push( (now() - startTime) + "ms: " + msg );

        if ( logEnabled ) {
            if ( logList ||
               ( logList = ul ) ||
               ( body && ( logList = document.createElement("div")) && body.insertBefore( logList, body.firstChild) ) ) {
                logList.innerHTML = ["<ul><li>", logItems.join("</li><li>"), "</li></ul>"].join('');
            }
        }
    }

    log.init = function( options ) {
        logEnabled = 1;
        logList = options.elem;
    };

    global.log = log;


/*
    Function: Boot.contains

    Determines if the given string contains given text.

    Parameters:

        haystack - The string to search inside.
        needle - The string to find.

    Returns:

    Boolean

    Usage:
    if ( contains( "a", "abcde" ) ) {
        // true
        Do something knowing this value contains it.
    }
*/
    function contains( haystack, needle ){
        return haystack && haystack.indexOf( needle ) !== -1;
    }
//    global.contains = contains;


/*
    Function: Boot.is...

    Determines if the given object is an array.

    Parameters:

        obj - The object to test.

    Returns:

    Boolean
*/
    // String optimizations.
    function is( str, type ) {
        return typeof str === type;
    }

    function isArray( obj ) {
        return obj && contains( obj.constructor.toString(), "rray" );
    }
//    global.isArray = isArray;

//    Artz: Should isObject weed out elements, maybe?
    function isObject( obj ) {
        return obj !== null && is( obj, strObject );
    }
//    global.isObject = isObject;

    function isElement( obj ) {
        return isObject( obj ) && obj.nodeType;
    }
//    global.isElement = isElement;

    function isString( obj ) {
        return is( obj, strString );
    }
//    global.isString = isString;

    function isBoolean( obj ) {
        return is( obj, strBoolean );
    }
//    global.isBoolean = isBoolean;

    function isFunction( obj ) {
        return is( obj, strFunction );
    }
//    global.isFunction = isFunction;

    function isNumber( obj ) {
        return is( obj, strNumber );
    }
//    global.isNumber = isNumber;


/*
    Function: Boot.each

    Simple function for iterating through an array.

    One day do this?: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/foreach

    Parameters:

        array - The array to iterate over.
        callback - The callback to apply to each item in the array.

    Returns:

    Boot
*/
    function each( array, callback ) {
    // Anything break if I comment this out?  Dummy protection needed?
    //    if ( array && array.length ) {
        var i = 0, l = array.length;
        for (; i < l; i++ ) {
            callback( array[i], i, array );
        }
    //    }

    }
//    global.each = each;


/*
    Boot.extend

    Merge the contents of two or more objects together into the first object.

    Boot.extend( target, [object1], [objectN] )

    Parameters

        target -  An object that will receive the new properties if additional
                  objects are passed in [or that will extend the Boot namespace
                  if it is the sole argument].
        object1 - An object containing additional properties to merge in.
        objectN - Additional objects containing properties to merge in.

*/
    function extend() {

        var args = arguments,
            target = args[0],
            name,
            source,
            i = 1, // Source pointer.
            l = args.length;

        // Feature to consider:
        // If it's a string, we should grab the
        // object from our modules.
//        if ( isString( target ) ) {
//            target = modules[ target ];
//        }

    /*
        // If the length is 1, extend Boot, and
        // set the source to thefirst argument.
        //
        // Artz: Removing this, think this is not
        // worth the bytes and/or non-intuitive.

        if ( l === i ) {
            target = global;
            i = 0;
        }
    */
        for (; i < l; i++ ) {
            source = args[i];
            for ( name in source ) {
                if ( source.hasOwnProperty(name) ) {
                    // If an object or array and NOT a DOM node, we need to deep copy.
                    // Artz: Should isObject weed out elements, maybe?
                    if ( isObject( source[name] ) && ! isElement( source[name] ) ) {
                        target[name] = extend( isArray( source[name] ) ? [] : {}, target[name], source[name] );
                    } else {
                        target[name] = source[name];
                    }
                }
            }
        }
        return target;
    }
//    global.extend = extend;


/*
    Boot.setup

    A function that appends a new "option" method
    on a method to allow developers to override
    default options.
*/
    function setup( method, defaultOptions ) {

        defaultOptions = defaultOptions || {};

        // Create an option method on the method.
        method.option = function( key, value ) {
            if ( isString(key) ) {
                // Retrieve an option using the key.
                if ( value === undefined ) {
                    return defaultOptions[ key ];
                // Set an option using a key.
                } else {
                    defaultOptions[ key ] = value;
                }
                // Extend the default options.
            } else if ( isObject(key) ) {
                extend( defaultOptions, key );
                // Return a copy of the current options.
            } else {
                return extend( {}, defaultOptions );
            }
        };
//      return global;
    }
//  global.setup = setup;


/*
    Boot.poll

    Function useful for checking/polling something
    and then executing a callback once it's true.
*/
    var timers = {},
        timerId = 0;

    function poll( check, callback, pollDelay, timeout ){

        var name = timerId++,
            start = now(),
            time,
            isTimeout = false;

        // Internet Explorer needs at least a 1 for setInterval.
        pollDelay = pollDelay || 1;

        timers[ name ] = setInterval(function(){

            time = now() - start;

            if ( check() || ( timeout && ( isTimeout = time > timeout )) ) {
                callback.call( window, isTimeout, time );
                clearInterval( timers[ name ] );
            }

        }, pollDelay );

    }
//    global.poll = poll;


/*
    Function: Boot.ready

    Cross-browser DOMContentLoaded event binder.

    Parameters:

        callback - The function to execute after the document is ready.

    Returns:

    Boot

    See Also:

    <Boot.load>

    Usage:

    Boot.ready( function(){ ... } );

    Research:

    * http://dean.edwards.name/web// log/2005/09/busted/
      Probably the first experiment; cannot use because of document.write.

    * http://www.thefutureoftheweb.com/b// log/adddomloadevent
      Uses our approach but for some reason didn't make Safari's
      detection the same as IE.  My testing showed readyState to
      be reliable acrosss IE browsers.
      /test/readyState.php

    * http://javascript.nwbox.com/IEContentLoaded/
      This one is included in jQuery. The doScroll event is
      much less efficient than checking readyState.
      /test/regex-vs-indexof.html

    * http://www.dustindiaz.com/smallest-domready-ever
      This was interesting but upon closer inspection, doesn't work.
*/
    var isReady = 0,
        isReadyBound = 0,
        readyQueue = [],

        checkReady = function(){
            // Browsers go through 3 readyStates:
            // 1 - loading
            // 2 - loaded (Safari) or interactive (everyone else)
            // 3 - complete
            // This check looks for #2, the equivalent of DOM ready.
            // Needs to be "interactive" or "loaded" (Safari) or "complete" (catch all)
            // "e" fits the bill nicely.
            // indexOf is much faster than regex or doScroll hack in Safari and IE (see /test/regex-vs-indexof.html)
            return contains( document.readyState, "e" );
        },
/*
    Replaced this with Boot.poll. So far so good!
        pollReadyState = function(){
            if ( checkReady() ) {
                execReady();
            } else {
                SetTimeout( pollReadyState, 50 );
            }
        },
*/
        execReady = function(){

            isReady = 1;

            each( readyQueue, function( callback ){
                defer( callback );
            });

            // Clear the queue.
            readyQueue = [];
        },

        // Internal reference.
        ready = function( callback ){

            if ( isReady ) {

                // Execute callback immediately in the next UI thread.
            //    console.log("Executing in the next cycle.");
                defer( callback );

            } else {

                if ( isReadyBound ) {
                //    log("Pushing ready callback.");
                    // Push function into the queue.
                    readyQueue.push( callback );

                } else {
                //    log("Binding ready.");
                    isReadyBound = 1;

                    // Add this callback to our queue to
                    // be executed when ready.
                    readyQueue = [ callback ];

                    if ( checkReady() ) {
                    //    log("Already ready.");
                        // It is ready right now, execute ready.
                        execReady();
                    } else {
                        // Good browsers.
                        if ( document.addEventListener ) {
                //            console.log("Binding DOMContentLoaded.");
                            document.addEventListener( "DOMContentLoaded", execReady, false );
                        // IE.
                        } else {
                            poll( checkReady, execReady, 50 );
                        }
                    }
                }
            }


        };

    // Public reference.
//    global.ready = ready;


/*
    Function: Boot.bind

    Cross browser method for binding events.

    Parameters:

        object - The object to bind the method to.
        event - The event to bind the method to.
        callback - The method to fire on the event.

    Returns:

    Boot
*/
    // Patch function to normalize IE events to standard.
    function patchIEEvent( event ) {

        event.preventDefault = function(){
            event.returnValue = false;
        };

        if ( ! event.target ) {
            event.target = event.srcElement;
        }

        return event;
    }

    function bind( object, event, callback ) {

        if (object.attachEvent) {
            object.attachEvent("on" + event, function(){ callback( patchIEEvent( window.event ) ); } );
        } else if (object.addEventListener) {
            object.addEventListener(event, callback, false);
        }
    }
//    global.bind = bind;


/*
    Boot.delegate
    Thanks, jQuery!
*/
    var rquickIs = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
        quickParse = function( selector ) {
            var quick = rquickIs.exec( selector );
            if ( quick ) {
                //   0  1    2   3
                // [ _, tag, id, class ]
                quick[1] = ( quick[1] || "" ).toLowerCase();
                quick[3] = quick[3] && new RegExp( "(?:^|\\s)" + quick[3] + "(?:\\s|$)" );
            }
            return quick;
        },
        quickIs = function( elem, m ) {
            var attrs = elem.attributes || {};
            return (
                (!m[1] || elem.nodeName.toLowerCase() === m[1]) &&
                (!m[2] || (attrs.id || {}).value === m[2]) &&
                (!m[3] || m[3].test( (attrs[ "class" ] || {}).value ))
            );
        };

    function delegate( elem, selector, event, callback ) {

        var token = quickParse( selector );

        bind( elem, event, function( evt ){

            var target = evt.target;

            if ( quickIs( target, token ) ) {
                callback( evt );
            }

        });
    }
//    global.delegate = delegate;


/*
    Function: Boot.load

    Cross-browser window load event binder.
    Includes a convenient check for if
    the window has already loaded and
    executes the function immediately if it is.
    Also ensures any events bound to ready fire
    first, which can be a problem in normal event bindings.

    Parameters:

        callback - The function to execute after the window has loaded.

    Returns:

    Boot

    See Also:

    <Boot.load>
*/
    var isLoaded = 0;
    function load( callback ) {

        // When loaded, set the internal flag and do the callback.
        function loaded(){

            // Ensure we process our ready queue before stuff
            // bound to window.load.
            execReady();

            isLoaded = 1;

            defer( callback );
        }

        // Browsers go through 3 readyStates:
        // 1 - loading
        // 2 - loaded (Safari) or interactive (everyone else)
        // 3 - complete
        // This check looks for #3, the equivalent of window.onload.
        // "m" fits the bill nicely.
        // indexOf is much faster than regex in Safari and IE (see /test/regex-vs-indexof-vs-doscroll.html)
        if ( contains( document.readyState, "m" ) ) {
            loaded();
        } else {
            bind( window, strLoad, loaded );
        }

    }
//    global.load = load;


/*
    Function: Boot.subscribe

    Subscribes to an event, fires a callback once it is emitted.
    http://en.wikipedia.org/wiki/Publish/subscribe

    * Consider adding support for synchronous subscriptions,
      i.e. if an event already fired, execute callback now.

    Parameters:

    event
    callback
*/
    var events = {};
    function subscribe( object, event, callback ){

        if ( isString( object ) ) {
            callback = event;
            event = object;
            object = undefined;
        }

        var eventQueue = events[ event ] || ( events[ event ] = [] );

        eventQueue.push( [ object, callback ] );

    }
    global.subscribe = subscribe;


/*
    Function: Boot.publish

    Publishes an event, passing an optional object of data.
    Triggers any events attached to the event.
    http://en.wikipedia.org/wiki/Publish/subscribe

    Parameters:
        - event
        - data

    Returns:

    Boot

*/
    function publish( object, event, data ){

        // Support for associating events with DOM nodes.
        if ( isString( object ) ) {
            data = event;
            event = object;
            object = undefined;
        }

        var eventQueue = events[ event ];

        if ( eventQueue ) {

            each( eventQueue, function( on ){

                var onObject = on[0],
                    onCallback = on[1];

                if ( object ) {

                    // Only execute the callback if this is
                    // the object emitting the event or
                    // the handler doesn't require an object.
                    if ( object === onObject || onObject === undefined ) {

                        onCallback.call( object, data );

                        // Break the each loop, no sense wasting cycles.
                        // Worried this could have adverse effects.
                        // Commenting out for now.
                        // return false;
                    }
                } else {
                    onCallback.call( data, data );
                }

            });
        }
    }
    global.publish = publish;


/*
    Function: Boot.getCSS

    Fetches a CSS file and appends it to the DOM.

    To Do:
    Add a callback using Jason's technique:
    http://www.viget.com/inspire/js-201-run-a-function-when-a-stylesheet-finishes-loading/
*/
    var head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement,
        cssLoading = {};

    function getCSS( src ) {
        defer(function(){
            if ( ! cssLoading[ src ] ) {
                cssLoading[ src ] = 1;
                var styleSheet = document.createElement("link");
                styleSheet.rel = "stylesheet";
                styleSheet.href = src;
                head.insertBefore( styleSheet, head.firstChild );
            }
        });
    }
//    global.getCSS = getCSS;


/*
    Function: Boot.getScript

    Loads a script node into the DOM. Note this is different than Boot.getJS, which
    has full functionality for dealing with script dependencies and preserving
    execution order across browsers.

    Parameters:

        src - The script to load.
        callback - The function to invoke after the script has loaded.

*/
    function getScript ( src, callback ) {

        // We use a setTimeout to ensure non-blocking behavior.
        defer(function(){

            var script = document.createElement( strScript ),
                done = 0; // Probably don't need this; jQuery no longer uses it.

            // Set the source of the script.
            script.src = src;

            // This makes good browsers behave like
            // bad browsers, for consistency.
            script.async = "async";

            // Attach handlers for all browsers
            script[ strOnLoad ] = script[ strOnReadyStateChange ] = function(){

                if ( ! done && ! script[ strReadyState ] ||
                    /loaded|complete/.test( script[ strReadyState ] ) ) {

                    done = 1;

                    // Handle memory leak in IE
                    script[ strOnLoad ] = script[ strOnReadyStateChange ] = null;

                    if ( callback ) {
                        callback( src );
                    }

                }
            };

            // This is the safest insertion point to assume.
            head.insertBefore( script, head.firstChild );
        });
    }
//    global.getScript = getScript;


/*
    Boot.resolve
    Utility for resolving URL addresses.
    TBD on how we want this API to work if
    we expose it externally and further internally.
    possibly make resolveJS, resolveCSS, resolveFont?
*/
    function resolve( customOptions, module ) {

        var options = extend( resolve.option(), customOptions || {} ),
            basePath = options.basePath,
            filename = options.filename( module ),
            suffix = options.suffix;

        // If the module name ends with .js
        if ( /\.js$/.test( module ) ) {
            // Use the module as the filename instead.
            filename = module;
            suffix = "";

            // If the module name starts with "http://" or "https://"
            if ( /^http[s]*:\/\//.test( module ) ) {
                // Remove the basePath
                basePath = "";
            }
        }
        return basePath + filename + suffix;
    }

    setup( resolve, {
        basePath: "",
        filename: function(str){ return str.toLowerCase(); },
        suffix: ".min.js"
    });


/*
    Boot.define
    Define a module, based on the Asynchronous Module Definition (AMD)
    http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition
*/
    var modules = {},
        moduleDefinitions = {},
        definedModules = [];

    function define( moduleName, moduleDependencies, moduleDefinition ) {

        if ( ! isString( moduleName ) ) {
            moduleDefinition = moduleDependencies;
            moduleDependencies = moduleName;
            moduleName = undefined;
        }

        if ( ! isArray( moduleDependencies ) ) {
            moduleDefinition = moduleDependencies;
            moduleDependencies = undefined;
        }

        // Load in any dependencies, and pass them into the use callback.
        if ( moduleDependencies ) {

            // Remember that this guy has a dependency, and which one it is.
            moduleDefinition.d = moduleDependencies;
        }

        if ( moduleName ) {
            moduleDefinitions[ moduleName ] = moduleDefinition;
        } else {
            definedModules.push( moduleDefinition );
        }
    }

    // We conform to the AMD spec.
    // https://github.com/amdjs/amdjs-api/wiki/AMD
    define.amd = {};

    global.define = define;

    // Expose modules externally.
    // global.modules = modules;


/*
    Boot.getConcatURL
    Function useful for concat URLs for merged CSS and JS
*/
    function getConcatURL() {

        var args = slice.call( arguments ), // Convert to real array.
            options = getConcatURL.option(),
            queryParam,
            mergeURL = "";

        if ( isObject( args[0] ) ) {
            extend( options, args.shift() );
        }

        if ( options.concatPath ) {
            mergeURL += options.concatPath;
        }

        return mergeURL + args.join( options.concatJoin );
    }

    setup( getConcatURL, { concatJoin: "," } );

//  global.getConcatURL = getConcatURL;


    // Resolves an object.
    function getLibrary( moduleName ) {
        // i.e. "jQuery.alpha", "MyLib.foo.bar"
        var obj = window;

        each( moduleName.split("."), function( name ) {
//            if ( obj && isObject(obj) && obj.hasOwnProperty( name ) ) {
//            Cross this bridge when it comes to us.
            if ( obj.hasOwnProperty( name ) ) {
                obj = obj[ name ];
            }
        });

        return obj;
    }


/*
    Boot.require
    Based on YUI's use() function and RequireJS.
*/
    function require( customOptions, moduleNames, callback ) {

        // Normalize parameters.
        if ( isArray( customOptions ) || isString( customOptions ) ) {
            callback = moduleNames;
            moduleNames = customOptions;
            customOptions = {};
        }

        // Make moduleNames an array.
        moduleNames = isString( moduleNames ) ? [ moduleNames ] : moduleNames;

        var options = extend( require.option(), customOptions ), // See how Boot.setup works.
            callbackArgs = [],
            concatModules = [],
            moduleCount = 0;

        function moduleReady( i, moduleName, module ) {

            if ( module ) {
                modules[ moduleName ] = module;
            }

            callbackArgs[i] = modules[ moduleName ];

            // All dependencies loaded, fire callback.
            if ( ++moduleCount === moduleNames.length ) {
                callback.apply( global, callbackArgs );
            }

            if ( module ) {
                publish( moduleName );
            }
        }

        function defineModule( i, moduleName ){

            var module,
                moduleDependencies,
                moduleDefinition = moduleDefinitions[ moduleName ] || definedModules.shift();

            if ( moduleDefinition ) {

                if ( moduleDependencies = moduleDefinition.d ) {

                    require( customOptions, moduleDependencies, function(){
                        module = isFunction( moduleDefinition ) ? moduleDefinition.apply( global, arguments ) : moduleDefinition;
                        moduleReady( i, moduleName, module );
                    });

                } else {

                    module = isFunction( moduleDefinition ) ? moduleDefinition() : moduleDefinition;
                    moduleReady( i, moduleName, module );

                }

            // Otherwise see if we can snag the module by name (old skool).
            } else {
                moduleReady( i, moduleName, getLibrary( moduleName )  );
            }
        }

        each( moduleNames, function( moduleName, i ) {

            // If this module has already been defined, use it.
            if ( moduleName in modules ) {
                // Check for the object.
                if ( modules[ moduleName ] ){
                    moduleReady( i, moduleName );
                // It's undefined, so wait a little bit.
                } else {
                    subscribe( moduleName, function(){
                        moduleReady( i, moduleName );
                    });
                }

            // Otherwise we'll need to load and define on the fly,
            // all the whilest managing dependencies.
            } else {

                // Temporarily give this guy something so incoming
                // module requests wait until the event is emmitted.
                modules[ moduleName ] = undefined;

                // If the module was defined by some other script
                if ( moduleDefinitions[ moduleName ] ) {
                    defineModule( i, moduleName );
                // Otherwise fetch the script based on the module name
                } else {
                    // If concat is enabled, push this module into our queue.
                    if ( options.concat ) {
                        concatModules.push( [i, moduleName] );
                    // Otherwise, fetch the module now.
                    } else {
                        getScript( resolve( options, moduleName ), function(){
                            defineModule( i, moduleName );
                        });
                    }
                }

            }

        });

        // If we happened upon concatenated scripts, get 'em.
        if ( concatModules.length ) {

            var concatURL,
                concatScripts = [];

            each( concatModules, function( concatModule ) {
                concatScripts.push( resolve( options, concatModule[1] ) );
            });

            concatURL = getConcatURL.apply( window, [ options ].concat( concatScripts ))

            getScript( concatURL, function(){
                each( concatModules, function( concatModule ) {
                    defineModule( concatModule[0], concatModule[1] );
                });
            });
        }

    }

    setup( require );

    global.require = require;


/*
    Boot.widget

    The Widget factory is a wrapper function that
    binds an element to a module using a defined
    object specification.

    Note: This is a work in progress!
*/
    function widget( widgetName, elem, options ) {

        var source = modules[ widgetName ],
            instance,
            ui;

        if ( elem.widget && elem.widget[ widgetName ] ) {

            instance = elem.widget[ widgetName ];

        } else {

            instance = extend( {}, source, {
                element: elem,
                name: widgetName.replace(strDot, "-"),
                namespace: widgetName,
                option: function( key, value ) {

                },
                ui: {},
                options: options || {}
            });

            ui = extend( instance.ui, instance.options.ui );

            // Convert UI selectors to elements.
            if ( ui ) {
                for ( var x in ui ) {
                    if ( ui.hasOwnProperty( x ) ) {
                        ui[x] = query(ui[x], elem);
                    }
                }
            }

            addClass( elem, instance.name );

            // Initialize the widget.
            instance._create();

            // Save the instance on the element for later access.
            if ( ! elem.widget ) {
                elem.widget = {};
            }
            elem.widget[ widgetName ] = instance;

        }

        return instance;

    }
//    global.widget = widget;


/*
    Function: Boot.query

    Intended to be the world's smallest selector engine.

    Parameters:
        selector
        context - can be an element, element collection (nodeList) or array of elements

    Usage:

    Supports simple id, class and tag selectors:
        - #someid
        - .someclass
        - img

    Supports descendant selectors:
        - #someid .someclass img

    Thanks:
        John Resig - http://ejohn.org/blog/thoughts-on-queryselectorall/
*/
    function listToArray ( collection ) {
        var array = [],
            l = collection.length;
        while ( l-- ) {
            array[l] = collection[l];
        }
        return array;
    }

    var getElementsByClassName = document.getElementsByClassName ? // Runtime feature detect.
            function( selector, element ) {
                return listToArray( element.getElementsByClassName( selector ) );
            } : function( selector, element ) {

                var elements = element.getElementsByTagName("*"),
                    className,
                    matches = [];

                for ( var i = 0, l = elements.length; i < l; i++ ) {
                    className = elements[i].className;
                    if ( className && (new RegExp("(\\s|^)" + className + "(\\s|$)").test( selector ) ) ) {
                        matches.push( elements[i] );
                    }
                }
                return matches;
            };

    // Our simple selector engine.
    var querySelectorAll = document.querySelectorAll ? // Runtime feature detect.
            function( selector, element ) {

                element = element || document;

                // Helps ensure that if we were given a descendant
                // selector we only take the first segment.
                selector = selector.split( strSpace )[0];

                return listToArray( element.querySelectorAll( selector ) );

            } : function( selector, element ) {

                element = element || document;

                // Helps ensure that if we were given a descendant
                // selector we only take the first segment.
                selector = selector.split( strSpace )[0];

                // Grabs the first character, which informs our selector engine.
                var firstChar = selector.charAt(0),
                    nodes;

                if ( firstChar === "#" ) {
                    nodes = [ element.getElementById( selector.replace(firstChar, "") ) ];
                } else if ( firstChar === strDot ) {
                    nodes = getElementsByClassName( selector.replace(firstChar, ""), element );
                } else {
                    nodes = listToArray( element.getElementsByTagName( selector ) );
                }

                return nodes;
            };

    // Special wrapper function that allows
    // multiple context elements to narrow down
    // the set.
    function query( selector, context ) {

        // Prepare selector.
        selector = selector.split( strSpace );

        // Prepare context.
        // It could be "document", [ ul, ul ]
        if ( context ) {
            // Detects if we received an element
            // and turns it into an array.
            if ( isElement( context ) ) {
                context = [ context ];
            }
        } else {
            context = [ document ];
        }

            // Result set.
        var elems = context;

        // Loop through each selector segment and
        // find elements matching inside context.
        for ( var x = 0, y = selector.length; x < y; x++ ) {

            context = elems;
            elems = [];

            // Loop through each item in context
            // and find elements.
            for ( var i = 0, l = context.length; i < l; i++ ) {

                // Look for items matching the first
                // segement of the selector and add
                // them to our result set.
                elems = elems.concat( querySelectorAll( selector[x], context[i] ) );

            }
        }

        return elems;
    }
//    global.query = query;


/*
    Function: Boot.attr

    Shorthand for setting and retrieving an attribute from an element.
    Note this is not currently used by Boot, but used by Easync and ModuleT

    Parameters:

        elem - The object with the attribute to fetch.
        attribute - The attribute to fetch.
        value - The value to set.

    Returns:

    Attribute value (getting) or Boot (setting)
*/
    function attr( elem, attribute, value ){

        if ( value !== undefined ) {
            if ( value === null ) {
                elem.removeAttribute( attribute );
            } else {
                if ( attribute === "style" ) {
                    // For IE.
                    elem.style.cssText = value;
                }
                elem.setAttribute( attribute, value );
            }
        } else {
            return elem.getAttribute( attribute );
        }

    }
//    global.attr = attr;


/*
    Boot.data

    Function for extracting data attributes and storing
    arbitrary data on elements.
*/
    function data( elem, key, value ) {
        // Return an object of all data attributes.
        var strData = "data-",

            attribute,
            attributeName,
            attributes = elem.attributes,
            attributesLength = attributes.length,
            attributesObject = {},

            ret;

        if ( value !== undefined ) {
            attr( elem, strData + key, value );
        } else if ( key !== undefined ) {
            ret = attr( elem, strData + key );
        } else {
            while( attributesLength-- ) {
                attribute = attributes[ attributesLength ];
                attributeName = attribute.nodeName;
                if ( contains( attributeName, strData ) ) {
                    // Artz: It would be cool to provide camelCase property
                    // names as an option (or standard).
                    attributesObject[ attributeName.replace( strData, "" ) ] = attribute.nodeValue;
                }
            }
            ret = attributesObject;
        }
        return ret;
    }
//    global.data = data;


/*
    Simple add/remove classname functions.
    Valuable as Boot.removeClass / Boot.addClass or jQuery's job?
    Supports multiple class additions.
*/
    function addClass( elem, classNames ) {
        // Adding the class name greedily won't
        // hurt and keeps things small.
        classNames = classNames.split( strSpace );

        var elemClassName = elem.className,
            className,
            l = classNames.length,
            reg;

        while ( l-- ) {
            className = classNames[l];
            reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
            if ( ! reg.test( elem.className ) ) {
                elemClassName += strSpace + className;
            }
        }

        elem.className = elemClassName;
    }
//    global.addClass = addClass;

    // Supports multiple class removals.
    function removeClass( elem, classNames ) {

        classNames = classNames.split( strSpace );

        var elemClassName = elem.className,
            className,
            l = classNames.length,
            reg;

        while ( l-- ) {
            className = classNames[l];
            reg = new RegExp("(\\s|^)" + className + "(\\s|$)", "g");
            elemClassName = elemClassName.replace( reg, strSpace );
        }

        elem.className = trim( elemClassName );
    }
//    global.removeClass = removeClass;


/*
    Function: Boot.getStyle

    Cross-browser method for getting the computed styles of elements

    Parameters:

        element - The element to find the computed style for.
        property - The property we're asking for.

    Returns:

        The computed style value

    Usage:

        var height = Boot.getStyle( myDiv, "height" );

*/
    // Largely taken from the example at
    // http://robertnyman.com/2006/04/24/get-the-rendered-style-of-an-element/
    function getStyle( element, property ) {
        var value;

        if ( document.defaultView && document.defaultView.getComputedStyle ) {
            // The lovely way of retrieving computed style
            value = document.defaultView.getComputedStyle( element, "" ).getPropertyValue( property );
        } else {
            // The... other (read: Microsoft) way
            property = property.replace(/\-(\w)/g, function( match, prop ) { // Artz: match var is unused
                return prop.toUpperCase();
            });

            value = element.currentStyle[property];
        }

        return value;
    }

//    global.getStyle = getStyle;


/*
    Boot.inlineCSS

    Thanks Stoyan!
    http://www.phpied.com/dynamic-script-and-style-elements-in-ie/
*/
    function inlineCSS( css ){

        var style = document.createElement("style"),
            textNode;

        // Stoyan says this is "absolutely required",
        // but so far has passed all our unit tests.
//        style.setAttribute("type", "text/css");

        // This must happen before setting CSS for IE.
        head.insertBefore( style, head.firstChild );

        // IE
        if ( style.styleSheet ) {
            style.styleSheet.cssText = css;
        // The World
        } else {
            textNode = document.createTextNode( css );
            style.appendChild( textNode );
        }

    }
//    global.inlineCSS = inlineCSS;


/*
    Boot.createHTML

    Research: http://domscripting.com/blog/display/99
*/
    function createHTML( html ) {
        var div = document.createElement("c");
        div.innerHTML = html;
        return div.firstChild;
    }
//    global.createHTML = create;


/*
    Function: Boot.disableTextSelect

    Cross-browser method for disabling text selection - particularly an issue on ui elements that
    may be clicked quickly enough to trigger the default action of selecting text.

    Parameters:

        element - The element to disable text selection on.

    Returns:

        The element

    Usage:

        Boot.disableTextSelect( myElement );
*/

    // The actual cross-browserness of this has NOT been tested
    // This is an initial pass based on a stackoverflow example
    // http://stackoverflow.com/questions/826782/css-rule-to-disable-text-selection-highlighting
    function disableTextSelect( element ) {
        if ( getStyle( element, "-khtml-user-select" ) ) {
            // Set style for older webkit
            element.style["-khtml-user-select"] = "none";
        } else if ( getStyle( element, "-webkit-user-select" ) ) {
            // Set style for webkit
            element.style["-webkit-user-select"] = "none";
        } else if ( getStyle( element, "-moz-user-select" ) ) {
            // Set style for mozilla
            element.style["-moz-user-select"] = "-moz-none";
        } else if ( getStyle( element, "user-select" ) ) {
            // Set style for mozilla
            element.style["user-select"] = "none";
        } else {
            // Set property for IE & Opera
            element.unselectable = true;
        }

        return element;
    }
//    global.disableTextSelect = disableTextSelect;


/*
    UNDERSCORE UTILITIES
    Helper utilities based on Underscore Library.
    http://documentcloud.github.com/underscore/underscore.js
*/
  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
/*    function map( obj, iterator, context ) {
        var results = [];
        each( obj, function( value, index, list ) {
            results.push( iterator.call( context, value, index, list ) );
        });
        return results;
    }*/
//    global.map = map;

    // Delays a function for the given number of milliseconds, and then calls
    // it with the arguments supplied.
/*    function delay( func, wait ) {
        var args = slice.call( arguments, 2 );
        return setTimeout( function(){ return func.apply(func, args); }, wait );
    }
    */
    // Defers a function, scheduling it to run after the current call stack has
    // cleared.
    function defer( func ) {
        //return delay.apply({}, [func, 1].concat( slice.call(arguments, 1) ));
        setTimeout( func, 0 );
    }
//    global.defer = defer;

    // Internal function used to implement throttle() and debounce()
/*    function limit( func, wait, debounce ) {

        var timeout;

        return function() {

            function throttler() {
                timeout = undefined;
                func.call( this );
            }

            if ( debounce ) {
                clearTimeout( timeout );
            }

            if ( debounce || ! timeout ) {
                timeout = SetTimeout( throttler, wait );
            }
        };
    }

    // Returns a function, that, when invoked, will only be triggered at most once
    // during a given window of time.
    function throttle( func, wait ) {
        return limit( func, wait, false );
    }
//    global.throttle = throttle;

    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds.
    function debounce( func, wait ) {
        return limit( func, wait, true );
    }
//    global.debounce = debounce;
*/

/*
    Returns a new function with "this" (ie, the scope) set to a specified argument

    Parameters

        scope - Sets "this" in the function to the object passed as scope
        fn - The function to set scope for
        args - an optional array of arguments
*/
    function proxy( scope, fn, args ) {
        return (function() {
            ( args ) ? fn.apply( scope, args ) : fn.call( scope );
        });
    }
//    global.proxy = proxy;


/*
    Function: Boot.trim

    Trims whitespace before and after a string.

    Parameters

        str - The string to trim leading whitespace.

    Returns

    String - The trimmed string.
*/
    function trim( str ) {
        return str.replace(/^\s+/, "").replace(/\s+$/, "");
    }
//    global.trim = trim;


/*
    Function: Boot.param
*/
    function param( obj ) {

        var params = [],
            name;

        for ( name in obj ) {
            if ( obj.hasOwnProperty( name ) ) {
                params.push( encode( name ) + "=" + encode( obj[ name ] ) );
            }
        }

        return params.join("&");
    }
//    global.param = param;


/*
    Function: Boot.parseJSON

    Parses a valid JSON string into a JavaScript object. Thanks, jQuery!

    Parameters

        data - The string of data to parse.

    Returns:

    Object - Parsed JSON object.
*/
/*
    Removing because it's too heavy and developers need to be smart.
    var rvalidchars = /^[\],:{}\s]*$/,
        rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
*/
    function parseJSON( data ) {
        try {
            // Make sure leading/trailing whitespace is removed (IE can't handle it)
            data = trim( data );

            // Attempt to parse using the native JSON parser first
            if ( JSON && JSON.parse ) {
                return JSON.parse( data );
            }

            // Make sure the incoming data is actual JSON
            // // logic borrowed from http://json.org/json2.js
            // *Removing this to decrease weight of the library.
        //    if ( rvalidchars.test(
        //            data.replace( rvalidescape, "@" )
        //                .replace( rvalidtokens, "]" )
        //                .replace( rvalidbraces, "") ) ) {

            return (new Function( "return " + data ))();

        //    }
        } catch (e) {
            // This function may raise eyebrows so be sure to
            // inform developers why it failed.
            if ( window.console ) {
                console.log( "Bad JSON: " + data );
            }
        }
    }
//    global.parseJSON = parseJSON;


/*
    Boot.getJSONP
    Simple function for returning JSONP data.
*/
    var jsonpId = 0;
    function getJSONP( url, callback ) {

        var callbackId = "JSONP_" + jsonpId++;

        url += "&_jsonp=" + namespace + "." + callbackId;

        global[ callbackId ] = function( data ) {

            // Pass data to the callback.
            callback && callback.call( window, data );

            // Cleanup function reference.
            delete global[ callbackId ];
        };

        getScript( url );

    }
//    global.getJSONP = getJSONP;


    // Expose our internal utilities through a module definition.
    define( namespace.toLowerCase() + ".core", {

        now: now,
//        log: log,

        contains: contains,

        is: is,
        isArray: isArray,
        isObject: isObject,
        isElement: isElement,
        isString: isString,
        isBoolean: isBoolean,
        isFunction: isFunction,
        isNumber: isNumber,

        each: each,
        extend: extend,

        setup: setup,

        poll: poll,

        ready: ready,
        bind: bind,
        delegate: delegate,
        load: load,

        events: events,
        subscribe: subscribe,
        publish: publish,

        getCSS: getCSS,
        getScript: getScript,

        modules: modules,
        define: define,
        require: require,
        widget: widget,

        query: query,

        attr: attr,
        data: data,

        addClass: addClass,
        removeClass: removeClass,
        getStyle: getStyle,
        inlineCSS: inlineCSS,

        createHTML: createHTML,

        disableTextSelect: disableTextSelect,

        defer: defer,
        proxy: proxy,

        trim: trim,
        param: param,

        parseJSON: parseJSON,
        getJSONP: getJSONP

    });

}("Mighty", this));


/*
    Mighty Module Framework

    This script processes and initializes mighty modules on the page.
*/
(function( Mighty, document, mightyOptions ){

Mighty.require("mighty.core", function( core ){

    // The mighty init function scans the DOM for anchor
    // links that contain the "mighty" global namespace,
    // and then initializes its widget's source.
    if ( ! Mighty.init ) {

        // Set up Mighty with options API.
        core.setup( Mighty, mightyOptions );

        var strMighty = "mighty",
            mightyAnchors = document.getElementsByName( strMighty );

        // Add class to the document root for greater specificity (if needed).
        core.addClass( document.documentElement, strMighty );

        // Inject mighty module CSS reset.
        // Includes temporary fix for hiding mighty anchors.
        // Need to research ability to use shorthand (i.e. font: inherit)
        core.inlineCSS(".mighty-reset * { border: 0; margin: 0; padding: 0; list-style-type: none; font-family: inherit; font-size: inherit; font-weight: inherit; font-variant: inherit; font-style: inherit; line-height: inherit; text-align: left; background-color: transparent; color: inherit; } a[name=mighty] { display: none; } .mighty-reset { font-family: arial; font-size: 1em; font-weight: normal; font-variant: normal; font-style: normal; line-height: 1.5em; }");

        Mighty.init = function(){

            core.each( mightyAnchors, function( mightyAnchor ) {

                // We need to do this so IE6/7 execute things in
                // the correct order.  Very, very bizarre.
                core.defer(function(){

                    if ( mightyAnchor && mightyAnchor.nodeName === "A" && ! mightyAnchor.widget ) {

                        // Remember we initialized this widget already.
                        mightyAnchor.widget = true;

                        var className = mightyAnchor.className,
                            widgetName = className.replace(/-/g, "."),
                            mightyAnchorParent = mightyAnchor.parentNode,
                            mightyModule,
                            isHTMLReady = false,

                            strLoading = "-loading",
                            strReady = "-ready",

                            // Do our fancy DOM option extraction here.
                            dataOptions = core.data( mightyAnchor ),

                            reg = new RegExp("(\\s|^)" + className + "(\\s|$)", "g"),

                            optionParams;

                        // If the element's parent has the same class name
                        // as the Mighty Anchor, we already have the HTML and
                        // do not need to swap in the <div>.
                        // Note: This test requires the class name to exactly match.
                        // Artz: Consider developing a "hasClass" method.
                        if ( mightyAnchorParent.className && reg.test( mightyAnchorParent.className ) ) {

                            // Set the elem to the parent.
                            mightyModule = mightyAnchorParent;

                            // This is indeed a mighty module!
                            core.addClass( mightyModule, "mighty-module" );

                            // Add our mighty-loading class, indicating the module
                            // is in the process of being initialized.
                            core.addClass( mightyModule, strMighty + strLoading );

                            isHTMLReady = true;

                        // Create a new <div> with the same class name
                        // and replace the Mighty Anchor.
                        } else {

                            mightyModule = document.createElement("div");

                            optionParams = core.param( core.data( mightyAnchor ) );
                            if ( optionParams ) {
                                optionParams = "&" + optionParams;
                            }
                            // Ajax in the module's content.
                            // Make this configurable, or a function of the module eventually.
                            core.getJSONP( Mighty.option("basePath") + "api/?_host=" +
                                Mighty.option("host") + "&_cache=" + (Mighty.option("cache") || 60) +
                                "&_module=" + widgetName + optionParams, function( data ){

                                if ( ! data.error ) {

                                    data = core.trim( data );

                                    // If we get back a module, add it to the
                                    // DOM and initialize.
                                    if ( data ) {

                                        mightyModule = core.createHTML( data );

                                        // This is indeed a mighty module!
                                        core.addClass( mightyModule, "mighty-module" );

                                        // Add our mighty-loading class, indicating the module
                                        // is in the process of being initialized.
                                        core.addClass( mightyModule, strMighty + strLoading );

                                        mightyAnchorParent.insertBefore( mightyModule, mightyAnchor );
                                    }

                                    isHTMLReady = true;

                                    // Publish an event on our anchor indicating we're done.
                                    core.publish( mightyAnchor, widgetName + strReady );

                                }
                            });
                        }

                        // Remove the Mighty Anchor, it's no longer needed.
                        // Consider hiding this if one day we believe it
                        // is valuable, perhaps debugging, validation, etc.
                        // mightyAnchorParent.removeChild( mightyAnchor );
                        mightyAnchor.style.display = "none";

                        // Bring in the modules we need.
                        core.require({ basePath: Mighty.option("basePath"),
                            filename: function(str){ return str.toLowerCase().replace(/\./, "/") + "/" + str.toLowerCase(); },
                            suffix: ".js" }, widgetName, function(){

                            function moduleReady(){
                                mightyAnchor.widget = core.widget( widgetName, mightyModule, dataOptions );
                                core.removeClass( mightyModule, strMighty + strLoading );
                                core.addClass( mightyModule, strMighty + strReady );
                            }

                            if ( isHTMLReady ) {
                                moduleReady();
                            } else {
                                // Let our anchor listen for an event before continuing.
                                core.subscribe( mightyAnchor, widgetName + strReady, moduleReady );
                            }

                        });
                    }

                }); // end core.defer
            }); // end core.each
        }; // end Mighty.init()

        // Run Mighty.init() on DOM Ready (or immediately).
        core.ready( Mighty.init );
    }

    // Initialize Mighty!
    // Artz: Eventually might be cleaner to do Mighty.publish("mighty.init");
    Mighty.init();
});

})(Mighty, document, {
    host: location.hostname,
    basePath: "http://origin.mighty.aol.com/",
    cache: 5
});
