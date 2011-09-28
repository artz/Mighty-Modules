Mighty.define(["mighty.core"], function( core ){
	
	return {			
		
		// These options will be used as defaults
		options: {
			foo: 'bar',
			count: 6, // Setting this to 6 for now. This option will help when we build the customize widget feature.
			ads: 2	// 1 = Show Ads, 2 = No Ads..							
		},

		// Set up the widget
		_create: function () {
			
			var self = this,
				options = self.options,
				element = self.element;
				
				adDivId = 0;
				adDivName = "mighty-breakingnews-ad";
				AdId = adDivName + (adDivId+1);
							
			self._buildfooter();
				
			core.getCSS("../src/mighty/breakingnews/mighty.breakingnews.css");
			
			if( options.ads == 1 ){
				self._adInclude();
			}

			self._bindevents();			
		},
		
		_adInclude: function () {
			var self = this,
				options = self.options,
				element = self.element,
				ui = self.ui;				
			
			ui.adDiv = document.createElement( 'div' );
			ui.adDiv.className = "mighty-ad";
			ui.adDiv.innerHTML = '<div id="'+ AdId +'" class="advertisement"></div>';
			
			element.insertBefore( ui.adDiv, element.firstChild );
			
			// Render the ad.
			if ( window.htmlAdWH ) {
					htmlAdWH( 773630, 300, 250, "ajax", AdId );
				}			
		
		},
		
		_bindevents: function () {
			
			var self = this,
				options = self.options,
				element = self.element;			
											
			core.delegate( element, ".refresh-news", "click", function( event ){
				element.innerHTML = "loading...";			
				console.log("Refreshed");		
				core.getJSONP("../src/api/?module=mighty.breakingnews&count="+options.count+"&ads="+options.ads, function( data ){
												mightyModule = core.createHTML( data );
												element.innerHTML = mightyModule.innerHTML;	
												self._buildfooter();
												if ( options.ads == 1 ) {
													self._adInclude();
													adsReloadAd( AdId );
												}
																							
				});
				event.preventDefault();					
			});
				
		},
		
		_buildfooter: function () {
			var self = this,
				options = self.options,
				element = self.element,
				ui = this.ui = {};
						
			ui.breakingNewsFooter = document.createElement( 'div' );
			ui.breakingNewsFooter.className = 'mighty-breakingnews-footer';
			ui.breakingNewsFooter.innerHTML = '<a class="more-news" href="http://www.huffingtonpost.com" title="Click here for More Breaking News">MORE NEWS</a><a class="refresh-news" id="refresh-news">Refresh</a>';
			
			element.appendChild( ui.breakingNewsFooter );
		
		},

	};
	
});
