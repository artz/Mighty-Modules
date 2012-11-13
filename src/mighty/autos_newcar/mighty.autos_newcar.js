/*global Mighty*/
/*jslint browser: true*/
Mighty.define(["mighty.core"], function (core) {

    "use strict";

    // This saves an HTTP request for the CSS.
    // This module may be a great example of a no JS widget, loading only CSS.
    core.inlineCSS(".mighty-autos_newcar {\
		background: url(" + Mighty.option("basePath") + "mighty/autos_newcar/aol-autos-logo.png) no-repeat right bottom #fff;\
		border:5px solid #0069b5;\
		clear:both;\
		min-height: 160px;\
		overflow: hidden;\
		padding:22px 15px;\
		width: 260px;\
	}\
	@font-face{\
		font-family:'BebasNeue';\
		src:url('http://o.aolcdn.com/os/fonts/BebasNeue-webfont.eot');\
		src:url('http://o.aolcdn.com/os/fonts/BebasNeue-webfont.eot?iefix') format('eot'),\
		url('http://o.aolcdn.com/os/fonts/BebasNeue-webfont.woff') format('woff'),\
		url('http://o.aolcdn.com/os/fonts/BebasNeue-webfont.ttf') format('truetype'),\
		url('http://o.aolcdn.com/os/fonts/BebasNeue-webfont.svg#webfontfvFLBU0N') format('svg');\
		font-weight:normal;\
		font-style:normal;\
	}\
    .mighty-autos h2.header {\
		font-family:BebasNeue;\
		font-size: 32px;\
		margin-bottom: 15px;\
	}\
    .mighty-autos h2.header em {color:#2a65b3;}\
    .mighty-autos label {\
		display: block;\
		margin-left:10px;\
	}\
    .mighty-autos input[type='text'], .mighty-autos select {\
        border: 1px solid #ccc;\
        border-radius: 4px;\
        -moz-border-radius: 4px;\
        display: block;\
        float: left;\
        font-size: 10px;\
        margin: 5px 0;\
        padding: 0 8px;\
    }\
    .mighty-autos input[type='submit'] {\
        background-color: #b2b2b2;\
        border-radius: 3px;\
        -moz-border-radius: 3px;\
        color: #fff;\
        float: right;\
        font-size: 12px;\
        font-weight: bold;\
        margin: 5px 0;\
        padding: 2px 14px 1px 14px;\
    }\
    .mighty-autos input[type='submit']:hover {\
        background-color: #2a65b3;\
        cursor: pointer;\
    }\
    .mighty-autos input[type='text'] {width: 100px;}\
    .mighty-autos select {\
        background: transparent;\
        height: 24px;\
        width: 100%;\
    }");

    return {

        // These options will be used as defaults
        options: {
            ui: {
                "make": "h3"
            }
        },

        _create: function () {
            var self = this;

            self._bindEvents();
        },

        _bindEvents: function () {

            var self = this,
                elem = self.element,
                i = 0,
                form = core.query('div', elem)[0],
                makeSelect = document.createElement('select'),
                selectedMake,
                modelSelects = {},
                modelSelect,
                currentMake,

                that,
                models;

            makeSelect.options[0] = new Option('Please Select a Make', '');
            makeSelect.setAttribute('name', 'make');
            core.addClass(makeSelect, 'make');

            while (form.childNodes[i]) {
                that = form.childNodes[i];
                if (that.nodeName === 'H3') {
                    makeSelect.appendChild(new Option(that.innerHTML, that.innerHTML));
                    currentMake = that.innerHTML;
                    modelSelect = document.createElement('select');
                    modelSelect.setAttribute('name', 'model');
                    modelSelect.appendChild(new Option('Please Select a Model', ''));
                    modelSelects[currentMake] = modelSelect;
                    that.style.display = 'none';
                } else if (that.nodeName === 'LABEL') {
                    modelSelect = modelSelects[currentMake];
                    modelSelect.appendChild(new Option(that.childNodes[1].innerHTML, that.childNodes[1].innerHTML));
                    that.style.display = 'none';
                }

                i += 1;
            }

            form.appendChild(makeSelect);

            models = document.createElement('select');
            models.setAttribute('disabled', 'disabled');
            models.options[0] = new Option('Please Select a Model', '');

            form.appendChild(models);

            core.delegate(elem, 'select.make', 'change', function (event) {

                selectedMake = event.target;
                modelSelect = core.query('select', elem)[1];

                if (selectedMake && selectedMake.value !== '') {
                    form.removeChild(modelSelect);
                    form.appendChild(modelSelects[selectedMake.value]);
                    modelSelect.removeAttribute('disabled');
                } else {
                    modelSelect.setAttribute('disabled', 'disabled');
                }
            });
        }
    };
});
