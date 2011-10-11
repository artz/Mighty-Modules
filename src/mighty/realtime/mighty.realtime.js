Mighty.define(["mighty.core"], function( core ){
	
	return {			
		
		// These options will be used as defaults
		options: {
			foo: 'bar'						
		},

		// Set up the widget
		_create: function () {
			
					var self = this,
						options = self.options,
						element = self.element,
						ui = self.ui;
						
					core.getCSS("../src/mighty/realtime/mighty.realtime.css");
					
							
		}
		
		
	};
	
});
