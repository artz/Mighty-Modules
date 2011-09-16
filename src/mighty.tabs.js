// Mighty Tabs
// http://jqueryui.com/demos/tabs/
Mighty.define(["mighty.core"], function( core ){
	
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
			
			// Eventually, let's protect against multiple insertions of the core styles.
			core.inlineCSS(".mighty-tabs > .tabs > li {	display: inline-block; } .mighty-tabs .panel { display: none; } .mighty-tabs .selected { display: block; }");
			
			core.each( uiTabs, function( elem, i ) {
				
				// Save index on each tab;
				// Used in event delegation.
				core.data( elem, strIndex, i );
				
				// Move the tab into the unordered list.
				var li = document.createElement("li");
				li.appendChild( elem );
				tabParent.appendChild( li );
				
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
				
				newTab = uiTabs[index],
				newPanel = uiPanels[index],
				
				strSelected = "selected";
			
			// If there's an update to the selected tab.
		//	if ( selected !== index ) {
				
				// jQuery UI reverses this, and hides panels 
				// by default.  Selecting removes the hide class.
				
				// Deselect the selected tab and panel.
			removeClass( selectedTab, strSelected );
			removeClass( selectedPanel, strSelected );
			
			// Set the selected tab.
			addClass( newTab, strSelected );
			addClass( newPanel, strSelected );
			
			options.selected = index;
		//	}
		}
	};
});