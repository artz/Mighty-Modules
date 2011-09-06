/*
	BOOT UTILITY LIBRARY
	Version 0.2
*/
(function( namespace, window, undefined ) {
	
	// Return if global is already defined.
	if ( window[ namespace ] ) {
		return;
	}
	
//		var global = window[ namespace ] || ( window[ namespace ] = {} ),
	var global = window[ namespace ] = {},
	
		// Localize global objects and functions for better compression.
		document = window.document,
		JSON = window.JSON,
		
//		slice = Array.prototype.slice,
	
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
		
		strSpace = " ";
			
//		eventNamespace = namespace.toLowerCase() + ".";

/*
	Function: Boot.now
	
	Gets a current timestamp.
	
	Returns:
	
	Timestamp
*/
	function now() {
		return new Date().getTime();
	}
//	global.now = now;

/*
	Function: Boot.log
	
	Simple method for keeping a log and outputting to the screen.
	
	Parameters:
	
		message - String of the message to log.
	
	Returns:
	
	Boot
*/
/*	var logList,
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
	
*/
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
//	global.contains = contains;

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
//	global.isArray = isArray;
	
	function isObject( obj ) {
		return is( obj, strObject );
	}
//	global.isObject = isObject;
	
	function isString( obj ) {
		return is( obj, strString );
	}
//	global.isString = isString;
	
	function isBoolean( obj ) {
		return is( obj, strBoolean );
	}
//	global.isBoolean = isBoolean;
	
	function isFunction( obj ) {
		return is( obj, strFunction );
	}
//	global.isFunction = isFunction;
	
	function isNumber( obj ) {
		return is( obj, strNumber );
	}
//	global.isNumber = isNumber;


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
	//	if ( array && array.length ) {  
		var i = 0, l = array.length;
		for (; i < l; i++ ) {
			callback( array[i], i, array );
		}
	//	}
		
	}
//	global.each = each;

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
//		if ( isString( target ) ) {
//			target = modules[ target ];
//		}
		
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
					if ( isObject( source[name] ) && ! source[name].nodeType ) {
						target[name] = extend( isArray( source[name] ) ? [] : {}, target[name], source[name] );
					} else {
						target[name] = source[name];
					}
				}
			}
		}
		return target;
	}
//	global.extend = extend;

/*
	Boot.options
*/
	var bootOptions = {};
	function options( customOptions, value ) {
		if ( isString( customOptions ) ) {
			extend( bootOptions[ customOptions ], value );
		} else {
			extend( bootOptions, customOptions );
		}
	}
//	global.options = options;


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
		
		timers[ name ] = setInterval(function(){
			
			time = now() - start;
			
			if ( check() || ( timeout && ( isTimeout = time > timeout )) ) {
				callback.call( window, isTimeout, time );
				clearInterval( timers[ name ] );
			}
			
		}, pollDelay );
		 
	}
