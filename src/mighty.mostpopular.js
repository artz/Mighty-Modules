Mighty.define(["mighty.core"], function( core ){
	
	return {
		
		// These options will be used as defaults
		options: {
			// Maximum of items to allow on each pane
			perpane: 7,
			// What pane should be visible initially
			initial: 1,
            foo: 'bar'
		},

		// Set up the widget
		_create: function () {
			
			var self = this,
				options = self.options,
				element = self.element,
				width = options.width;

//			console.log( 'this is MOST POPULAR', options );
	
			core.getCSS("../src/mighty.mostpopular.css");
	
			// Use our local AJAX proxy to get some JSONP till we have a proper API
	
			/*
			// Use local data
			core.getJSONP( '../api/?file=mostpopular.json', function( json ) {
				// Output our markup
				self._build( json );
			});
			*/
	
			// Actual live API call
			core.getJSONP( '../api/?url=' + encodeURIComponent( 'http://www.huffingtonpost.com/api/?t=most_popular_merged' ), function( json ) {
				// Output our markup
				self._build( json );
			});
			
		},
	
		_build: function( json ) {
			// console.log( json.response );
			var i, pane,
				options = this.options,
				length = json.response.length,
				ui = this.ui = {};
	
			ui.numPanes = Math.ceil( length / options.perpane );
	
			ui.mostPopular = document.createElement( 'div' );
			ui.mostPopular.className = 'aol-most-popular-social';
			ui.header = document.createElement( 'h4' );
			ui.header.innerHTML = '<b>HuffpostAOL Social News</b>';
	
			// create navigation
			ui.paneNav = document.createElement( 'span' );
			ui.paneNav.className = 'pane-nav';
			ui.paneNav.innerHTML = 'Most Popular';
	
			ui.nav = document.createElement( 'span' );
			ui.nav.className = 'nav';
	
			// Back arrow
			ui.back = document.createElement( 'a' );
			ui.back.className = 'back';
			ui.back.innerHTML = '<span>Back</span>';
	
			// Pane info section, ex: ( 1 of 4 )
			ui.info = document.createElement( 'span' );
			ui.info.className = 'info';
			ui.info.innerHTML = ' of ';
	
			ui.active = document.createElement( 'span' );
			ui.active.className = 'active';
			ui.active.innerHTML = options.initial;
	
			ui.total = document.createElement( 'span' );
			ui.total.className = 'total';
			ui.total.innerHTML = ui.numPanes;
	
			// Forward arrow
			ui.forward = document.createElement( 'a' );
			ui.forward.className = 'forward';
			ui.forward.innerHTML = '<span>Forward</span>';
	
			// Attach info elements to info span
			ui.info.insertBefore( ui.active, ui.info.firstChild );
			ui.info.appendChild( ui.total );
	
			// Attach info and arrows to nav
			ui.nav.appendChild( ui.back );
			ui.nav.appendChild( ui.info );
			ui.nav.appendChild( ui.forward );
	
			ui.paneNav.appendChild( ui.nav );
	
			ui.header.appendChild( ui.paneNav );
	
			ui.articles = document.createElement( 'div' );
			ui.articles.className = 'articles';
	
			// Generate enough panes to hold entire list with N items per pane
			ui.list = [];
			for ( i = ui.numPanes; i > 0; i -= 1 ) {
				pane = document.createElement( 'ul' );
				ui.list.push( pane );
				ui.articles.appendChild( pane );
			}
	
			ui.mostPopular.appendChild( ui.header );
	
			ui.mostPopular.appendChild( ui.articles );
	
			this.element.appendChild( ui.mostPopular );
	
			// Create our most popular items
			i = length;
			while( i-- ) {
				var item = json.response[i],
					elem = document.createElement( 'li' ),
					link = document.createElement( 'a' ),
					thumb = document.createElement( 'img' ),
					// Current pane is the current number divided by the number of items per pane, rounded up
					// initial +1 is to adjust to starts-from-one counting
					// final -1 is to adjust back to starts-from-zero counting
					pane = ( Math.ceil( ( i + 1 ) / this.options.perpane ) - 1 );
	
				// Create link
				link.href = item.entry_url;
				// Include the full title as the title attribute for the link
				link.title = item.entry_title;
				// But use the front page title (shorter), if it's available, for the link's text
				link.innerHTML = ( item.entry_front_page_title ) ? item.entry_front_page_title : item.entry_title;
	
				// Create thumb
				thumb.src = item.entry_image;
				thumb.alt = '';
	
				// Insert thumb to beginning of link
				link.insertBefore( thumb, link.firstChild );
	
				// Add link to list item
				elem.appendChild( link );
	
				// Prepend (since we're iterating backwards) the item to the list
				ui.list[pane].insertBefore( elem, ui.list[pane].firstChild );
			}
	
			// Hack.
			// There's a bug if you go left the very first time you use the arrows that causes
			// the last item to come in from the right instead of the left, since it doesn't
			// get its computed style for the left property set... for some reason
			core.addClass( ui.list[ui.list.length - 1], 'left' );
	
			ui.numCurrent = options.initial;
			ui.currentPane = ui.list[ui.numCurrent - 1];
			core.addClass( ui.currentPane, 'current' );
	
			// Disable double-click text selection on our pane nav elements
			// (must be done after elements are actually added to the DOM)
			core.disableTextSelect( ui.paneNav );
			core.disableTextSelect( ui.back );
			core.disableTextSelect( ui.forward );
			core.disableTextSelect( ui.info );
	
			// Set height of container to height of current pane
			ui.articles.style.height = core.getStyle( ui.currentPane, 'height' );
	
			this._bindEvents();
		},
	
		_bindEvents: function() {
			var self = this,
				ui = self.ui;
	
			core.bind( ui.back, 'click', function( event ) {
				core.publish( 'change', { direction: -1 } );
				event.preventDefault();
			});
	
			core.bind( ui.forward, 'click', function( event ) {
				core.publish( 'change', { direction: 1 } );
				event.preventDefault();
			});
	
			// Doing some tricky stuff to juggle scope here - note for possible Boot dev
			core.subscribe( self, 'change', (function( event ) { self.change.apply( self, [ event ] ); }));
		},
	
		change: function( event ) {
			// backward = -1
			// forward = 1
			var ui = this.ui,
				dir = event.direction,
				current = ui.numCurrent,
				next = current + dir,
				nextDir = ( dir === 1 ) ? 'right' : 'left',
				prevDir = ( dir === 1 ) ? 'left' : 'right';
	
			if ( next < 1 ) {
				next = ui.numPanes;
			}
	
			if ( next > ui.numPanes ) {
				next = 1;
			}
	
			currentPane = ui.list[current - 1];
			nextPane = ui.list[next - 1];
	
			// Set all panes to the right or left (depending on direction) without animation
			for ( var i = ui.numPanes; i > 0; i -= 1 ) {
				var item = ui.list[i - 1];
				// console.log( item );
				core.addClass( item, 'no-transition' );
				core.removeClass( item, prevDir );
				core.addClass( item, nextDir );
			}
	
			core.removeClass( currentPane, 'left right no-transition' );
	
			core.removeClass( nextPane, 'no-transition' );
	
			core.removeClass( currentPane, 'current' );
			// We want to send the current pane in the OPPOSITE direction of the incoming one
			core.addClass( currentPane, prevDir );
	
			core.addClass( nextPane, 'current' );
			core.removeClass( nextPane, 'left right' );
	
			ui.numCurrent = next;
	
			// Set the active pane number in the navigation
			ui.active.innerHTML = ui.numCurrent;
	
			// Set height of articles (container) to height of new pane
			ui.articles.style.height = core.getStyle( nextPane, 'height' );
		}
	
		// Use the destroy method to clean up any modifications your widget has made to the DOM
	//	destroy: function () {
	//		this.element.removeChild( this.ui.mostPopular );
	//	}
	};
	
});

