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
		maximum: 7
	},
	
	{
		option: "vertical",
		name: "Change the City",
		description: "Change the City",
		type: "select",
		value: [{
					slug: "los-angeles",
					title: "Los Angeles"
				},
				{
					slug: "chicago",
					title: "Chicago"
				},
				{
					slug: "dc",
					title: "DC"
				},
				{
					slug: "san-francisco",
					title: "San Francisco"
				},
				{
					slug: "denver",
					title: "Denver"
				},
				{
					slug: "new-york",
					title: "New York"
				}]
	}]
});