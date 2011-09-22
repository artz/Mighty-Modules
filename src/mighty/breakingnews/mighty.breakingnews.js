Mighty.define(["mighty.core"], function( core ){
	
	return {
		
		// These options will be used as defaults
		options: {
			foo: 'bar',
			numItems: 6 // Setting this to 6 for now. This option will help when we build the customize widget feature.
		},

		// Set up the widget
		_create: function () {
			
			var self = this,
				options = self.options,
				element = self.element,
				ui = this.ui = {};
				
				ui.breakingNewsFooter = document.createElement( 'div' );
				ui.breakingNewsFooter.className = 'breaking-news-footer';
				ui.breakingNewsFooter.innerHTML = '<a class="more-news" href="http://www.huffingtonpost.com" title="Click here for More Breaking News">MORE NEWS</a><a class="refresh-news" id="refresh-news">Refresh</a>';
	
				element.appendChild( ui.breakingNewsFooter );
				
			core.getCSS("../src/mighty/breakingnews/mighty.breakingnews.css");			
			self._bindevents();			
		},
		
		_bindevents: function () {
			
			var self = this,
				refreshID = document.getElementById('refresh-news');
				breakingNewsID = document.getElementById('breaking-news');
				console.log(breakingNewsID);				
				console.log(refreshID);
							
			refreshID.onclick = function ( event ) {
				breakingNewsID.innerHTML = "loading...";			
				console.log("Refreshed");		
				
				core.getJSONP("../src/api/?file=mighty.breakingnews/index.php", function( data ){
												mightyModule = core.createHTML( data );
												breakingNewsID.innerHTML = mightyModule.innerHTML;
												console.log(breakingNewsID);
												refreshID = document.getElementById('refresh-news');
												console.log( "The ID: " + refreshID );																										
				});
				event.preventDefault();					
			}
				
		}

	};
	
});
