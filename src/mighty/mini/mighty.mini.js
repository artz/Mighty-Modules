/*global Mighty*/
/*jslint browser: true, nomen: true*/
Mighty.define(['mighty.core', 'mighty/mini/mighty.mini.css'], function (core) {

	'use strict';

	return {

		// These options will be used as defaults
		options: {
		// These selectors will automatically run inside
		// the module and grab the resulting elements.
			ui: {
				cardsList: '.cards-list',
				articles: 'article'
				//'photos': 'img'
			}
		},

		// Set up the widget
		_create: function () {

			var self = this;
			var options = self.options;
			var ui = self.ui;
			var element = self.element;
			var loading = false;
			var ended = false;

			ui.cardsList = ui.cardsList[0];

			// console.log(ui.cardsList);
			// console.log('create', ui.cardsList.getAttribute('data-continuation'));

			var addNewCards = function (event) {
				// console.log(event);
				var continuation = ui.cardsList.getAttribute('data-continuation');
				var path = Mighty.option('basePath') +
					'api/?_host=' + location.hostname +
					'&_module=mighty.mini&continuation=' +
					continuation +
					'&_jsonp=?';

				// Use the fanciest word available for fifth-from-last
				var ultrapreantepenultimate = ui.cardsList.children[ui.cardsList.children.length - 5];

				// console.log('scroll');

				if (event.target.scrollTop >= ultrapreantepenultimate.offsetTop && !loading && !ended) {
					loading = true;
					core.getJSONP(path, function (html) {
						if (html) {
							// Turn string of html into parsed html
							html = core.createHTML(html);

							var newCardsList = core.query('.cards-list', html)[0];
							var newContinuation = newCardsList.getAttribute('data-continuation');

							// Set the new continuation key
							ui.cardsList.setAttribute('data-continuation', newContinuation);

							// console.log('first child?', newCardsList.firstChild.length, (newCardsList.firstChild.length) ? true : false);

							// Add the new cards
							while (newCardsList.firstChild) {
								// console.log('adding child', newCardsList.firstChild);
								ui.cardsList.appendChild(newCardsList.firstChild);
								// console.log(newCardsList.children.length);
							}
						} else {
							ended = true;
						}

						loading = false;
					});
				}
			};
			core.bind(element, 'scroll', core.throttle(addNewCards, 100));
		}
	};
});
