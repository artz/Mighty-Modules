/* global Mighty */
Mighty.define({
	id: 'mighty.mini',
	name: 'Mini Cards',
	description: 'This module displays a feed of cards from a selected brand.',
	href: 'http://mini.aol.com',
	options: [{
		option: 'brand',
		name: 'Brand',
		description: 'Customize the title of the widget',
		type: 'select',
		value: {
				'engadget': 'Engadget',
				'stylelist': 'Stylelist'
			}
		},
		{
			option: 'count',
			name: 'Cards Count',
			description: 'Enter the number of cards to show.',
			type: 'integer',
			value: 10,
			minimum: 4,
			maximum: 25
		}, {
			option: 'more_count',
			name: 'More Cards Count',
			description: 'Number of cards to display when window is scrolled.',
			type: 'integer',
			value: 5,
			minimum: 4,
			maximum: 50
		}]
	});
