Mighty.define(["mighty.core"], function( core ){
	
	return {
		
		// These options will be used as defaults
		options: {
			foo: 'bar',
			numItems: 6
		},

		// Set up the widget
		_create: function () {
			
			var self = this,
				options = self.options,
				element = self.element,
				width = options.width;
	
			core.getCSS("../src/static/mighty.breakingnews/mighty.breakingnews.css");			
			self._bindevents();			
		},
		
		_bindevents: function () {
			
			var self = this,
				refreshID = document.getElementById('refresh-news');
							
			refreshID.onclick = function ( event ) {
				console.log("Refreshed");		
				
				core.getJSONP("../src/api/?file=mighty.breakingnews/index.php", function( data ){
												mightyModule = core.createHTML( data );
												//refreshID.appendChild( mightyModule );	
												console.log(mightyModule);														
				});					
			}
				
		}

	};
	
});
