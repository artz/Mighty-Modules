/*global Mighty*/
/*jslint browser: true*/
Mighty.define(["mighty.core", "mighty/bloggers/mighty.bloggers.css"], function (core) {

    "use strict";

    return {

        // These options will be used as defaults
        options: {
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
        },

        _buildFooter: function () {

            var self = this,
                options = self.options,
                element = self.element,
                ui = this.ui = {};

            ui.bloggersFooter = document.createElement('div');
            ui.bloggersFooter.className = 'mighty-bloggers-footer';
            ui.bloggersFooter.innerHTML = '<a class="more-news" href="http://www.huffingtonpost.com/" title="Click here for More Blogs">MORE BLOGS</a>';

            element.appendChild(ui.bloggersFooter);
        }
    };

});
