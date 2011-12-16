Mighty.define(["mighty.core", "mighty.tabs"], function( core ){

	return {

		// These options will be used as defaults
		options: {
			selected: 0,
			width: 300
			// These selectors will automatically run inside
			// the module and grab the resulting elements.
		},

		// Set up the widget
		_create: function () {

			var self = this,
				options = self.options,
				ui = options.ui,
				element = self.element,

				width = options.width;


			core.getCSS( Mighty.option("basePath") + "mighty/mostpopular/mighty.mostpopular.css");

            //console.log( 'Self:', self, 'Element:', element );
			core.attr( element, "style", "width: " + width + "px" );

			// Initialize tabs.
			core.widget( "mighty.tabs", element, { selected: options.selected } );

		}
	};
});
