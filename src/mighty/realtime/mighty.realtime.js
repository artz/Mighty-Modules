/*global Mighty*/
Mighty.define(["mighty.core", "mighty/realtime/mighty.realtime.css"], function (core) {

    "use strict";

    return {

        _create: function () {

            var self = this,
                options = self.options,
                element = self.element,
                ui = self.ui,
                titles = core.query('.mighty-realtime-li', element),
                spanTitles = core.query('.mighty-realtime-li .mighty-realtime-title', element);

            core.each(titles, function (elm, i, array) {

                elm.vcolor = elm.getAttribute('data-vcolor');

                var spanTitle = core.query('.mighty-realtime-title', elm),
                    spanArrow = core.query('.arrow', elm),
                    spanViews = core.query('.mighty-realtime-views a', elm);

                core.each(spanTitle, function (elem, i, array) {
                    elem.style.backgroundColor = elm.vcolor;
                });

                core.each(spanArrow, function (elems, i, array) {
                    elems.style.borderLeftColor = elm.vcolor;
                });

                core.each(spanViews, function (elems, i, array) {
                    elems.style.color = elm.vcolor;
                });

            });
        }
    };

});
