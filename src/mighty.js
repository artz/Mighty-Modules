/*
	Mighty Module Framework
	
	This script processes and initializes mighty modules on the page.
*/
!function(global, window, document, undefined){
	
		// Localize Boot functions we use more than once.
	var boot = Boot,
		widget = boot.widget,
		extend = boot.extend,
		
		toArray = function( collection ) { 
			var array = [],
				l = collection.length;
			while ( l-- ) {
				array[l] = collection[l];
			}
			return array;
		},
		
		mightyModules = toArray( document.getElementsByName( global ) ),
		i = 0, 
		l = mightyModules.length;

	// We'll move this to Boot eventually, after 
	// we ensure all functionality provided by 
	// something like jQuery UI Widget widget 
	// is available.
	if ( ! widget ) {
	
/*
		Boot.widget
		
		The Widget factory is a wrapper function that 
		fetches a module that uses the widget skeleton, 
		and initializes it on an element.
		
		Note: This is a work in progress!
*/
		widget = boot.widget = function( elem, options ) {
			
			// We need to do this so IE6/7 execute things in
			// the correct order.  Very, very bizarre.
			boot.defer(function(){
				
				// This 'elem' check is just a safe guard.
				if ( elem && ! elem.widget ) {

					elem.widget = 1;
						
					// Decide if we want to move this into widget class
					// or outside of it.
					var widgetName = elem.className.replace("-", "."),
						elemParent = elem.parentNode,
						div;
	
					// Do our fancy DOM option extraction here.
					options = extend( options || {}, boot.data( elem ) );
				
					// If we have an anchor link placeholder, replace 
					// it with a <div> so we have a valid container.
					if ( elem.nodeName === "A" ) {
	
						div = document.createElement("div");
	
						div.className = elem.className;
						
						// These log checks were F'ed up without the
						// boot.defer wrapper above in IE6/7.
					//	Boot.log( "My name: " + widgetName );							
					//	Boot.log( "Setting className: " + div.className );
	
						elemParent.insertBefore( div, elem );
						elemParent.removeChild( elem );				
						
						elem = div;
						
					}

					boot.use({ basePath: "../src/", suffix: ".js" }, widgetName, function( source ) {
	
						extend( {}, source, {
							element: elem,
							name: elem.className,
							namespace: elem.name,
							options: options
						})._create();
		
					});
				}
				
			});
		};
	}

	for (; i < l; i++) { 
		widget( mightyModules[i] );
	}
	
}("mighty", this, document );