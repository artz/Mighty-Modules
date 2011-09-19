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
				width = options.width;

//			console.log( 'this is MOST POPULAR', options );
	
			core.getCSS("../src/mighty.breakingnews.css");
	
			// Use our local AJAX proxy to get some JSONP till we have a proper API
	
			/*
			// Use local data
			core.getJSONP( '../api/?file=mostpopular.json', function( json ) {
				// Output our markup
				self._build( json );
			});
			*/
	
			// Actual live API call
			core.getJSONP( '../api/?url=' + encodeURIComponent( 'http://www.huffingtonpost.com/api/?t=featured_news&vertical=home&zone=1,4' ), function( json ) {
				// Output our markup
				self._build( json );
			});
			
		},
	
		_build: function( json ) {
			// console.log( json.response );
			var i,
				options = this.options,
				length = json.response.length,
				ui = this.ui = {};
		
			ui.breakingNews = document.createElement( 'div' );
			ui.breakingNews.className = 'breaking-news';
			ui.header = document.createElement( 'h4' );
			ui.header.innerHTML = 'HuffPost Breaking News';
			ui.articles = document.createElement( 'div' );
			ui.articles.className = 'articles';

			ui.articleList = document.createElement( 'ul' );
			ui.articles.appendChild( ui.articleList );		
			ui.breakingNews.appendChild( ui.header );
	
			ui.breakingNews.appendChild( ui.articles );

			this.element.appendChild( ui.breakingNews );

			i = length;
			//console.log(i);

			for (j=0; j<6; j++) {
				var item = json.response[j],
					elem = document.createElement( 'li' ),
					link = document.createElement( 'a' ),
					headline = document.createElement( 'h2' ),
					thumb = document.createElement( 'img' );
					
				// Create link
				link.href = item.entry_url;
				
				// Include the full title as the title attribute for the link
				link.title = item.entry_title;
				
				headline.innerHTML = ( item.entry_headline ) ?
					item.entry_headline : item.entry_title;
				
				console.log(headline);
								
				link.innerHTML = ( item.entry_front_page_title ) ? item.entry_front_page_title : item.entry_title;
	
				// Create thumb
				thumb.src = item.entry_image_large;
				thumb.alt = '';
					
				// Insert thumb to beginning of link
				if (j == 0) {
				link.insertBefore( headline, link.firstChild );
				link.insertBefore( thumb, link.firstChild );
				}
				
				// Add link to list item
				elem.appendChild( link );
	
				ui.articleList.appendChild( elem );				
			}
					
		}

	};
	
});
