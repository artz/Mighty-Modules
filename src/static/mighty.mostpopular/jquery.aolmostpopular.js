/* JUST FOR REFERENCE */






/**
 * .aolPanes - Pane Navigation Plugin
 *
 * Version: 1.0
 * Updated: 2011-03-18
 *
 * Create a paned navigation for displaying panes of different content 
 *
 **/

/**
 * Requirements:
 * - jQuery (John Resig, http://www.jquery.com/)
 * - jQuery Sonar
 **/
(function($) {
    
    $.fn.aolPanes = function( options ) {

        var settings = {
            animationSpeed: 'fast',
            itemSelector: 'li',
            itemsPerPane: 7,
            namespace: 'aol-panes',
            nav: '.pane-nav',
            ui: {
                paneClass: 'pane',
                paneHolder: 'ul',
                nav: {
                    $main: $( '<span />', {
                        'class': 'nav'
                    } ),
                    $back: $( '<a />', {
                        'class': 'back',
                        html: '<span>Back</span>'
                    } ),
                    $forward: $( '<a />', {
                        'class': 'forward',
                        html: '<span>Forward</a>'
                    } ),
                    $info: $( '<span />', {
                        'class': 'info',
                        text: ' of '
                    } ),
                    $active: $( '<span />', {
                        'class': 'active'
                    } ),
                    $total: $( '<span />', {
                        'class': 'total'
                    } )
                }
            }
        };
        
        return this.each(function() {
            if ( options ) { 
                $.extend( settings, options );
            }

            var $panes, $items, changePane, count,
                $this = $( this )
                nav = $this.find( settings.nav ),
                $paneHolder = $this.find( settings.ui.paneHolder ).first(),
                $paneHolderClone = $paneHolder.clone();

            // Divide items into panes
            $items = $paneHolderClone.find( settings.itemSelector );

            for ( count = $items.length; count > 0; count -= settings.itemsPerPane ) {
                $( '<' + settings.ui.paneHolder + ' />' ).append(
                    $( $items.splice( 0, settings.itemsPerPane ) )
                ).addClass( settings.ui.paneClass ).appendTo( $paneHolderClone ); 
            }

            $paneHolderClone.children().insertAfter( $paneHolder );
            $paneHolder.remove();
            
            $panes = $this.find( '.' + settings.ui.paneClass );

            settings.ui.nav.$active.text( '1' );
            settings.ui.nav.$total.text( $panes.length );

            // Create pane nav
            settings.ui.nav.$info
                .prepend( settings.ui.nav.$active )
                .append( settings.ui.nav.$total );

            settings.ui.nav.$main
                .append( settings.ui.nav.$back )
                .append( settings.ui.nav.$info )
                .append( settings.ui.nav.$forward )
                .prependTo( nav );

            // Disable text selection on scroll buttons
            if ( $this.disableTextSelect ) {
                settings.ui.nav.$back.disableTextSelect();
                settings.ui.nav.$forward.disableTextSelect();
            }


            /* BIND EVENTS */ 

            settings.ui.nav.$back.bind( 'click.' + settings.namespace, function( event ) {
                changePane( 'backward' );
                $( this ).trigger( 'mouseenter' );
                event.preventDefault(); 
            });  

            settings.ui.nav.$forward.bind( 'click.' + settings.namespace, function( event ) {
                changePane( 'forward' );
                $( this ).trigger( 'mouseenter' );
                event.preventDefault(); 
            });  

            // Use a sonar-like scrollin custom event to trigger loading of images for next pane a user might view
            // During init, bind only the images in the first pane to the ACTUAL scrollin event from sonar
            $this.find( 'img[data-src]').bind( settings.namespace + 'scrollin', function( event ) {
                var img = this,
                    $img = $( img );
                
                // console.log( 'scrollin triggered' );

                img.src = $img.attr( 'data-src' );
                $img.removeAttr( 'data-src' );
                $img.unbind( settings.namespace + 'scrollin' );
            });

            settings.ui.nav.$back.bind( 'mouseenter.' + settings.namesspace, function( event ) {
                var $activePane = $this.data( 'active-pane' ),
                    $prevPane = $activePane.prev( '.' + settings.ui.paneClass );

                if ( ! $prevPane.length ) {
                    $prevPane = $panes.last();
                }

                $prevPane.find( 'img' ).trigger( settings.namespace + 'scrollin' );
            });

            settings.ui.nav.$forward.bind( 'mouseenter.' + settings.namesspace, function( event ) {
                var $activePane = $this.data( 'active-pane' ),
                    $nextPane = $activePane.next( '.' + settings.ui.paneClass );

                if ( ! $nextPane.length ) {
                    $nextPane = $panes.first();
                }

                $nextPane.find( 'img' ).trigger( settings.namespace + 'scrollin' );
            });

            // Change Pane Function
            changePane = function( direction ) {
                var change, $nextPane, heightDiff,
                    $paneParent = $panes.parent(),
                    $activePane = $this.data( 'active-pane' ),
                    animationCoordinates = {};

                // $this.height( $this.height() );

                direction = direction || 'forward';                     
                if ( direction === 'forward' ) {
                    $nextPane = $activePane.next( '.' + settings.ui.paneClass );

                    if ( $nextPane.length === 0 ) {
                        $nextPane = $panes.first();
                    }

                    animationCoordinates = {
                        activePane: {
                            'start': 0,
                            'stop': -$this.width()
                        },
                        nextPane: {
                            'start': $this.width(),
                            'stop': 0
                        }
                    };

                } else {
                    $nextPane = $activePane.prev( settings.ui.paneHolder );

                    if ( $nextPane.length === 0 ) {
                        $nextPane = $panes.last();
                    }

                    animationCoordinates = {
                        activePane: {
                            'start': 0,
                            'stop': $this.width()
                        },
                        nextPane: {
                            'start': -$this.width(),
                            'stop': 0
                        }
                    };

                };

                change = function() {

                    $activePane.css({
                        left: animationCoordinates.activePane.start, 
                        position: 'absolute',
                        top: $activePane.position().top 
                    }).animate({
                        left: animationCoordinates.activePane.stop
                    }, {
                        duration: settings.animationSpeed
                    });

                    $nextPane.show().css({
                        left: animationCoordinates.nextPane.start, 
                        position: 'relative'
                    }).animate({
                        left: animationCoordinates.nextPane.stop
                    }, {
                        duration: settings.animationSpeed,
                        complete: function() {
                            $activePane.css( 'top', 'auto' );
                            $this.height( 'auto' );
                        }
                    });

                    settings.ui.nav.$active.text( $panes.index( $nextPane ) + 1 );

                    $this.data( 'active-pane', $nextPane );

                }

                heightDiff = $activePane.height() - $nextPane.height();

                $paneParent.animate( {
                    height: $paneParent.height() - heightDiff
                }, settings.animationSpeed );

                change();

            };
            
            /* INIT */

            // Hide all panes and display the first one
            $panes.hide().first()
                .show()
                .find( 'img' )
                .bind( 'scrollin', function() {
                    $( this ).trigger( settings.namespace + 'scrollin' );
                });

            // Store the active pane as data
            $this.data( 'active-pane', $panes.first() );

        });
    }


})(jQuery);

