/*
	Mighty Realtime Widget
*/
Mighty.define({
	id: "mighty.realtime",
	name: "What's Being Read ( Realtime )",
	description: "This module allows you to customize the What's Being Read (Realtime) Widget",
	href: "http://mightymodules.com/mighty-realtime/",
	options: [{
		option: "count",
		name: "Number of posts in the Widget",
		description: "Number of Posts to be displayed",
		type: "integer",
		value: 5,
		minimum: 4,
		maximum: 20
	}]
});