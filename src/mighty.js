/*
	Mighty Module Framework
	
	This script processes and initializes mighty modules on the page.
*/
!function(global, window, document, undefined){
	
		// Localize Boot functions we use more than once.
	var boot = Boot,
		widget = boot.widget,
		mighty = boot.mighty,
		extend = boot.extend,
		
		toArray = function( collection ) { 
			var array = [],
				l = collection.length;
			while ( l-- ) {
				array[l] = collection[l];
			}
			return array;
		};

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
		widget = boot.widget = function( widgetName, elem, options ) {
			var source = boot.modules[ widgetName ],
				instance = extend( {}, source, {
					element: elem,
					name: elem.className,
					namespace: elem.name,
					options: options
				});
			instance._create();
			return instance;
		};
	}
	
	if ( ! mighty ) {
		
		mighty = boot.mighty = {};
		mighty.init = function(){
		
			var mightyModules = toArray( document.getElementsByName( global ) ),
				i = 0, 
				l = mightyModules.length;
				
			for (; i < l; i++) {
				
				// Closure to isolate vars.
				!function( elem ){ 
				
					// We need to do this so IE6/7 execute things in
					// the correct order.  Very, very bizarre.
					boot.defer(function(){
					
						if ( elem && elem.nodeName === "A" && ! elem.widget ) {
							
							// Remember we turned this into a widget already.
							elem.widget = 1;
								
							// Decide if we want to move this into widget class
							// or outside of it.
							var widgetName = elem.className.replace("-", "."),
								elemParent = elem.parentNode,
								div,
									
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
							
							// Bring in the modules we need.
							boot.use({ basePath: "../src/", suffix: ".js" }, widgetName, function( source ) {
								
								// Make this guy a widget.
								var myWidget = widget( widgetName, elem, options );
								
							});
						}
					});
				}( mightyModules[i] );
			}
		};
	}
	mighty.init();
	
}("mighty", this, document );