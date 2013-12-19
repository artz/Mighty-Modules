/*global Mighty*/
/*jslint browser: true, nomen: true*/
Mighty.define(['mighty.core', 'mighty/mini/mighty.mini.css'], function (core) {

	'use strict';

	return {

		// These options will be used as defaults
		options: {
			more_count: 0,

			// These selectors will automatically run inside
			// the module and grab the resulting elements.
			ui: {
				cardsList: '.cards-list',
				articles: 'article',
				shareLinks: '.share'
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

			var getCardData = function (card) {
				var attributes = card.attributes;
				var data = {};

				for (var i = 0, length = attributes.length; i < length; i += 1) {

					if (/^data-/.test(attributes[i].nodeName)) {
						var key = attributes[i].nodeName.replace('data-', '');
						data[key] = attributes[i].nodeValue;
					}
				}

				return data;
			};

			var addNewCards = function (event) {
				// console.log(event);
				var continuation = ui.cardsList.getAttribute('data-continuation');
				var path = Mighty.option('basePath') +
					'api/?_host=' + location.hostname +
					'&more_count=' + options.more_count +
					'&_module=mighty.mini&continuation=' +
					continuation +
					'&_jsonp=?';

				// Use the fanciest word available for fifth-from-last
				var ultrapreantepenultimate = ui.cardsList.children[ui.cardsList.children.length - 5];

				if (event.target.scrollTop >= ultrapreantepenultimate.offsetTop && !loading && !ended) {
					loading = true;
					core.getJSONP(path, function (html) {
						if (html) {
							// Turn string of html into parsed html
							html = core.createHTML(html);
							var newCardsList = core.query('.cards-list', html)[0];
							if (newCardsList) {
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
							}
						} else {
							ended = true;
						}

						loading = false;
					});
				}
			};

			if (options.more_count !== '0') {
				core.bind(element, 'scroll', core.throttle(addNewCards, 100));
			}

			for (var i = 0, length = ui.shareLinks.length; i < length; i += 1) {
				core.bind(ui.shareLinks[i], 'click', function (event) {
					var type = event.target.className.replace('share ', '');
					var card = core.closest(event.target, '.card');
					var cardData = getCardData(card);
					var text = 'via Mini ' + cardData.brand.charAt(0).toUpperCase() + cardData.brand.slice(1);
					var url = cardData.url;

					switch (type) {
					case 'facebook':
						window.open('http://www.facebook.com/share.php?u=' + encodeURIComponent(url),
							'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600'
						);
						break;
					case 'twitter':
						window.open('http://twitter.com/share?text='+ encodeURIComponent(text) + '&url='+ encodeURIComponent(url) ,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
						break;
					case 'email':
						window.open('mailto:?subject=' + encodeURIComponent(text)  + '&body='+encodeURIComponent(text + '\r\n' + url + '\r\n\r\n via Mini'));
						break;
					}
				});
			}
		}
	};
});