//	global.poll = poll;


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
			//	console.log("Executing in the next cycle.");
				defer( callback );	
						
			} else {
	
				if ( isReadyBound ) {
				//	log("Pushing ready callback.");
					// Push function into the queue.
					readyQueue.push( callback );
					
				} else {
				//	log("Binding ready.");
					isReadyBound = 1;
					
					// Add this callback to our queue to
					// be executed when ready.
					readyQueue = [ callback ];
					
					if ( checkReady() ) {
					//	log("Already ready.");
						// It is ready right now, execute ready.
						execReady();
					} else {	
						// Good browsers.
						if ( document.addEventListener ) {
				//			console.log("Binding DOMContentLoaded.");
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
//	global.ready = ready;

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
		event.target = event.srcElement;
		
		return event;
	}
	
	function bind( object, event, callback ) {
		
		if (object.attachEvent) {
			object.attachEvent("on" + event, function(){ callback( patchIEEvent( window.event ) ); } );
		} else if (object.addEventListener) {
			object.addEventListener(event, callback, false);
		}
	}
//	global.bind = bind;

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
//	global.load = load;


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
*/
	var cssLoading = {};
	function getCSS( src ) {
		if ( ! cssLoading[ src ] ) {
			cssLoading[ src ] = 1;
			var styleSheet = document.createElement("link");
			styleSheet.rel = "stylesheet";
			styleSheet.href = src;
			firstScriptParent.insertBefore( styleSheet, firstScript );
		}
	}
//	global.getCSS = getCSS;

/*
	Function: Boot.getScript
	
	Loads a script node into the DOM. Note this is different than Boot.getJS, which
	has full functionality for dealing with script dependencies and preserving
	execution order across browsers.
	
	Parameters:
	
		src - The script to load.
		callback - The function to invoke after the script has loaded.
 
*/
		// Script collection on the page.
	var scripts = document.getElementsByTagName( strScript ),

		// The first script on the page.
		firstScript = scripts[0],
		firstScriptParent = firstScript.parentNode;

	function getScript ( src, callback ) { 
	
		var	script = document.createElement( strScript ),
			done = 0;
	
		// Set the source of the script.
		script.src = src;
		
		// This makes good browsers behave like 
		// bad browsers, for consistency.
		script.async = true;
		
		// Attach handlers for all browsers
		script[ strOnLoad ] = script[ strOnReadyStateChange ] = function(){
	
			if ( !done && (!script[ strReadyState ] || 
					script[ strReadyState ] === "loaded" || script[ strReadyState ] === strComplete) ) {

				done = 1;

				callback && callback( src ); 
				
				// Handle memory leak in IE
				script[ strOnLoad ] = script[ strOnReadyStateChange ] = null;
			
				// Removed for weight reasons.  Uncomment if this 
				// causes undue harm to the DOM.
			//	firstScriptParent.removeChild( script );

			}
		};
		
		// This is the safest insertion point to assume.
		// We use a setTimeout to ensure non-blocking behavior.

		firstScriptParent.insertBefore( script, firstScript );

	}
//	global.getScript = getScript;

/*
	Boot.resolve
	Utility for resolving URL addresses.
	TBD on how we want this API to work if 
	we expose it externally and further internally.
	possibly make resolveJS, resolveCSS, resolveFont?
*/
	bootOptions.resolve = {
		basePath: "",
		filename: function(str){ return str.toLowerCase(); },
		suffix: ".min.js"
	};
	
	function resolve( customOptions, module ) {
		var options = extend( {}, bootOptions.resolve, customOptions || {} );
		return options.basePath + options.filename( module ) + options.suffix;
	}

/*
	Boot.define
	Define a module, based on the Asynchronous Module Definition (AMD)
	http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition
*/
	var modules = {},
		moduleDefinitions = {},
		definedModules = [];

	function define( moduleName, moduleDependencies, moduleDefinition ) {
		
//		Boot.log("Defining a module!");
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

//			Boot.log("Loading module dependencies for <b>" + "?" + "</b>: " + moduleDependencies.join(", "));

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
	Boot.require
	Based on YUI's use() function and RequireJS.
*/	
	// Resolves an object.
	function getLibrary( moduleName ) {
		// i.e. "jQuery.alpha", "MyLib.foo.bar"
		var obj = window;

		each( moduleName.split("."), function( name ) {
			if ( obj.hasOwnProperty( name ) ) {
				obj = obj[ name ];
			}
		});
	
		return obj;
	}
	
	bootOptions.require = {};
	function require( customOptions, moduleNames, callback ) {
		
		// Normalize parameters.
		if ( isArray( customOptions ) || isString( customOptions ) ) {
			callback = moduleNames;
			moduleNames = customOptions;
		}
		
		// Make moduleNames an array.
		moduleNames = isString( moduleNames ) ? [ moduleNames ] : moduleNames;
		
		var options = extend( {}, bootOptions.require, customOptions || {} ),
			callbackArgs = [],
			moduleCount = 0;
			
		function moduleReady( i, moduleName, module ) {
			
			if ( module ) {
				modules[ moduleName ] = module;
			}
			
			callbackArgs[i] = modules[ moduleName ];
			
//			Boot.log("<b>" + moduleName + "</b> ready! " + ( i + 1 ) + " of " + moduleNames.length);
			if ( ++moduleCount === moduleNames.length ) {

//				Boot.log("All clear! Time to fire callback.");
				callback.apply( callbackArgs, callbackArgs );
			}
			
			if ( module ) {
				publish( moduleName );
			}
		}

		each( moduleNames, function( moduleName, i ) {

			function defineModule(){
				
//				Boot.log("Done loading script for <b>" + moduleName + "</b>.");
//				Boot.log( "Defined modules: " + definedModules.length );
//				If a module was defined after our download.
//				Boot.log( "Finished: " + src );

				var module,
					moduleDependencies,
					moduleDefinition;

				if ( moduleDefinition = moduleDefinitions[ moduleName ] || definedModules.shift() ) {

					if ( moduleDependencies = moduleDefinition.d ) {

//						Boot.log("<b>" + moduleName + "</b> has a dependency: " + moduleDefinition.d.join(", ") );

						require( moduleDependencies, function(){
//							Boot.log( "Dependencies loaded (" + moduleDefinition.d.join(", ") + "). <b>" + moduleName + "</b> is ready." );
							module = isFunction( moduleDefinition ) ? moduleDefinition.apply( global, arguments ) : moduleDefinition;
							moduleReady( i, moduleName, module );
						});

					} else {

						module = isFunction( moduleDefinition ) ? moduleDefinition() : moduleDefinition;
						moduleReady( i, moduleName, module );

//						Boot.log("<b>" + moduleName + "</b> loaded! " + !!module);
					}

				// Otherwise see if we can snag the module by name (old skool).	
				} else {
					moduleReady( i, moduleName, getLibrary( moduleName )  );
				}
				
			}	
			
//			Boot.log( "Inside require, using " + moduleName );

			// If this module has already been defined, use it.
			if ( moduleName in modules ) {
				// Check for the object.
				if ( modules[ moduleName ] ){
//					Boot.log("Module <b>" + moduleName + "</b> is already defined.");
					moduleReady( i, moduleName ); // callbackArgs[i] = module;
				// It's undefined, so wait a little bit.
				} else {
//					Boot.log("Module <b>" + moduleName + "</b> is in the process of being defined. Queue time!");
					subscribe( moduleName, function(){
//						Boot.log("Module <b>" + moduleName + "</b> is now defined! Assigning to callback argument.");
						moduleReady( i, moduleName );
					});
				}
				
			// Otherwise we'll need to load and define on the fly,
			// all the whilest managing dependencies.	
			} else {
				
				// Temporarily give this guy something so incoming 
				// module requests wait until the event is emmitted.
				modules[ moduleName ] = undefined;
//				Boot.log("Calling getScript: " + moduleName );

				// If the module was defined by some other script
				if ( moduleDefinitions[ moduleName ] ) {
					defineModule();
				// Otherwise fetch the script based on the module name
				} else {
					getScript( resolve( options, moduleName ), defineModule );
				}
			}
			
		});
		
	}
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
			instance = extend( {}, source, {
				element: elem,
				name: elem.className,
				namespace: elem.name,
				option: function( key, value ) {
					
				},
				options: options
			});
			
		instance._create();
		
		return instance;

	}
//	global.widget = widget;


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
	var styleNode = document.createElement("style");

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
//	global.attr = attr;

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
			ret = attr( strData + key );
		} else {
			while( attributesLength-- ) {
				attribute = attributes[ attributesLength ];
				attributeName = attribute.nodeName;
				if ( contains( attributeName, strData ) ) {
					attributesObject[ attributeName.replace( strData, "" ) ] = attribute.nodeValue;
				}
			}
			ret = attributesObject;
		}
		return ret;
	}
//	global.data = data;


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
//	global.addClass = addClass;

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
//	global.removeClass = removeClass;


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
*/
	function inlineCSS( css ){

		var style = styleNode.cloneNode(0),
			styleSheet = style.styleSheet,
			textNode;

		// IE
		if ( styleSheet ) { 
			styleSheet.cssText = css;
		// The World
		} else { 
			textNode = document.createTextNode( css );
			style.appendChild( textNode );
		}
		
		firstScriptParent.insertBefore( style, firstScript );
	}
//	global.inlineCSS = inlineCSS;

/*
	Boot.createHTML
	
	Research: http://domscripting.com/blog/display/99
*/
	function createHTML( html ) {	
		var div = document.createElement("c");
		div.innerHTML = html;
		return div.firstChild;
	}
//	global.createHTML = create;


/*
	Boot.getFont
*/
/*
	var getFontOptions = {
			namespace: "wf-",
			path: "fonts/{f}/{f}-webfont",
			fontface: "@font-face { font-family: '{f}'; src: url('{p}.eot'); src: url('{p}.eot?#iefix') format('embedded-opentype'), url('{p}.woff') format('woff'), url('{p}.ttf') format('truetype'), url('{p}.svg#{f}') format('svg'); font-weight: normal; font-style: normal; }"
		},
		testDiv, // Keep it empty until invoked the first time.
		strLoading = "-loading",
		strActive = "-active",
		strInactive = "-inactive";
	
	function getFont() {
		
		var args = arguments,
			options = getFontOptions,
			fontTemplate = /\{f\}/g,
			fontPathTemplate = /\{p\}/g,
			fontDiv,
			fontName,
			namespacedFontName,
			fontPath,
			fontFace,
			fontfaceCSS = [],
			i = 0, 
			l = args.length;
	
		if ( ! testDiv ) {
			// Shouldn't need these: height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;
			testDiv = createHTML("<div style=\"position:absolute;top:-999px;left:-999px;width:auto;font-size:300px;font-family:serif\">BESs</div>" ); 
			docElem.appendChild( testDiv );
		}
		
		function pollFontDiv( fontDiv, namespacedFontName ) {
			poll( function( time ){
//					Boot.log( "Test width: " + testDiv.offsetWidth + ", " + fontName + ": " + fontDiv.offsetWidth );
				return testDiv.offsetWidth !== fontDiv.offsetWidth;
			}, function( isTimeout, time){ 
//					Boot.log("Different widths detected in " + time + "ms. Timeout? " + isTimeout); 
				if ( isTimeout ) {
					
					removeClass( docElem, namespacedFontName + strLoading );
					addClass( docElem, namespacedFontName + strInactive );

					publish( eventNamespace + namespacedFontName + strInactive );
//					window.console && console.log( "Font timeout: " + namespacedFontName );
				} else {
				
					removeClass( docElem, namespacedFontName + strLoading );
					addClass( docElem, namespacedFontName + strActive );
					
					publish( eventNamespace + namespacedFontName + strActive );

				}
//					fontDiv.parentNode.removeChild( fontDiv ); // Unnecessary expense?
			}, 25, 10000 ); // Make this configurable via Boot.options.
		}
		
		// Boot.each might be a cleaner approach, revisit someday maybe.
		for (; i < l; i++ ) {
			
			fontName = args[i].toLowerCase();
			
//			Boot.log( "Getting font: <b>" + fontName + "</b>" );
			
			fontPath = options.path.replace( fontTemplate, fontName );
			
//			Boot.log( "Setting font URL: <b>" + fontPath + "</b>" );
			
			fontFace = options.fontface.replace( fontTemplate, fontName ).replace( fontPathTemplate, fontPath );
			
//			Boot.log( "Generating @fontface: <b>" + fontFace + "</b>");
			
			fontfaceCSS.push( fontFace );
			
			fontDiv = testDiv.cloneNode( true );
			
			fontDiv.style.fontFamily = "'" + fontName + "',serif";
						
			docElem.appendChild( fontDiv );
						
			namespacedFontName = options.namespace + fontName;
			
			publish( eventNamespace + namespacedFontName + strLoading );
						
			addClass( docElem, namespacedFontName + strLoading );
			
			// Had to use a closure inside the loob because of the callback.
			// Consider switching to Boot.each() for brevity.
			pollFontDiv( fontDiv, namespacedFontName );
			
		}
		
		inlineCSS( fontfaceCSS.join("") );
		
	}

	global.getFont = getFont;
*/
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
/*	function map( obj, iterator, context ) {
		var results = [];
		each( obj, function( value, index, list ) {
			results[ results.length ] = iterator.call( context, value, index, list );
		});
		return results;
	}
  */
	// Delays a function for the given number of milliseconds, and then calls
	// it with the arguments supplied.
/*	function delay( func, wait ) {
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
//	global.defer = defer;
	
	// Internal function used to implement throttle() and debounce()
/*	function limit( func, wait, debounce ) {
		
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
//	global.throttle = throttle;
	
	// Returns a function, that, as long as it continues to be invoked, will not
	// be triggered. The function will be called after it stops being called for
	// N milliseconds.
	function debounce( func, wait ) {
		return limit( func, wait, true );
	}
//	global.debounce = debounce;
*/

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
//	global.trim = trim;
	
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
		//	if ( rvalidchars.test( 
		//			data.replace( rvalidescape, "@" )
		//				.replace( rvalidtokens, "]" )
		//				.replace( rvalidbraces, "") ) ) {
		
			return (new Function( "return " + data ))();
	
		//	}
		} catch (e) {
			// This function may raise eyebrows so be sure to 
			// inform developers why it failed.
			if ( window.console ) {
				console.log( "Bad JSON: " + data );
			}
		}
	}
