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
	
			core.getCSS("../src/mighty.breakingnews.css");
			
			self._getFeed();
			
		},
		
		_getFeed: function() {
	
			var self = this,
				options = self.options,
				element = self.element;
									
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
				numItems = options.numItems,
				length = json.response.length;
				ui = this.ui = {};
		
			ui.breakingNews = document.createElement( 'div' );
			ui.breakingNews.className = 'breaking-news';
			ui.header = document.createElement( 'h2' );
			ui.header.innerHTML = 'HuffPost Breaking News';
			ui.articles = document.createElement( 'div' );
			ui.articles.className = 'articles';
			ui.articleList = document.createElement( 'ul' );
			ui.articleList.className = 'article-list';
			ui.articles.appendChild( ui.articleList );		
			ui.breakingNews.appendChild( ui.header );
			
			ui.breakingNewsFooter = document.createElement( 'div' );
			ui.breakingNewsFooter.className = 'breaking-news-footer';
	
			ui.breakingNews.appendChild( ui.articles );
			ui.breakingNews.appendChild( ui.breakingNewsFooter );
			
			moreNewsLink = document.createElement( 'a' );
			moreNewsLink.className = 'more-news';
			moreNewsLink.href = 'http://www.huffingtonpost.com';
			moreNewsLink.title = 'Click here for More Breaking News';
			moreNewsLink.innerHTML = 'MORE NEWS';
			
			refreshLink = document.createElement( 'a' );
			refreshLink.className = 'refresh-news';
			refreshLink.innerHTML = 'Refresh';
			
			ui.breakingNewsFooter.appendChild( moreNewsLink );				
			ui.breakingNewsFooter.appendChild( refreshLink );	
			
			this.element.appendChild( ui.breakingNews );
			
			for (j=0; j<numItems; j++) {
				var item = json.response[j],
					elem = document.createElement( 'li' ),
					link = document.createElement( 'a' ),
					headline = document.createElement( 'h2' ),
					thumb = document.createElement( 'img' ),
					comments = document.createElement( 'span' );
					
				
				thumb.className = 'thumb';
				comments.className = 'comments';
					
				// Create link
				link.href = item.entry_url;
				
				// Include the full title as the title attribute for the link
				link.title = item.entry_title;
				
				// Fetch the comment count
				comments.innerHTML = '<b>Comments</b>(' + ( item.entry_comment_count ) + ')';
				
				headline.innerHTML = ( item.entry_headline ) ?
					item.entry_headline : item.entry_title;
												
				link.innerHTML = ( item.entry_front_page_title ) ? item.entry_front_page_title : item.entry_title;
	
				// Create thumb
				thumb.src = item.entry_image_large;
				thumb.alt = '';
					
				// Display the thumbnail and short headline for the latest story in the feed
				if (j == 0) {
					link.insertBefore( headline, link.firstChild );
					link.insertBefore( thumb, link.firstChild );
					link.appendChild( comments );
				}
				
				// Add link to list item
				elem.appendChild( link );
	
				ui.articleList.appendChild( elem );				
			}
				

		},
		
		_fetchFeed: function( json ) {
			
			var i,
				options = this.options,
				numItems = options.numItems,
				length = json.response.length;
			
					
		}

	};
	
});
