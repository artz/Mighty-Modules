/*global Mighty*/
/*jslint browser: true*/
Mighty.define(["mighty.core", "mighty/breakingnews/mighty.breakingnews.css"], function (core) {

    "use strict";

    var adDivCounter = 0;

    return {

        // These options will be used as defaults
        options: {
            count: 6, // Setting this to 6 for now. This option will help when we build the customize widget feature.
            ads: "off"  // "on" = Show Ads, "off" = No Ads..
        },

        // Set up the widget
        _create: function () {

            var self = this,
                options = self.options,
                element = self.element,

                adDivId = 0,
                adDivName = "mighty-breakingnews-ad";

            self.AdId = adDivName + (adDivCounter += 1);

            self._buildfooter();

            if (options.ads === "on") {
                self._adInclude(self.AdId);
            }

            self._bindevents();
        },

        _adInclude: function () {

            var self = this,
                options = self.options,
                element = self.element,
                ui = self.ui;

            ui.adDiv = document.createElement('div');
            ui.adDiv.className = "mighty-ad";
            ui.adDiv.innerHTML = '<div id="' + self.AdId + '" class="advertisement"></div>';

            element.insertBefore(ui.adDiv, element.firstChild);

            // Render the ad.
            if (window.htmlAdWH) {
                window.htmlAdWH(773630, 300, 250, "ajax", self.AdId);
            }

        },

        _bindevents: function () {

            var self = this,
                options = self.options,
                element = self.element;

            core.delegate(element, ".refresh-news", "click", function (event) {
                element.innerHTML = "Loading...";
                core.getJSONP(Mighty.option("basePath") + "api/?_host=" + location.hostname + "&_module=mighty.breakingnews&count=" + options.count + "&ads=" + options.ads, function (data) {
                    var mightyModule = core.createHTML(data);
                    element.innerHTML = mightyModule.innerHTML;
                    self._buildfooter();

                    // Need a better way to have AdId work across instances.
                    if (options.ads === "on") {
                        self._adInclude();
                        adsReloadAd(self.AdId);
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

            ui.breakingNewsFooter = document.createElement('div');
            ui.breakingNewsFooter.className = 'mighty-breakingnews-footer';
            ui.breakingNewsFooter.innerHTML = '<a class="more-news" href="http://www.huffingtonpost.com" title="Click here for More Breaking News">MORE NEWS</a><a class="refresh-news" id="refresh-news">Refresh</a>';

            element.appendChild(ui.breakingNewsFooter);

        }
    };

});
