Mighty.define(["mighty.core"], function( core ){

    core.inlineCSS(".mighty-amber > h2 { background: url(" + Mighty.option("basePath") + "mighty/amber/amber-alert-logo.png) no-repeat center center; height: 114px; text-indent: -99em; overflow: hidden; }\
        .mighty-amber { width: 260px; border: 3px solid #c2342a; border-radius: 10px; padding: 20px; background-color: #fffaec; }\
        .mighty-amber li { padding-top: 20px; overflow: hidden; }\
        .mighty-amber img { clear: left; float: left; margin-right: 10px; }\
        .mighty-amber h3 { font-size: 20px; line-height: 20px; padding-bottom: 4px; }\
        .mighty-amber p { font-size: 14px; line-height: 18px; }\
        @-webkit-keyframes border-pulsate {\
            0%   { border-color: rgba(191, 42, 42, 1); }\
            50% { border-color: rgba(244, 186, 40, 1); }\
            100%   { border-color: rgba(191, 42, 42, 1); }\
        }\
        @-moz-keyframes border-pulsate {\
            0%   { border-color: rgba(191, 42, 42, 1); }\
            50% { border-color: rgba(244, 186, 40, 1); }\
            100%   { border-color: rgba(191, 42, 42, 1); }\
        }\
        .mighty-amber {\
            -webkit-animation: border-pulsate 5s infinite;\
            -moz-animation: border-pulsate 5s infinite;\
        }");

    return {

        // These options will be used as defaults
        options: {
        },

        // Set up the widget
        _create: function () {

        }
    };

});
