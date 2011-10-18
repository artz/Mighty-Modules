/*
	Mighty Local News Blueprint
*/
Mighty.define({
	id: "mighty.localnews",
	name: "Mighty Local News",
	description: "This module allows you to customize the Local News Widget",
	href: "http://mightymodules.com/mighty-localnews/",
	options: [{
		option: "count",
		name: "Article Count",
		description: "Number of stories to be displayed",
		type: "integer",
		value: 4,
		minimum: 2,
		maximum: 10
	}]
});