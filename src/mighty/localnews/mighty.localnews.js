/*global Mighty*/
/*jslint browser: true*/
Mighty.define(["mighty.core", "mighty/localnews/mighty.localnews.css"], function (core) {

    "use strict";

    return {

        // These options will be used as defaults
        options: {
            foo: 'bar',
            count: 6, // Setting this to 6 for now. This option will help when we build the customize widget feature.
            vertical: "chicago"
        },

        // Set up the widget
        _create: function () {

            var self = this,
                options = self.options,
                element = self.element,
                ui = self.ui;

            self._buildFooter();

            self._bindEvents();
        },

        _bindEvents: function () {

            var self = this,
                options = self.options,
                element = self.element,
                vertical,
                ui = this.ui = {};

            core.delegate(element, ".change-city-button", "click", function (event) {
                var changeCity = core.query(".change-city", element);
                changeCity[0].style.display = "block";

                core.delegate(element, '.change-city-submit', "click", function (event) {
                    vertical = core.query(".city-dropdown", element);
                    vertical = vertical[0].value;
                    element.innerHTML = "loading...";
                    core.getJSONP(Mighty.option("basePath") + "api/?module=mighty.localnews&count=" + options.count + "&vertical=" + vertical, function (data) {
                        var mightyModule = core.createHTML(data);
                        element.innerHTML = mightyModule.innerHTML;
                        self._buildFooter();
                    });
                    event.preventDefault();
                });

                event.preventDefault();
            });

        },

        _buildFooter: function () {
            var self = this,
                options = self.options,
                element = self.element,
                ui = this.ui = {};

            ui.localnewsFooter = document.createElement('div');
            ui.localnewsFooter.className = 'mighty-localnews-footer';
            ui.localnewsFooter.innerHTML = '<a class="more-news" href="http://www.huffingtonpost.com/local" title="Click here for More Local News">MORE NEWS</a><a class="change-city-button">Change City</a>';

            ui.changeCity = document.createElement('div');
            ui.changeCity.className = "change-city";
            ui.changeCity.innerHTML = '<select class="city-dropdown"><option value="new-york">New York</option><option value="los-angeles">Los Angeles</option><option value="dc">DC</option><option value="chicago">Chicago</option><option value="san-francisco">San Fransisco</option><option value="denver">Denver</option></select><a class="change-city-submit">Change</a>';
            ui.changeCity.style.display = "none";

            element.appendChild(ui.localnewsFooter);
            element.appendChild(ui.changeCity);
        }
    };

});