//	global.parseJSON = parseJSON;
	

/*
	Boot.getJSONP
	Simple function for returning JSONP data.
*/	
	var jsonpId = 0;
	function getJSONP( url, callback ) {
		
		var callbackId = "JSONP_" + jsonpId++;
		
		url += "&callback=" + namespace + "." + callbackId;

		getScript( url );

		global[ callbackId ] = function( data ) {

			// Pass data to the callback.
			callback && callback.call( window, data );
			
			// Cleanup function reference.
			delete global[ callbackId ];
		};
			
	}
//	global.getJSONP = getJSONP;
	
	// Expose our internal utilities through a module definition.
	define( namespace.toLowerCase() + ".core", {
		
		now: now,
//		log: log,
		
		contains: contains,
		
		is: is,
		isArray: isArray,
		isObject: isObject,
		isString: isString,
		isBoolean: isBoolean,
		isFunction: isFunction,
		isNumber: isNumber,
		
		each: each,
		extend: extend,
		
	//	options: options, // Meh?

		poll: poll,
		
		ready: ready,
		bind: bind,
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
		
		attr: attr,
		data: data,
		
		addClass: addClass,
		removeClass: removeClass,
		getStyle: getStyle,
		inlineCSS: inlineCSS,
		
		createHTML: createHTML,
	
//		getFont: getFont,

		disableTextSelect: disableTextSelect,
		
		defer: defer,
	
		trim: trim,

		parseJSON: parseJSON,
		getJSONP: getJSONP
		
	});
	
}("Mighty", this));


