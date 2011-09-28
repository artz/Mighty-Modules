/*
	Mighty Breaking News Blueprint
*/
Mighty.define({
	id: "mighty.breakingnews",
	name: "Mighty Breaking News",
	description: "This module allows you to customize the Breaking News Widget",
	href: "http://mightymodules.com/mighty-breakingnews/",
	options: [{
		option: "count",
		name: "Article Count",
		description: "Number of stories to be displayed",
		type: "integer",
		value: 4,
		minimum: 2,
		maximum: 10
	},
	{
		option: "ads",
		name: "Ad Display (1 = Yes / 2 = No)",
		description: "Display ads flag",
		type: "integer",
		value: 2,
		minimum: 1,
		maximum: 2
	}]
});