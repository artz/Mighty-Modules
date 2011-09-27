Mighty.define(["mighty.core"], function( core ){
	
	// This should run only once, even if multiple maker modules are on the page. (let's verify!).
	core.inlineCSS(".mighty-maker { background-color: #efefef; padding: 12px; } .mighty-maker input { background-color: #fff; } .mighty-maker .maker-option { margin-bottom: 12px; } .mighty-maker .help { display: none; } .mighty-maker .input-text, .mighty-maker .input-number { border: 1px solid #d7d7d7; line-height: 15px; padding: 3px 3px 4px; } .mighty-maker label { display: block; font-weight: bold; } .mighty-maker .input-number { width: 50px; } .mighty-maker .input-text { width: 100px; } .mighty-maker .maker-snippet { border: 1px solid #d7d7d7; background-color: #fff; padding: 0 3px; font-family: monaco, 'lucida sans'; font-size: 11px; line-height: 18px; } ");
				
	function htmlEntities(str) {
		return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	}

	return {
		
		// These options will be used as defaults
        /*
		options: {
            // TODO: using the value null as a default causes an error
            blueprint: '' // the name of the module to make
		},
        */
		options: {
			preview: true
		},
	
		// Set up the widget
		_create: function () {
			
			var self = this,
				options = self.options,
				element = self.element,
				module = options.module,
				width = options.width;
	
		// 	core.getCSS("../src/mighty.mostpopular.css");
			
			// Artz: Can we make this more dynamic? I.e. it should be a data option on the 
			// maker anchor.  data-mighty-module="mostpopular"  
			// or is this what blueprint should be used for?
			// Feel also like this might belong in the mighty core somehow.		
//            core.getJSONP( '../api/?file=../src/mighty.mostpopular.options.json', function( json ) {
//                self._build( json );    
//            });

			if ( module ) {
				core.require({ basePath: "../src/mighty/" + module + "/", suffix: ".js" }, "mighty." + module + ".blueprint", function( blueprint ){
					self.blueprint = blueprint;
					self._build( blueprint );
				});
			}
		},
		
		_getCode: function( entities, script ){
			
			function dataOptions(){
				var inputs = self.inputs,
					module,
					dataOptions = "";
				
				for ( module in inputs ) {
					if ( inputs.hasOwnProperty( module ) ) {
						dataOptions += " data-" + module + '="' + inputs[module].value + '"';
					}
				}
				
				return dataOptions;
			}

			var self = this,
				options = self.options,
				snippet = '<a name="mighty" class="mighty-' + options.module + '"' + dataOptions() + '>Mighty Source</a>';
			
			if ( script ) {
				snippet += '<script async defer src="../src/mighty.js"></script>';
			}
			
			return entities ? htmlEntities( snippet ) : snippet;
		},
	
		_build: function( blueprint ) {
            var self = this,
                element = self.element,
                options = self.options,
                ui = self.ui = {},
				
				blueprintOptions = blueprint.options,
				
                widget = ui.widget = document.createElement( 'a' );

            widget.name = 'mighty';
            widget.className = 'mighty-' + options.blueprint;
            widget.innerHTML = options.blueprint;

			// Artz: Why do we set this only to reset it later?
//           element.innerHTML = '<b>Blueprint:</b> ' + options.blueprint;

            // Build UI for options
            if ( core.isArray( blueprintOptions ) ) {
                var i,
                    length = blueprintOptions.length;
				
//              element.innerHTML = '<h3>Options:</h3>';

                self.inputs = {};

                for ( i = 0; i < length; i += 1 ) {
                    // For every option that has a type specified
                    // Make an input of that type
                    // All available methods stored on the make object
                    var type = blueprintOptions[i].type || null;

                    if ( type ) {
						// Artz: I get a little confused with the use of "option", since
						// mighty modules (like the maker module) have options as well. 
						// self.option() will eventually work too, like jQuery UI.
						// Maybe use the word config? Or settings?
                        self.inputs[blueprintOptions[i].option] = this.make[type].call( this, blueprintOptions[i] );
                    }
                }
				
                ui.code = core.createHTML( '<div class="maker-code"><label>Get the Code</label></div>' );
				ui.snippet = core.createHTML( '<div class="maker-snippet"></div>"' );
				
				ui.code.appendChild( ui.snippet );
                element.appendChild( ui.code );
				
				ui.snippet.innerHTML = self._getCode( true, true );
				
				
            }
			
			if ( options.preview ) {
				ui.preview = core.createHTML( '<div class="maker-preview"><label>Preview</label></div>' );
				ui.preview.appendChild( core.createHTML( self._getCode() ) );
				element.appendChild( ui.preview );
				Mighty.init();
			}

            element.appendChild( widget );

	//		this._bindEvents();
		},

        make: {
            integer: function( blueprintOptions ) {

                var newOption = document.createElement( 'div' ),
                    input = document.createElement( 'input' ),
					self = this;
				
				newOption.className = "maker-option";
                newOption.innerHTML = '<label for="' + this.options.module + '-option-' + blueprintOptions.option + '">' + blueprintOptions.name + ' <b class="help">' + blueprintOptions.description + '</b></label>';

                core.attr( input, 'type', 'number' );
                core.attr( input, 'data-option', blueprintOptions.option );
				input.className = "input-number";

                core.attr( input, 'value', blueprintOptions.value );
				
                blueprintOptions.minimum && core.attr( input, 'min', blueprintOptions.minimum );
                blueprintOptions.maximum && core.attr( input, 'max', blueprintOptions.maximum );

                newOption.appendChild( input );

                self.element.appendChild( newOption );
				
				core.bind( input, "blur", function(){ self.ui.snippet.innerHTML = self._getCode(); });

                return input;
            },

            text: function( blueprintOptions ) {

                var newOption = document.createElement( 'div' ),
                    input = document.createElement( 'input' ),
					self = this;

				newOption.className = "maker-option";
                newOption.innerHTML = '<label for="' + this.options.module + '-option-' + blueprintOptions.option + '">' + blueprintOptions.name + ' <b class="help">' + blueprintOptions.description + '</b></label>';

                core.attr( input, 'type', 'text' );
				
				// Artz: Should be able to use core.data instead. 
				// core.data( input, "option", options.option );
                core.attr( input, 'data-option', blueprintOptions.option );
				input.className = "input-text";
                
                core.attr( input, 'value', blueprintOptions.value );

                newOption.appendChild( input );

                self.element.appendChild( newOption );
				
				core.bind( input, "blur", function(){ self.ui.snippet.innerHTML = self._getCode(); } );

                return input;
            }
        },
	
		_bindEvents: function() {
			var self = this,
                ui = self.ui;
	
			core.bind( ui.update, 'click', function( event ) {
				core.publish( 'update' );
				event.preventDefault();
			});
	
			// Doing some tricky stuff to juggle scope here - note for possible Boot dev
			core.subscribe( self, 'update', (function( event ) { self.update.apply( self, [ event ] ); }));
		},
	
		update: function( event ) {
            var widget = this.ui.widget,
                inputs = this.inputs;

            for ( option in inputs ) {
                core.attr( widget, 'data-' + option, inputs[option].value );
            }

            Mighty.init();
            // core.defer();
		}
	
		// Use the destroy method to clean up any modifications your widget has made to the DOM
	//	destroy: function () {
	//		this.element.removeChild( this.ui.mostPopular );
	//	}
	};
	
});