/*

Properties:

this.element
The element that was used to instantiate the plugin.  For example, if you were to do $( "#foo" ).myWidget(), then inside your widget instance this.element would be a jQuery object containing the element with id foo. If you select multiple elements and call .myWidget() on the collection, a separate plugin instance will be instantiated for each element.  In other words, this.element will always contain exactly one element.
 
this.options
The options currently being used for the plugin configuration.  On instantiation, any options provided by the user will automatically be merged with any default values defined in $.ui.myWidget.prototype.options.  User specified options override the defaults.
 
this.namespace
The namespace the plugin lives in, in this case "ui".  This is usually not needed inside of individual plugins.
 
this.name
The name of the plugin, in this case "myWidget".  Slightly more useful than this.namespace, but generally not needed inside of individual plugins.
 
this.widgetEventPrefix
This is used to determine how to name events that are associated with any callbacks the plugin provides.  For example, dialog has a close callback, and when the close callback is executed, a dialogclose event is triggered.  The name of the event is the event prefix + the callback name.  The widgetEventPrefix defaults to the widget name, but can be overridden if the event names should be different.  For example, when a user starts dragging an element, we don't want the name of the event to be draggablestart, we want it to be dragstart, so we override the event prefix to be "drag".  If the name of the callback is the same as the event prefix, then the event name will not be prefixed.
 
this.widgetBaseClass
This is useful for building class names to use on elements within your widget.  For example, if you wanted to mark an element as being active, you could do element.addClass( this.widgetBaseClass + "-active" ).  This isn't really necessary to use in individual plugins because you can just as easily do .addClass( "ui-myWidget-active" ).  This is more for use inside the widget factory and abstract plugins like $.ui.mouse.


Methods:
 
_create
This is where you setup everything related to your widget, such as creating elements, binding events, etc.  This gets run once, immediately after instantiation.
 
_init
This method is invoked anytime your widget is invoked without arguments, allowing for [need better words here]
 
destroy
This destroys an instantiated plugin and does any necessary cleanup.  All modifications your plugin performs must be removed on destroy.  This includes removing classes, unbinding events, destroying created elements, etc.  The widget factory provides a starting point, but should be extended to meet the needs of the individual plugin.
 
option
Used for getting and setting options after instantiation.  The method signature is the same as .css() and .attr().  You can specify just a name to get a value, a name and value to set a value, or a hash to set multiple values.  This method calls _setOptions internally, so this method should never need to be modified by an individual plugin.
 
_setOptions
An internal utility method that is used for setting options after instantiation.  This method calls _setOption internally, so this method should never need to be modified by an individual plugin.
 
_setOption
Called when a user sets an option value via the option method.  This method may need to be modified by an individual plugin so the plugin can react when certain options change.  For example, when a dialog's title option changes, the text inside the title bar must be updated.
 
_setOption: function(key, value) {
    if (key == 'title') {
        this.titleElement.text(value);
    }
    $.Widget.prototype._setOption.apply(this, arguments);
}
 
enable
Helper method that just calls option('disabled', false).
 
disable
Helper method that just calls option('disabled', true).
 
_trigger
This method must be used to execute all callbacks.  The only required parameter is the name of the callback to execute.  All callbacks also trigger events (see notes about this.widgetEventPrefix above).  You may also provide an event object that represents the event that initiated the process.  For example, a drag event is initiated by a mousemove event, so the original mousemove event object must be passed in to _trigger.  The third parameter is a hash of data that will be passed as a parameter to the callback and event handlers.  Data provided in this hash should only be information that is relevant to the specific event and is not readily available thorugh some other use of the plugin API.

{

	// These options will be used as defaults
	options: {
		clear: null
	},

	// Set up the widget
	_create: function () {},

	// Use the _setOption method to respond to changes to options
	_setOption: function (key, value) {
		switch (key) {
		case "clear":
			// handle changes to clear option  
			break;
		}

		// In jQuery UI 1.8, you have to manually invoke the _setOption method from the base widget
		$.Widget.prototype._setOption.apply(this, arguments);
		// In jQuery UI 1.9 and above, you use the _super method instead
		this._super("_setOption", key, value);
	},

	// Use the destroy method to clean up any modifications your widget has made to the DOM
	destroy: function () {
		// In jQuery UI 1.8, you must invoke the destroy method from the base widget
		$.Widget.prototype.destroy.call(this);
		// In jQuery UI 1.9 and above, you would define _destroy instead of destroy and not call the base method
	}
}

*/
