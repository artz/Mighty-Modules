Mighty.define(["mighty.core", "mighty.tabs"], function( core ){

    return {

        // These options will be used as defaults
        options: {
            selected: 0,
            width: 400
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

            core.getCSS( Mighty.option("basePath") + "mighty/source/mighty.source.css");

            core.attr( element, "style", "width: " + width + "px" );

            // Initialize tabs.
            core.widget( "mighty.tabs", element, { selected: options.selected } );

        }
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
