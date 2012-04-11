// Mighty Tabs
// http://jqueryui.com/demos/tabs/
Mighty.define(["mighty.core"], function( core ){

    // Eventually, let's protect against multiple insertions of the core styles.
    core.inlineCSS(".mighty-tabs > .tabs > li { display: inline-block; *display: inline; zoom: 1; } \
        .mighty-tabs .panel { display: none; } .mighty-tabs .selected { display: block; }");

    // Localize core functions.
    var addClass = core.addClass,
        removeClass = core.removeClass;

    return {

        options: {

            ui: {
                tabs: ".tab",
                panels: ".panel"
            },

            selected: 0
        },

        _create: function() {

            var self = this,

                element = self.element,
                options = self.options,
                ui = self.ui,

                uiTabs = ui.tabs,
                uiPanels = ui.panels,

                selected = options.selected,

                strIndex = "index",

                tabParent = core.createHTML("<ul class=\"tabs\"></ul>");

            core.each( uiTabs, function( elem, i ) {

                // Move the tab into the unordered list.
                var li = document.createElement("li");

                // Set the HTML with the same HTML and
                // CSS class as the DOM node.
                li.innerHTML = elem.innerHTML;
                li.className = elem.className;

                // Save index on each tab;
                // Used in event delegation.
                core.data( li, strIndex, i );

                // Append to the nav container.
                tabParent.appendChild( li );

                // Remove the original tab element.
                elem.parentNode.removeChild( elem );

                // Replace the original tab with our
                // list item reference.
                uiTabs[i] = li;

            });

            // Insert the tabParent before the first panel.
            element.insertBefore( tabParent, uiPanels[0] );

            // Delegate clicks for our tabs.
            core.delegate( element, ".tab", "click", function( event ){
                self.select( core.data( event.target, strIndex ) );
            });

            // Set the selected tab.
            self.select( selected );

        },

        select: function( index ) {

            var self = this,
                options = self.options,
                ui = self.ui,
                name = self.name,

                selected = options.selected,

                uiTabs = ui.tabs,
                uiPanels = ui.panels,

                selectedTab = uiTabs[selected],
                selectedPanel = uiPanels[selected],

                newTab,
                newPanel,

                strSelected = "selected",

                minIndex = 0;
                maxIndex = uiTabs.length - 1;


            // If the index is too high, set it to the max.
            if ( index > maxIndex ) {
                index = maxIndex;
            // If the index is too low, set it to the min.
            } else if ( index < minIndex ) {
                index = minIndex;
            }

            newTab = uiTabs[index];
            newPanel = uiPanels[index];

            // jQuery UI reverses this, and hides panels
            // by default.  Selecting removes the hide class.

            // Deselect the selected tab and panel.
            removeClass( selectedTab, strSelected );
            removeClass( selectedPanel, strSelected );

            // Set the selected tab.
            addClass( newTab, strSelected );
            addClass( newPanel, strSelected );

            options.selected = index;
        }
    };
});
