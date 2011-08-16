/*
	Mighty Module Framework
	
	This script processes and initializes mighty modules on the page.
*/
!function(window, document, undefined){
	
		// Localize Boot functions.
	var boot = Boot,
		use = Boot.use,
		factory = boot.factory,
		
		htmlElement = document.documentElement,
		mighty = htmlElement.mighty || ( htmlElement.mighty = {} ),
		mightyModules = mighty.modules || ( mighty.modules = document.getElementsByName("mighty-module") ),
		mightyModulesCount = mighty.count || 0,
		mightyModulesLength = mightyModules.length;

	// We'll move this to Boot eventually, after 
	// we ensure all functionality provided by 
	// something like jQuery UI Widget Factory 
	// is available.
	if ( ! factory ) {
		
		factory = boot.factory = function( elem, options ){
			
			Boot.use({ basePath: "../src/", filename: function(file){ return file.toLowerCase().replace("/", "."); }, suffix: ".js" }, "mighty/source", function( source ) {
				// Temporarily hard coding until we 
				// create a data attribute => object literal converter.
				source( elem, { width: 200 } );
			});
			
		};
		
	}
	
	if ( mightyModulesCount !== mightyModulesLength ) {
		
		for (; mightyModulesCount < mightyModulesLength; mightyModulesCount++) {
			factory( mightyModules[ mightyModulesCount ] );
		}
				
		// Update the number of processed modules.
		mighty.count = mightyModulesCount;	
	}
	
	
}(this, document );