/**
 * .disableTextSelect - Disable Text Select Plugin
 *
 * Version: 1.1
 * Updated: 2007-11-28
 *
 * Used to stop users from selecting text
 *
 * Copyright (c) 2007 James Dempster (letssurf@gmail.com, http://www.jdempster.com/category/jquery/disabletextselect/)
 *
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 **/

/**
 * Requirements:
 * - jQuery (John Resig, http://www.jquery.com/)
 **/
(function($) {
    if ($.browser.mozilla) {
        $.fn.disableTextSelect = function() {
            return this.each(function() {
                $(this).css({
                    'MozUserSelect' : 'none'
                });
            });
        };
        $.fn.enableTextSelect = function() {
            return this.each(function() {
                $(this).css({
                    'MozUserSelect' : ''
                });
            });
        };
    } else if ($.browser.msie) {
        $.fn.disableTextSelect = function() {
            return this.each(function() {
                $(this).bind('selectstart.disableTextSelect', function() {
                    return false;
                });
            });
        };
        $.fn.enableTextSelect = function() {
            return this.each(function() {
                $(this).unbind('selectstart.disableTextSelect');
            });
        };
    } else {
        $.fn.disableTextSelect = function() {
            return this.each(function() {
                $(this).bind('mousedown.disableTextSelect', function() {
                    return false;
                });
            });
        };
        $.fn.enableTextSelect = function() {
            return this.each(function() {
                $(this).unbind('mousedown.disableTextSelect');
            });
        };
    }

})(jQuery);
