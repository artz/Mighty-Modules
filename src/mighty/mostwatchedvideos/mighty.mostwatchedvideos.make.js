/*
	Mighty Most Watched Videos Widget
*/
Mighty.define({
	id: "mighty.mostwatchedvideos",
	name: "Most Watched Videos",
	description: "This module allows you to customize the Most Watched Videos Widget",
	href: "http://mightymodules.com/mighty-mostwatchedvideos/",
	options: [{
		option: "count",
		name: "Number of Videos in the Widget",
		description: "Number of Videos to be displayed",
		type: "integer",
		value: 5,
		minimum: 5,
		maximum: 20
	},
	{
		option: "ads",
		name: "Ad Display (1 = Yes / 2 = No)",
		description: "Display ads flag",
		type: "integer",
		value: 1,
		minimum: 1,
		maximum: 2
	}]
});