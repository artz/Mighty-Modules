// Mighty Tabs
// http://jqueryui.com/demos/tabs/
Mighty.define(["mighty.core"], function( core ){
	return {
		
		options: {
			
			ui: {
				tabs: ".tab"
			},
			
			activeTab: 1
		},
		
		ui: {
			panels: ".panel"
		},
		
		_create: function() {
			
			var self = this,
				element = self.element,
				options = self.options,
				ui = self.ui,
				uiTabs = ui.tabs,
				uiPanels = ui.panels;
			
			
			
			console.log( uiTabs );
			console.log( uiPanels );
						
		},
		
		select: function( index ) {
			
			
			
		}
	};
});