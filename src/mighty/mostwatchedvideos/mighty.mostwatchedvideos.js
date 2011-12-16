Mighty.define(["mighty.core"], function( core ){

    var adDivCounter = 0,
        which = 0;

    return {

        // These options will be used as defaults
        options: {
            foo: 'bar',
            ads: 1    // 1 = Show Ads, 2 = No Ads..
        },

        // Set up the widget
        _create: function () {

                    var self = this,
                        options = self.options,
                        element = self.element,
                        ui = self.ui;
                        images = core.query('.mighty-videos-li img', element);
                        totalCount = images.length;
                        totalCount = totalCount-1; // Doing this, coz the index starts with 0 and not 1

                        ui.videoSlide = document.createElement( 'div' );
                        ui.videoSlide.className = "mighty-vid";
                        element.insertBefore( ui.videoSlide, element.lastChild );

                        // Ad related markup goes here
                        adDivId = 0;
                        adDivName = "mighty-mostwatchedvideos-ad";
                        AdId = adDivName + ( adDivCounter++ );

                    core.getCSS( Mighty.option("basePath") + "mighty/mostwatchedvideos/mighty.mostwatchedvideos.css" );

                    if( options.ads == 1 ){
                        self._adInclude();
                    }

                    self._loadSlide(0);

                    self._bindEvents();
        },

        _loadSlide : function (which) {
                    var self = this,
                        which = which,
                        element = self.element,
                        ui = self.ui;

                        core.each(images, function (elm, i, array) {

                            if ( which === i ) {

                                    elm.src = elm.getAttribute('data-src');
                                    elm.href = elm.getAttribute('data-href');
                                    elm.title = elm.getAttribute('data-title');

                                    mightyHTML = '<div class="mighty-mostwatchedvideos-active"><a href="'+elm.href+'" title="'+elm.title+'" class="mighty-mostwatchedvideos-play">Play</a><a href="'+elm.href+'" target="_blank"><img src="'+elm.src+'" /></a><p><a href="'+elm.href+'" target="_blank">'+elm.title+'</a></p></div>';

                                    ui.videoSlide.innerHTML =  mightyHTML;
                                    //console.log(which);

                            }

                        });

                },


        _adInclude: function () {
                    var self = this,
                        options = self.options,
                        element = self.element,
                        ui = self.ui;

                    ui.adDiv = document.createElement( 'div' );
                    ui.adDiv.className = "mighty-ad";
                    ui.adDiv.innerHTML = '<div class="footer-links"><a href="http://www.huffingtonpost.com/" class="huffpost-logo">Breaking News and Opinion on The Huffington Post</a><a href="#" class="link">Get This Widget</a></div><div id="'+ AdId +'" class="advertisement"></div>';

                    element.insertBefore( ui.adDiv, element.lastChild );

                    // Render the ad.
                    if ( window.htmlAdWH ) {
                            htmlAdWH( 808216, 234, 60, "ajax", AdId );
                        }

        },

        _bindEvents: function () {

                    var self = this,
                        options = self.options,
                        nextSlideNumber,
                        prevSlideNumber,
                        element = self.element;

                    core.delegate( element, ".mighty-mostwatchedvideos-controls-next", "click", function( event ){

                            nextSlideNumber = which+1;
                            if (nextSlideNumber >= totalCount){
                                nextSlideNumber = 0;
                            }
                            self._loadSlide(nextSlideNumber);
                                which = nextSlideNumber;

                            prevSlideNumber = which-1;
                            console.log(prevSlideNumber);
                            event.preventDefault();

                    });
                    core.delegate(element,'.mighty-mostwatchedvideos-controls-prev','click',function( event ){
                            //console.log(which);
                            if (which <= 0){
                                which = totalCount;
                            }
                            prevSlideNumber = which--;

                            self._loadSlide(prevSlideNumber);
                            if (prevSlideNumber >= totalCount ){
                                prevSlideNumber = 0;
                            }
                            nextSlideNumber = prevSlideNumber+1;
                            if (nextSlideNumber >= totalCount ){
                                nextSlideNumber = 0;
                            }
                            console.log(nextSlideNumber);

                            event.preventDefault();

                    });

        }

    };

});
