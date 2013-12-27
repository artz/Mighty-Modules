/*global Mighty*/
/*jslint browser: true, nomen: true*/
Mighty.define(['mighty.core', 'mighty/mini/mighty.mini.css'], function (core) {

	'use strict';

	return {

		// These options will be used as defaults
		options: {
			more_count: 0,
			autoRefresh: true,
			autoRefreshInterval: 60000,
			onRender: null,

			// These selectors will automatically run inside
			// the module and grab the resulting elements.
			ui: {
				reload: '.reload',
				cardsList: '.cards-list',
				articles: 'article',
				shareLinks: '.share',
				videos: '.card-video-poster'
			}
		},

		// Set up the widget
		_create: function () {

			var self = this;
			var options = self.options;
			var ui = self.ui;
			var element = self.element;

			ui.cardsList = ui.cardsList[0];

			function renderVideo(video) {
				var embedCode = getEmbedCode({
					contentSource: video.getAttribute('data-content-source'),
					url: video.getAttribute('data-url')
				});

				var videoHTML = core.createHTML('<' + embedCode.type +
					' src="' + embedCode.src + '"><' + embedCode.type + '>');

				video.parentNode.insertBefore(videoHTML, video.nextSibling);
				video.parentNode.removeChild(video);
			}

			for (var i = 0, length = ui.videos.length; i < length; i += 1) {
				renderVideo(ui.videos[i]);
			}

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
					'&count=' + options.count +
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
						var videos = core.query('.card-video-poster', html);
						for (var i = 0, length = videos.length; i < length; i += 1) {
							renderVideo(videos[i]);
						}

						var newCardsList = core.query('.cards-list', html)[0];
						if (newCardsList) {
							ui.cardsList.innerHTML = '';
							// Add the new cards
							while (newCardsList.firstChild) {
								ui.cardsList.appendChild(newCardsList.firstChild);
							}
						}
						if (typeof options.onRender === 'function') {
							options.onRender(element);
						}
					}
				});
			};

			function getEmbedCode(video) {
				var id = null;

				switch (video.contentSource) {
				case 'youtube':
					id = video.url.match(/v=([^&]+)/);
					if (id && id[1]) {
						return {
							type: 'iframe',
							src: '//www.youtube.com/embed/' + id[1] + '?modestbranding=1',
							source: 'youtube'
						};
					}
					break;
				case 'vimeo':
					id = video.url.match(/vimeo.com\/(\d+)/);
					if (id && id[1]) {
						return {
							type: 'iframe',
							src: '//player.vimeo.com/video/' + id[1] + '?badge=0&byline=0&color=#27ae60',
							source: 'vimeo'
						};
					}
					break;
				case 'aol_on':
					id = video.url.match(/-(\d+)\??.*$/);
					if (id && id[1]) {
						var w = 438, h = 260;
						if ($(window).width() < 560) {
							w = 298;
							h = 200;
						}
						return {
							type: 'script',
							src: 'http://pshared.5min.com/Scripts/PlayerSeed.js?sid=281&width=' +
								w + '&height=' + h + '&playList=' + id[1],
							source: 'aol-on'

						};
					}
					break;
				case 'daily_motion':
					id = video.url.match(/dailymotion.com\/video\/([^_]+)/);
					if (id && id[1]) {
						return {
							type: 'iframe',
							src: '//www.dailymotion.com/embed/video/' +
								id[1] + '?highlight=#27ae60&logo=0',
							source: 'daily-motion'
						};
					}
					break;
				case 'instagram':
					id = video.url.match(/instagram.com\/p\/([^_\/]+)/);
					if (id && id[1]) {
						return {
							type: 'iframe',
							src: '//instagram.com/p/' + id[1] + '/embed',
							source: 'instagram'
						};
					}
					break;
				case 'vine':
					id = video.url.match(/vine.co\/v\/([^_\/]+)/);
					if (id && id[1]) {
						return {
							type: 'iframe',
							src: 'https://vine.co/v/' + id[1] + '/embed/simple',
							source: 'vine'
						};
					}
					break;
				}
				return null;
			}

			core.bind(ui.reload[0], 'click', function (event) {
				getCards(event, true);
			});

			if (options.autoRefresh) {
				setInterval(getCards, options.autoRefreshInterval);
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
