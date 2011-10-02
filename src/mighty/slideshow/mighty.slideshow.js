Mighty.define(["mighty.core"], function( core ){
		
	return {			
		
		// These options will be used as defaults
		options: {
			foo: 'bar'
		},

		// Set up the widget
		_create: function () {
			
			var self = this,
				options = self.options,
				element = self.element;
				
			core.getCSS("../src/mighty/slideshow/mighty.slideshow.css");

			self._loadSlide(0);		
			
			self._bindevents();	
		},
		
		_loadSlide : function (which) {
			var self = this,
				which = which,
				element = self.element;
				images = core.query('.mighty-slideshow-viewer-li img', element);

				core.each(images, function (elm, i, array) {
				
					if ( which === i ) {
				
						if ( elm.getAttribute('data-src') !== elm.getAttribute('src') ) {
						
							core.bind(elm,'load',function(e){
								
								//console.log(e.target);
								
							});
							
							elm.src = elm.getAttribute('data-src');
						
						}
					
					}
					
				});
			
		},
				
		_bindevents: function () {
		
			var self = this,
				options = self.options,
				element = self.element,
				slideshowView = core.query('.mighty-slideshow-viewer-ul',element)[0];
				
			core.delegate(element,'.mighty-slideshow-controls-next','click',function(){
	
				if ( Number(slideshowView.style.marginLeft.split('px')[0]) > -(Number(slideshowView.style.width.split('px')[0])-298) ) {
	
					slideshowView.style.marginLeft = (slideshowView.style.marginLeft.split('px')[0] - 298) + 'px';
					
					var nextSlideNumber = (Math.abs(Number(slideshowView.style.marginLeft.split('px')[0]))/298)+1;

					self._loadSlide( nextSlideNumber );
	
				}
	
			});
			
			core.delegate(element,'.mighty-slideshow-controls-prev','click',function(){

				if ( Number(slideshowView.style.marginLeft.split('px')[0]) < 0 ) {

					slideshowView.style.marginLeft = (Number(slideshowView.style.marginLeft.split('px')[0]) + 298) + 'px';
					
					var prevSlideNumber = (Math.abs(Number(slideshowView.style.marginLeft.split('px')[0]))/298)-1;
					
					self._loadSlide( prevSlideNumber );

				}

			});
			
			core.delegate(element,'.mighty-slideshow-controls-prev','mouseover',function(){

				if ( Number(slideshowView.style.marginLeft.split('px')[0]) < 0 ) {

					var prevSlideNumber = (Math.abs(Number(slideshowView.style.marginLeft.split('px')[0]))/298)-1;

					if ( prevSlideNumber > -1 ) {

						self._loadSlide( prevSlideNumber );

					}

				}

			});
			
			core.delegate(element,'.mighty-slideshow-controls-next','mouseover',function(){

				if ( Number(slideshowView.style.marginLeft.split('px')[0]) > -(Number(slideshowView.style.width.split('px')[0])-298) ) {

					var nextSlideNumber = (Math.abs(Number(slideshowView.style.marginLeft.split('px')[0]))/298)+1,
						totalSlides = Number(slideshowView.style.width.split('px')[0])/298;

					if ( nextSlideNumber <= totalSlides ) {

						self._loadSlide( nextSlideNumber );

					}

				}

			});
				
		}

	};
	
});
