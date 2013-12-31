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
			value: 3,
			minimum: 2,
			maximum: 10
		},
		/*
		{
			option: 'more_count',
			name: 'More Cards Count',
			description: 'Number of cards to display when window is scrolled.',
			type: 'integer',
			value: 10,
			minimum: 0,
			maximum: 20
		},
	 */
		{
			option: 'auto_refresh',
			name: 'Auto Refresh',
			description: 'Whether to automatically refresh the widget to display new content.',
			type: 'checkbox',
			value: 1
		}, {
			option: 'auto_refresh_interval',
			name: 'Auto Refresh Interval',
			description: 'If auto_refresh is set to true, how often (in milliseconds) to refresh the content.',
			type: 'integer',
			value: 60000
		}]
	});
