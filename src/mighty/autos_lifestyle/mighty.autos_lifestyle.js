Mighty.define(["mighty.core"], function( core ){

    // This saves an HTTP request for the CSS.
    // This module may be a great example of a no JS widget, loading only CSS.
    core.inlineCSS(".mighty-autos_lifestyle {\
		background:url(" + Mighty.option("basePath") + "mighty/autos_lifestyle/aol-autos-logo.png) no-repeat right bottom #fff;\
		border:5px solid #0069b5;\
		clear:both;\
		min-height:110px;\
		min-width:220px;\
		max-width:300px;\
		overflow:hidden;\
		padding:22px 15px;\
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
	.mighty-autos h2 {\
		font-family:BebasNeue;\
		font-size:32px;\
		margin-bottom:15px;\
	}\
	.mighty-autos h2 em {color:#2a65b3;}\
	.mighty-autos select {\
		border: 1px solid #ccc;\
		border-radius: 4px;\
		-moz-border-radius: 4px;\
		display: block;\
		font-size: 10px;\
		margin: 10px 0;\
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
		padding: 2px 14px 1px 14px;\
	}\
	.mighty-autos input[type='submit']:hover {\
		background-color: #2a65b3;\
		cursor: pointer;\
	}\
	.mighty-autos select {\
		background: transparent;\
		height: 24px;\
		width: 100%;\
	}");

    return {

        // These options will be used as defaults
//        options: {
//        },

		//_create: function () {
		//}
    };

});