/*
	Mighty Module Framework
	
	This script processes and initializes mighty modules on the page.
*/
(function( Mighty, document ){

Mighty.require("mighty.core", function( core ){

	if ( ! Mighty.init ) {

		// The mighty init function scans the DOM for anchor 
		// links that contain the "mighty" global namespace,
		// and then initializes its widget's source.
		Mighty.init = function(){
			
				// Localize core functions we use more than once.
			var extend = core.extend,
				
				collectionToArray = function( collection ) { 
					var array = [],
						l = collection.length;
					while ( l-- ) {
						array[l] = collection[l];
					}
					return array;
				},
				
				mightyAnchors = collectionToArray( document.getElementsByName( "mighty" ) );
			
			core.each( mightyAnchors, function( mightyAnchor ) {
						
				// We need to do this so IE6/7 execute things in
				// the correct order.  Very, very bizarre.
				core.defer(function(){
				
					if ( mightyAnchor && mightyAnchor.nodeName === "A" && ! mightyAnchor.widget ) {
						
						// Remember we initialized this widget already.
						mightyAnchor.widget = 1;
	
						var className = mightyAnchor.className,
							widgetName = className.replace("-", "."),
							mightyAnchorParent = mightyAnchor.parentNode,
							mightyModule,
							isHTMLReady = 0,
	
							// Do our fancy DOM option extraction here.
							options = extend( options || {}, core.data( mightyAnchor ) );

						// If the element's parent has the same class name
						// as the Mighty Anchor, we already have the HTML and
						// do not need to swap in the <div>.
						if ( className === mightyAnchorParent.className  ) {
							
							// Set the elem to the parent.
							mightyModule = mightyAnchorParent;
							
							isHTMLReady = 1;

						// Create a new <div> with the same class name
						// and replace the Mighty Anchor.
						} else {

							mightyModule = document.createElement("div");

							// Assign the same class name as the anchor.
							mightyModule.className = mightyAnchor.className;

							// These log checks were F'ed up without the
							// boot.defer wrapper above in IE6/7.
						//	Boot.log( "My name: " + widgetName );							
						//	Boot.log( "Setting className: " + div.className );

							mightyAnchorParent.insertBefore( mightyModule, mightyAnchor );
							
							// Ajax in the module's content.
							// Make this configurable, or a function of the module eventually.
							core.getJSONP("../api/?file=../src/mighty.source.html", function( data ){
								mightyModule.innerHTML = data;
								
								isHTMLReady = 1;
								core.publish( mightyModule, widgetName + "-ready" );
							});
						}
						
						// Remove the Mighty Anchor, it's no longer needed.
						// Consider hiding this if one day we believe it
						// is valuable, perhaps debugging, validation, etc.
						mightyAnchorParent.removeChild( mightyAnchor );
						
						// Bring in the modules we need.
						core.require({ basePath: "../src/", suffix: ".js" }, widgetName, function(){						

							if ( isHTMLReady ) {
								core.widget( widgetName, mightyModule, options );
							} else {
								core.subscribe( mightyModule, widgetName + "-ready", function(){
									// Make this guy into a widget.
									core.widget( widgetName, mightyModule, options );
								});		
							}
						});
					}
				}); // end core.defer
			}); // end core.each
		};
	}
	
	// Initialize Mighty!
	Mighty.init();
});
	
}(Mighty, document));