(function(window, document, undefined){
	
	// Artz: Eventually add jQuery to required dependencies.
	Mighty.require("mighty.core", function( core ){
				
		var $ = window.jQuery,
			$Observer = $({}),
			
			$factory = $(".factory"),
			
			factoryMakeHTML = $factory.html(), // save original html
			
			selectedWidget;
		
		$(document).delegate( ".widget", "click", function(){
			$Observer.trigger("select-widget", {
				widgetName: $(this).data("widget")
			});
		});
		
		$Observer.bind("select-widget", function( event, data ) {
	
			var widgetName = data.widgetName;
			
			if ( selectedWidget ) {
				// disable selected widget here
			}
			selectedWidget = widgetName;
			
			// generate maker in factory
			$factory.html("<div class=\"mighty-maker\"><a name=\"mighty\" class=\"mighty-maker\" data-module=\"" + widgetName + "\">Loading...</a>");
			
			Mighty.init();
			
		});
		
	});
	
})(this, document);