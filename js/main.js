/*
* Template Name: Kerge - Resume / CV / vCard Template
* Author: lmpixels
* Author URL: http://themeforest.net/user/lmpixels
* Version: 2.4
*/

(function($) {
"use strict";
    // Portfolio subpage filters
    function portfolio_init() {
        var portfolio_grid = $('.portfolio-grid'),
            portfolio_filter = $('.portfolio-filters');
            
        if (portfolio_grid) {

            portfolio_grid.shuffle({
                speed: 450,
                itemSelector: 'figure'
            });

            portfolio_filter.on("click", ".filter", function (e) {
                portfolio_grid.shuffle('update');
                e.preventDefault();
                $('.portfolio-filters .filter').parent().removeClass('active');
                $(this).parent().addClass('active');
                portfolio_grid.shuffle('shuffle', $(this).attr('data-group') );
            });

        }
    }
    // /Portfolio subpage filters

    // Contact form validator
    $(function () {

        $('#contact_form').validator();

        $('#contact_form').on('submit', function (e) {
            if (!e.isDefaultPrevented()) {
                var url = "contact_form/contact_form.php";

                $.ajax({
                    type: "POST",
                    url: url,
                    data: $(this).serialize(),
                    success: function (data)
                    {
                        var messageAlert = 'alert-' + data.type;
                        var messageText = data.message;

                        var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                        if (messageAlert && messageText) {
                            $('#contact_form').find('.messages').html(alertBox);
                            $('#contact_form')[0].reset();
                        }
                    }
                });
                return false;
            }
        });
    });
    // /Contact form validator

    // Hide Mobile menu
    function mobileMenuHide() {
        var windowWidth = $(window).width(),
            siteHeader = $('#site_header');

        if (windowWidth < 992) {
            siteHeader.addClass('mobile-menu-hide');
            setTimeout(function(){
                siteHeader.addClass('animate');
            }, 500);
        } else {
            siteHeader.removeClass('animate');
        }
    }
    // /Hide Mobile menu

    function ajaxLoader() {
        // Check for hash value in URL
        var ajaxLoadedContent = $('#page-ajax-loaded');

        function showContent() {
            ajaxLoadedContent.removeClass('rotateOutDownRight closed');
            ajaxLoadedContent.show();
            $('body').addClass('ajax-page-visible');
        }

        function hideContent() {
            $('#page-ajax-loaded').addClass('rotateOutDownRight closed');
            $('body').removeClass('ajax-page-visible');
            setTimeout(function(){
                $('#page-ajax-loaded.closed').html('');
                ajaxLoadedContent.hide();
            }, 500);
        }

        var href = $('.ajax-page-load').each(function(){
            href = $(this).attr('href');
            if(location.hash == location.hash.split('/')[0] + '/' + href.substr(0,href.length-5)){
                var toLoad =  $(this).attr('href');
                showContent();
                ajaxLoadedContent.load(toLoad);
                return false;
            }
        });

        $(document)
            .on("click",".site-main-menu, #ajax-page-close-button", function (e) { // Hide Ajax Loaded Page on Navigation cleck and Close button
                e.preventDefault();
                hideContent();
                location.hash = location.hash.split('/')[0];
            })
            .on("click",".ajax-page-load", function () { // Show Ajax Loaded Page
                var hash = location.hash.split('/')[0] + '/' + $(this).attr('href').substr(0,$(this).attr('href').length-5);
                location.hash = hash;
                showContent();

                return false;
            });
    }

    function scrollTop() {
        if ($(window).scrollTop() > 150) {
            $('.lmpixels-scroll-to-top').removeClass('hidden');
        } else {
            $('.lmpixels-scroll-to-top').addClass('hidden');
        }
    }

    //On Window load & Resize
    $(window)
        .on('load', function() { //Load
            // Animation on Page Loading
            $(".preloader").fadeOut( 800, "linear" );
        })
        .on('resize', function() { //Resize
            mobileMenuHide();
        })
        .scroll(function () {
            scrollTop();
        });


    // On Document Load
    $(document).on('ready', function() {
        // Page Scroll to id fn call //
        var offset = 0;
        if ($(window).width() < 992) {
            offset = 25;
        }
        $(".pt-trigger").mPageScroll2id({
            layout:"vertical",
            highlightClass: "active",
            keepHighlightUntilNext: false,
            scrollSpeed: 880,
            scrollEasing: "easeInOutExpo",
            scrollingEasing: "easeInOutCirc",
            clickedClass: "",
            appendHash: true,
            offset: offset,
            forceSingleHighlight: true,
        }); 

        // Initialize Portfolio grid
        var $portfolio_container = $(".portfolio-grid");
        $portfolio_container.imagesLoaded(function () {
            portfolio_init(this);
        });

        // Blog grid init
        var $container = $(".blog-masonry");
        $container.imagesLoaded(function(){
            $container.masonry();
        });

        // Mobile menu
        $('.menu-toggle').on("click", function () {
            $('#site_header').addClass('animate');
            $('#site_header').toggleClass('mobile-menu-hide');
        });

        // Mobile menu hide on main menu item click
        $('.site-main-menu').on("click", "a", function (e) {
            mobileMenuHide();
        });

        // Sidebar toggle
        $('.sidebar-toggle').on("click", function () {
            $('#blog-sidebar').toggleClass('open');
        });

        // Testimonials Slider
        $(".testimonials.owl-carousel").owlCarousel({
            nav: true, // Show next/prev buttons.
            items: 3, // The number of items you want to see on the screen.
            loop: false, // Infinity loop. Duplicate last and first items to get loop illusion.
            navText: false,
            margin: 25,
            responsive : {
                // breakpoint from 0 up
                0 : {
                    items: 1,
                },
                // breakpoint from 480 up
                480 : {
                    items: 1,
                },
                // breakpoint from 768 up
                768 : {
                    items: 2,
                },
                1200 : {
                    items: 2,
                }
            }
        });


        $(".clients.owl-carousel").imagesLoaded().owlCarousel({
            nav: true, // Show next/prev buttons.
            items: 2, // The number of items you want to see on the screen.
            loop: false, // Infinity loop. Duplicate last and first items to get loop illusion.
            navText: false,
            margin: 10,
            autoHeight: false,
            responsive : {
                // breakpoint from 0 up
                0 : {
                    items: 2,
                },
                // breakpoint from 768 up
                768 : {
                    items: 4,
                },
                1200 : {
                    items: 6,
                }
            }
        });


        // Text rotation
        $('.text-rotation').owlCarousel({
            loop: true,
            dots: false,
            nav: false,
            margin: 0,
            items: 1,
            autoplay: true,
            autoplayHoverPause: false,
            autoplayTimeout: 3800,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn'
        });

        // Lightbox init
        $('body').magnificPopup({
            delegate: 'a.lightbox',
            type: 'image',
            removalDelay: 300,

            // Class that is added to popup wrapper and background
            // make it unique to apply your CSS animations just to this exact popup
            mainClass: 'mfp-fade',
            image: {
                // options for image content type
                titleSrc: 'title',
                gallery: {
                    enabled: true
                },
            },

            iframe: {
                markup: '<div class="mfp-iframe-scaler">'+
                        '<div class="mfp-close"></div>'+
                        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                        '<div class="mfp-title mfp-bottom-iframe-title"></div>'+
                      '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

                patterns: {
                    youtube: {
                      index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

                      id: null, // String that splits URL in a two parts, second part should be %id%
                      // Or null - full URL will be returned
                      // Or a function that should return %id%, for example:
                      // id: function(url) { return 'parsed id'; }

                      src: '%id%?autoplay=1' // URL that will be set as a source for iframe.
                    },
                    vimeo: {
                      index: 'vimeo.com/',
                      id: '/',
                      src: '//player.vimeo.com/video/%id%?autoplay=1'
                    },
                    gmaps: {
                      index: '//maps.google.',
                      src: '%id%&output=embed'
                    }
                },

                srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
            },

            callbacks: {
                markupParse: function(template, values, item) {
                 values.title = item.el.attr('title');
                }
            },
        });

        $('.ajax-page-load-link').magnificPopup({
            type: 'ajax',
            removalDelay: 300,
            mainClass: 'mfp-fade',
            gallery: {
                enabled: true
            },
        });

        //Form Controls
        $('.form-control')
            .val('')
            .on("focusin", function(){
                $(this).parent('.form-group').addClass('form-group-focus');
            })
            .on("focusout", function(){
                if($(this).val().length === 0) {
                    $(this).parent('.form-group').removeClass('form-group-focus');
                }
            });

        //Google Maps
        $("#map").googleMap({
            zoom: 16 // Google Map ZOOM. You can change this value
        });
        $("#map").addMarker({
            address: "S601 Townsend Street, San Francisco, California, USA", // Your Address. Change it
        });


        $('.lmpixels-scroll-to-top').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 400);
            return false;
        });

        window.onhashchange = function(event) {
            if(location.hash) {
                ajaxLoader();
            }
        };

        $('body').append('<div id="page-ajax-loaded" class="page-ajax-loaded animated rotateInDownRight"></div>');
        ajaxLoader();

        scrollTop();
    });

})(jQuery);
