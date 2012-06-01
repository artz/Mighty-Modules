/*jslint browser: true*/
(function(window, document, undefined){

    // Artz: Eventually add jQuery to required dependencies.
    Mighty.require("mighty.core", function( core ){

        var $ = window.jQuery,
            $Observer = $({}),

            $factory = $(".factory"),

            $logoFruit = $(".logo > b"),

            $selectedMenuItem,

            factoryMakeHTML = $factory.html(); // save original html

        // bind widget clicks
        $(document).delegate( ".widget", "click", function(event){
            $Observer.trigger("select-widget", {
                widgetName: $(this).data("widget")
            });
            event.preventDefault();
        });

        // handle widget selection
        $Observer.bind("select-widget", function( event, data ) {

            var selectedWidget,
                widgetName = data.widgetName;

            if (widgetName) {

                selectedWidget = widgetName;

                if ( $selectedMenuItem ) {
                    $selectedMenuItem.removeClass("active");
                }
                $selectedMenuItem = $(".chooser > ul > li > a[data-widget='" + selectedWidget + "']");
                $selectedMenuItem.addClass("active");

                // Update location.
                window.location.href = Mighty.option("basePath") + '#' + selectedWidget;

                // Generate maker in factory
                $factory.html("<div class=\"mighty-maker\"><a name=\"mighty\" class=\"mighty-maker\" data-module=\"" + widgetName + "\">Loading...</a></div>");

                Mighty.init();
            }

        });

        // reset factory
        $(document).delegate(".logo", "click", function(event){
            location.href = Mighty.option("basePath") + '#';
            $factory.html( factoryMakeHTML );
            event.preventDefault();
        });

        // If we have a hash, select the widget.
        if (location.hash) {
            $Observer.trigger("select-widget", {
                widgetName: location.hash.substr(1)
            });
        }

    });

})(this, document);
