/*global Mighty*/
/*jslint browser: true, nomen: true*/
Mighty.define(['mighty.core', 'mighty/mini/mighty.mini.css'], function (core) {

	'use strict';

	return {

		// These options will be used as defaults
		options: {
			more_count: 0,
			autoRefresh: true,

			// These selectors will automatically run inside
			// the module and grab the resulting elements.
			ui: {
				reload: '.reload',
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

			var getCards = function (event, highlight) {
				var path = Mighty.option('basePath') +
					'api/?_host=' + location.hostname +
					'&more_count=' + options.more_count +
					'&_module=mighty.mini' +
					'&_jsonp=?';

				highlight = highlight || false;

				ui.reload[0].className += ' loading';

				core.getJSONP(path, function (html) {
					ui.reload[0].className = ui.reload[0].className.replace(' loading', ' ');

					if (html) {
						if (highlight) {
							ui.cardsList.className += ' highlight';
							setTimeout(function () {
								ui.cardsList.className = ui.cardsList.className.replace(' highlight', '');
							}, 1000);
						}
						// Turn string of html into parsed html
						html = core.createHTML(html);
						var newCardsList = core.query('.cards-list', html)[0];
						if (newCardsList) {
							ui.cardsList.innerHTML = '';
							// Add the new cards
							while (newCardsList.firstChild) {
								ui.cardsList.appendChild(newCardsList.firstChild);
							}
						}
					}
				});
			};

			core.bind(ui.reload[0], 'click', function (event) {
				getCards(event, true);
			});

			if (options.autoRefresh) {
				setInterval(getCards, 10000);
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
