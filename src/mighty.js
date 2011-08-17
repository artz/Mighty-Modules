/*
	Mighty Module Framework
	
	This script processes and initializes mighty modules on the page.
*/
!function(global, window, document, undefined){
	
		// Localize Boot functions.
	var boot = Boot,
		use = boot.use,
		widget = boot.widget,
		extend = boot.extend,
		
		// Localize DOM objects.
		htmlElement = document.documentElement,
		
		mighty = htmlElement[ global ] || ( htmlElement[ global ] = {} ),
		mightyModules = mighty.modules || ( mighty.modules = document.getElementsByName( global ) ),
		mightyModulesCount = mighty.count || 0,
		mightyModulesLength = mightyModules.length;

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
*/
		widget = boot.widget = function( elem, options ){

			// Decide if we want to move this into widget class
			// or outside of it.
			var widgetName = elem.name + "." + elem.className,
				width = Boot.attr( elem, "data-width" );
			
			// Do our fancy DOM option extraction here.
			options = options || {};
			
			// Temporary.  Needs to work with extend function.
			options.width = width || 300;  

			use({ basePath: "../src/", suffix: ".js" }, widgetName, function( source ) {

				var instance = extend( {}, source, {
					options: options,
					element: elem,
					name: elem.className,
					namespace: elem.name
				});

				instance._create();

			});
			
		};
	
	}

	if ( mightyModulesCount !== mightyModulesLength ) {
	
		for (; mightyModulesCount < mightyModulesLength; mightyModulesCount++) {
			widget( mightyModules[ mightyModulesCount ] );
		}
				
		// Update the number of processed modules.
		mighty.count = mightyModulesCount;	
	}
	
	
}("mighty", this, document );