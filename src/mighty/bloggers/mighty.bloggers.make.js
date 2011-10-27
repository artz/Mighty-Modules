/*
	Mighty Bloggers
*/
Mighty.define({
	id: "mighty.bloggers",
	name: "Mighty Featured Bloggers",
	description: "This module allows you to customize the Featured Bloggers Widget",
	href: "http://mightymodules.com/mighty-bloggers/",
	options: [{
		option: "count",
		name: "Article Count",
		description: "Number of stories to be displayed",
		type: "integer",
		value: 4,
		minimum: 2,
		maximum: 7
	}]
});