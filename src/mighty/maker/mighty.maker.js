/*global Mighty*/
/*jslint browser: true, nomen: true*/
Mighty.define(["mighty.core"], function( core ){

    // This should run only once, even if multiple maker modules are on the page. (let's verify!).
    core.inlineCSS("\
        .mighty-maker {\
            background-color: #efefef; padding: 12px;\
        }\
        .mighty-maker .maker-name { font-size: 23px; font-weight: bold; }\
        .mighty-maker .maker-description { margin-top: 12px; font-size: 14px; }\
        .mighty-maker .help { display: none; }\
        .mighty-maker .input-text, .mighty-maker .input-number, .mighty-maker .select-options {\
            border: 1px solid #d7d7d7; font-size: 13px; padding: 3px;\
        }\
        .mighty-maker label { display: block; font-weight: bold; padding-top: 12px; }\
        .mighty-maker .input-number { width: 60px; }\
        .mighty-maker .input-text { width: 250px; }\
        .mighty-maker .maker-code > p { font-size: 13px; margin-top: 6px; margin-bottom: 3px;}\
        .mighty-maker .maker-snippet {\
            cursor: pointer; border: 1px solid #d7d7d7; background-color: #fff; padding: 0 3px; font-family: monaco, 'lucida console'; font-size: 11px; line-height: 18px;\
        }\
        .mighty-maker .maker-snippet:hover {\
            border-color: #FE5F35;\
            color: #000;\
            background-color: #FFFF69;\
        }");

    function toHTMLEntities(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');
    }
    function fromHTMLEntities(str) {
        return String(str).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/<br>/g, '\n').replace(/&nbsp;/g, ' ');
    }

    return {

        // These options will be used as defaults
        /*
        options: {
            // TODO: using the value null as a default causes an error
            make: '' // the name of the module to make
        },
        */
        options: {
            name: true,
            description: true,
            preview: true
      // basePath - if needed, you can override the basePath for maker.
        },

        _snippetCache: '',

        // Set up the widget
        _create: function () {

            var self = this,
                options = self.options,
                element = self.element,
                module = options.module,
                width = options.width,
                basePath = options.basePath || Mighty.option("basePath");

        //     core.getCSS("../src/mighty.mostpopular.css");

            // Artz: Can we make this more dynamic? I.e. it should be a data option on the
            // maker anchor.  data-mighty-module="mostpopular"
            // or is this what make should be used for?
            // Feel also like this might belong in the mighty core somehow.
            if (module) {
                // Pull in the make file.
                core.require({ basePath: basePath + "mighty/" + module + "/", suffix: ".js" },
                    "mighty." + module + ".make", function (make) {
                        self.make = make;
                        self._build(make);
                    });
            }
        },

        _getCode: function (entities, script) {

            var self = this,
                inputs = self.inputs,

                dataOptions = function () {
                    var module,
                        dataOptionsStr = "";

                    for (module in inputs) {
                        if (inputs.hasOwnProperty(module) && inputs[module].value !== undefined && inputs[module].value !== "") {
                            // console.log(inputs[module].value);
                            dataOptionsStr += " data-" + module + '="' + toHTMLEntities(inputs[module].value) + '"';
                        }
                    }

                    return dataOptionsStr;
                },

                make = self.make,
                href = make.href ? ' href="' + make.href + '"' : "",
                name = make.name || "Mighty Modules",
                options = self.options,
                basePath = options.basePath || Mighty.option("basePath"),
                // Consider adding a title attribute to the snippet?
                snippet = '<a name="mighty" class="mighty-' + options.module +
                    '"' + dataOptions() + href + '>' + make.name + '</a>';

//          if (script) {
//                snippet += '<script async defer src="' + basePath + 'mighty.min.js"></script>';
//              snippet += '<script>(function(d, s, id){\
//                  if (!d.getElementById(id)){\
//                      var js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];\
//                      js.id = id;\
//                      js.src = "' + basePath + 'mighty.min.js";\
//                  }}(document, "script", "mighty-jssdk"));</script>';
//          }

            return entities ? toHTMLEntities(snippet) : snippet;
        },

        _preview: function () {

            var self = this,
                snippet = self._getCode();

            if (snippet !== self._snippetCache) {
                self._snippetCache = snippet;
                self.ui.preview.innerHTML = self._getCode();
                Mighty.init();
            }

        },

        _build: function (make) {

            var self = this,
                element = self.element,
                options = self.options,
                ui = self.ui = {},

                makeOptions = make.options,
                makeOption,

                i,
                length,
                type,

                previewSection,

                widget = ui.widget = document.createElement('a'),

                codeTextArea = document.createElement("textarea");

            widget.name = 'mighty';
            widget.className = 'mighty-' + options.make;
            widget.innerHTML = options.make;

            // Artz: Why do we set this only to reset it later?
//           element.innerHTML = '<b>make:</b> ' + options.make;

            if (options.name) {
                element.appendChild(core.createHTML('<h2 class="maker-name">' +
                    make.name + '</h2>'));
            }

            if (options.description) {
                element.appendChild(core.createHTML('<div class="maker-description">' +
                    make.description + '</div>'));
            }

            // Build UI for options
            if (core.isArray(makeOptions)) {

//              element.innerHTML = '<h3>Options:</h3>';

                self.inputs = {};

                for (i = 0, length = makeOptions.length; i < length; i += 1) {

                    makeOption = makeOptions[i];

                    // For every option that has a type specified
                    // Make an input of that type
                    // All available methods stored on the make object
                    type = makeOption.type || null;

                    if (type && self._make[type]) {
                        // Artz: I get a little confused with the use of "option", since
                        // mighty modules (like the maker module) have options as well.
                        // self.option() will eventually work too, like jQuery UI.
                        // Maybe use the word config? Or settings?
                        self.inputs[makeOption.option] = self._make[type].call(self, makeOption);
                    }
                }

            }

            ui.code = core.createHTML('<div class="maker-code"><label>Get the Code</label>\
                    <p>1. Include the JavaScript SDK once, ideally right after the opening <code>&lt;body&gt;</code> tag:</p>\
                    <div class="maker-snippet">' +
                    toHTMLEntities('<script>(function (d, s, id) {\n\
if (!d.getElementById(id)) {\n\
  var js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];\n\
  js.id = id; js.src = "' + Mighty.option("basePath") + 'mighty.min.js";\n\
  fjs.parentNode.insertBefore(js, fjs);\n\
}}(document, "script", "mighty-jssdk"));</script>') + '</div>\
                    <p>2. Place the code for your widget where you want it to appear on your page.</p>');

            ui.snippet = core.createHTML('<div class="maker-snippet"></div>"');

            function copyToClipboard(event) {

                var snippet = event.target,
                    code = fromHTMLEntities(snippet.innerHTML),
                    isMac,
                    ctrl = "Ctrl";

                if (window.clipboardData && window.clipboardData.setData) {
                    window.clipboardData.setData("Text", code);
                    window.alert(make.name + ' code snippet copied to clipboard.');
                } else {
                    isMac = /Macintosh/.test(navigator.userAgent);
                    if (isMac) {
                        ctrl = "Command";
                    }
                    window.prompt("Copy to clipboard: " + ctrl + "+C, Enter", code);
                }
            }

            ui.code.appendChild(ui.snippet);
            element.appendChild(ui.code);
            ui.snippet.innerHTML = self._getCode(true, true);

            core.delegate(element, ".maker-snippet", "click", copyToClipboard);

            if (options.preview) {
                previewSection = core.createHTML('<div class="maker-preview"><label>Preview</label></div>');
                ui.preview = core.createHTML('<div class="maker-widget"></div>');
                previewSection.appendChild(ui.preview);
                element.appendChild(previewSection);
                self._preview();
            }
        },

        _make: {
            integer: function (makeOptions) {

                var newOption = document.createElement('div'),
                    input = document.createElement('input'),
                    self = this,

                    maxValue = makeOptions.maximum,
                    minValue = makeOptions.minimum,

                    originalValue;

                newOption.className = "maker-option";
                newOption.innerHTML = '<label for="' + this.options.module +
                    '-option-' + makeOptions.option + '">' + makeOptions.name +
                    ' <b class="help">' + makeOptions.description + '</b></label>';

                core.attr(input, 'type', 'number');
                core.attr(input, 'data-option', makeOptions.option);
                input.className = "input-number";

                core.attr(input, 'value', makeOptions.value);
                originalValue = makeOptions.value;

                // core.isNumber( makeOptions.minimum ) &&
                core.attr(input, 'min', minValue);
                // core.isNumber( makeOptions.maximum ) &&
                core.attr(input, 'max', maxValue);

                newOption.appendChild(input);

                self.element.appendChild(newOption);

                // Rudimentary validation.
                core.bind(input, "focus", function () {
                    originalValue = parseInt(input.value, 10);
                });

                // Update snippet.
                core.bind(input, "blur", function () {
                    var newValue = parseInt(input.value, 10);
                    if (minValue > maxValue) {
                        if (window.console) {
                            window.console.log("Warning: Minimum is greater than Maximum in " + makeOptions.name + " option.");
                        }
                    } else {
                        if (newValue >= minValue && newValue <= maxValue) {
                            originalValue = newValue;
                        }
                        input.value = originalValue;
                    }
                    self.ui.snippet.innerHTML = self._getCode(true, true);
                    self._preview();
                });

                return input;
            },

            text: function (makeOptions) {

                var newOption = document.createElement('div'),
                    input = document.createElement('input'),
                    self = this;

                newOption.className = 'maker-option';
                newOption.innerHTML = '<label for="' + this.options.module +
                    '-option-' + makeOptions.option + '">' + makeOptions.name +
                    ' <b class="help">' + makeOptions.description + '</b></label>';

                core.attr(input, 'type', 'text');

                // Artz: Should be able to use core.data instead.
                // core.data( input, "option", options.option );
                core.attr(input, 'data-option', makeOptions.option);
                input.className = "input-text";

                core.attr(input, 'value', makeOptions.value);

                newOption.appendChild(input);

                self.element.appendChild(newOption);

                core.bind(input, "blur", function () {
                    self.ui.snippet.innerHTML = self._getCode(true, true);
                    self._preview();
                });

                return input;
            },

            select: function (makeOptions) {

                // Internet Explorer has issues creating options
                // with innerHTML, requiring us to create the entire
                // <div> in one go.
                // http://support.microsoft.com/kb/276228
                var optionHTML = [],
                    self = this,
                    values = makeOptions.value,
                    x,

                    forId = self.options.module + '-option-' + makeOptions.option,
                    select;

                optionHTML.push('<div class="maker-option"><label for="' + forId + '">' +
                        makeOptions.name +
                        ' <b class="help">' + makeOptions.description +
                        '</b></label><select id="' + forId +
                        '" class="maker-option select" data-option="' +
                        makeOptions.option + '">'
                );

                for (x in values) {
                    if (values.hasOwnProperty(x)) {
                        optionHTML.push('<option value="' + x + '">' +
                            values[x] + '</option>');
                    }
                }

                optionHTML.push('</select></div>');

                optionHTML = core.createHTML(optionHTML.join(''));

                select = core.query("select", optionHTML)[0];

                core.bind(select, "change", function () {
                    self.ui.snippet.innerHTML = self._getCode(true, true);
                    self._preview();
                });

                self.element.appendChild(optionHTML);

                return select;
            },

            radio: function (makeOptions) {

                window.console && window.console.log("Making radio option for: " + makeOptions.option);

                var newOption = document.createElement('div'),
                    input,
                    self = this,

                    x,
                    values = makeOptions.value,

                    optionsHTML = "";

                newOption.className = "maker-option";
                newOption.innerHTML = '<label> ' + makeOptions.name +
                    ' <b class="help">' + makeOptions.description + '</b></label>';

                for (x in values) {
                    if (values.hasOwnProperty(x)) {
                        optionsHTML += '<input class="input-radio" name="' + makeOptions.option + '" value="' + x + '"> ' + values[x];
                    }
                }

                return false;

            },

            checkbox: function (makeOptions) {

                var newOption = document.createElement( 'div' ),
                    input = document.createElement( 'input' ),
                    self = this;

                newOption.className = "maker-option";
                newOption.innerHTML = '<label> ' + makeOptions.name +
                    ' <b class="help">' + makeOptions.description + '</b></label>';

                core.attr( input, 'name', this.options.module + '-option-' + makeOptions.option );
                core.attr( input, 'type', 'checkbox' );

                if ( makeOptions.value ) {
                    input.checked = true;
                    input.value = "on";
                } else {
                    input.checked = false;
                    input.value = "";
                }

                // Artz: Should be able to use core.data instead.
                // core.data( input, "option", options.option );
                core.attr( input, 'data-option', makeOptions.option );
                input.className = "input-checkbox";

                newOption.firstChild.insertBefore( input, newOption.firstChild.firstChild );

                self.element.appendChild( newOption );

                core.bind( input, "click", function(){
                    core.attr( input, "value", input.checked ? "on" : "" );
                    self.ui.snippet.innerHTML = self._getCode(true, true);
                    self._preview();
                });

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
            core.subscribe( self, 'update', function( event ) {
                self.update.apply( self, [ event ] );
            });
        },

        update: function( event ) {
            var widget = this.ui.widget,
                inputs = this.inputs;

            for ( option in inputs ) {
                core.attr( widget, 'data-' + option, inputs[option].value );
            }

            Mighty.init();
        }
    };

});
