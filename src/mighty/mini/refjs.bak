/*global Mighty*/
/*jslint browser: true, nomen: true*/
Mighty.define(['mighty.core', 'mighty/mini/mighty.mini.css'], function (core) {

	'use strict';

	return {

		// These options will be used as defaults
		options: {
			count: 8,
			more_count: 8,
		// These selectors will automatically run inside
		// the module and grab the resulting elements.
			ui: {
				'articles': 'li',
				'photos': 'img'
			}
		},

		// Set up the widget
		_create: function () {

			var self = this,
				options = self.options,
				ui = self.ui,
				element = self.element,

				articles = ui.articles,
				photos = ui.photos,

				i,
				l,

				showMore,

				count = parseInt(options.count, 10),
				moreCount = parseInt(options.more_count, 10);

			// If our count is greater than the number of articles,
			// reduce the count.
			if (count > articles.length) {
				count = articles.length;
			}

			function moreStories(event) {
				for (i = 0; i < moreCount; i += 1) {
					count += 1;
					if (count === l) {
						showMore.style.display = 'none';
						break;
					} else {
						articles[count].style.display = 'block';
						photos[count].src = core.data(photos[count], 'src');
					}
				}
				event.preventDefault();
			}

			// Display the photos for the visible stories.
			for (i = 0, l = count; i < l; i += 1) {
				photos[i].src = core.data(photos[i], 'src');
			}

			// If count is specified, hide stories.
			if (articles[count]) {
				for (i = count, l = articles.length; i < l; i += 1) {
					articles[i].style.display = 'none';
				}

				// Create showMore link
				showMore = document.createElement('a');
				showMore.innerHTML = 'More Stories ▾';
				showMore.className = 'show-more';
				showMore.href = '#';

				element.appendChild(showMore);

				core.bind(showMore, 'click', moreStories);
			}
		}
	};
});
