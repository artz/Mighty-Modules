Boot.define(function(){
	
	return function( elem, options ) {
		
		var width = options.width;
		Boot.attr( elem, "style", "width: " + width + "px" );
		
	}

});