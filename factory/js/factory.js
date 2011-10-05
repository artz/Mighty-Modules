(function(window, document, undefined){
	
	// Artz: Eventually add jQuery to required dependencies.
	Mighty.require("mighty.core", function( core ){
				
		var $ = window.jQuery,
			$Observer = $({}),
			
			$factory = $(".factory"),
			
			$logoFruit = $(".logo > b"),
			
			factoryMakeHTML = $factory.html(), // save original html
			
			selectedWidget;
		
		// bind widget clicks
		$(document).delegate( ".widget", "click", function(){
			$Observer.trigger("select-widget", {
				widgetName: $(this).data("widget")
			});
		});
		
		// handle widget selection
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
		
		// fancy logo stuff
		$logoFruit.each(function(){
			$(this)
				.addClass("logo-color-" + Math.floor(Math.random()*4))
				.bind("mouseover", function(){
					this.className = "logo-color-" + Math.floor(Math.random()*4);
				});
		});
		
		// reset factory
		$(document).delegate(".logo", "click", function(){
			$factory.html( factoryMakeHTML );
		});
		
	});
	
})(this, document);