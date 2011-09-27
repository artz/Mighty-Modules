/*
	Mighty Source Blueprint
*/
Mighty.define({
	id: "mighty-source",
	title: "Mighty Source",
	description: "This module serves as a reference module for engineers developing Mighty Modules.",
	href: "http://mightwidgets.com/mighty-source/",
	options: [{
		option: "selected",
		name: "Selected Tab",
		description: "A zero-based index of the current selected tab.",
		type: "integer",
		value: 0,
		minimum: 0,
		maximum: 2
	},
	{
		option: "width",
		name: "Width",
		description: "The width in pixels of the widget.",
		type: "integer",
		value: 400,
		minimum: 300,
		maximum: 800
	}]
});