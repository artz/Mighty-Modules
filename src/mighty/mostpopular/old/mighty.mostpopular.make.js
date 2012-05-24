Mighty.define({
	id: "mighty.mostpopular",
	name: "Mighty Most Popular",
	description: "This module allows you to customize the Most Popular Widget.",
	href: "http://mightymodules.com/mighty-mostpopular/",
	options: [{
		option: "selected",
		name: "Selected Tab",
		description: "A zero-based index of the current selected tab.",
		type: "integer",
		value: 0,
		minimum: 0,
		maximum: 10
	},
	{
		option: "header",
		name: "Header Title",
		description: "Customize the title of the widget",
		type: "text",
		value: "Most Awesome"
		//minimum: 0,
		//maximum: 10
	},
	{
		option: "width",
		name: "Width",
		description: "The width in pixels of the widget.",
		type: "integer",
		value: 400,
		minimum: 300,
		maximum: 800
	},
	{
		option: "height",
		name: "Height",
		description: "The height in pixels of the widget.",
		type: "integer",
		value: 400,
		minimum: 300,
		maximum: 800
	}]
});
