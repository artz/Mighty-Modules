/*
	Mighty Module Framework
	
	This script processes and initializes mighty modules on the page.
*/
!function(global, window, document, undefined){
	
		// Localize Boot functions we use more than once.
	var boot = Boot,
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
		
		Note: This is a work in progress!
*/
		widget = boot.widget = function( elem, options ){

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