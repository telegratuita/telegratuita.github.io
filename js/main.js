

// Alerta
setTimeout(() => {
    const alerta = document.getElementById('alertaDesarrollo');
    //alerta.style.display = 'none';
    $(alerta).slideUp();
}, 5000);

// Buscar Canales
function buscarCanales() {
    var input, filter, cards, cardContainer, h5, title, i;
    input = document.getElementById("searchbox");
    filter = input.value.toUpperCase();
    cardContainer = document.getElementById("canales");
    cards = cardContainer.getElementsByClassName("canal-item");
    for (i = 0; i < cards.length; i++) {
        title = cards[i].querySelector(".canal-item .lm-canal h4");
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
            cards[i].classList.remove("active");
        }
    }
}

(function ($) {
    "use strict";
    var body = $('body');

    function imageCarousel() {
        $('.portfolio-page-carousel').each(function () {
            $(this).imagesLoaded(function () {
                $('.portfolio-page-carousel').owlCarousel({
                    smartSpeed: 1200,
                    items: 1,
                    loop: true,
                    dots: true,
                    nav: true,
                    navText: false,
                    autoHeight: true,
                    margin: 10
                });
            });
        });
    }

    // Fake Player
    $("#playerFake").click(function () {
        console.log("Click en player fake");
        $("#playerContainer").removeClass('hidden');
        $("#twitch-chat-embed").removeClass('hidden');
        $(this).slideUp();
    })

    // Canales filters
    function portfolio_init() {
        $('.canales-content').each(function () {
            var portfolio_grid_container = $(this),
                portfolio_grid_container_id = $(this).attr('id'),
                portfolio_grid = $('#' + portfolio_grid_container_id + ' .lista-canales'),
                portfolio_filter = $('#' + portfolio_grid_container_id + ' .canales-filters'),
                portfolio_filter_item = $('#' + portfolio_grid_container_id + ' .canales-filters .filter');

            if (portfolio_grid) {

                portfolio_grid.shuffle({
                    speed: 450,
                    itemSelector: 'div'
                });

                $('.site-auto-menu').on("click", "a", function (e) {
                    portfolio_grid.shuffle('update');
                });

                portfolio_filter.on("click", ".filter", function (e) {
                    portfolio_grid.shuffle('update');
                    e.preventDefault();
                    portfolio_filter_item.parent().removeClass('active');
                    $(this).parent().addClass('active');
                    portfolio_grid.shuffle('shuffle', $(this).attr('data-group'));
                });

            }
        })
    }

    // Ajax Pages loader
    function ajaxLoader() {
        // Check for hash value in URL
        var ajaxLoadedContent = $('#page-ajax-loaded');

        function showContent() {
            ajaxLoadedContent.removeClass('fadeOutLeft closed');
            ajaxLoadedContent.show();
            $('body').addClass('ajax-page-visible');
        }

        function hideContent() {
            $('#page-ajax-loaded').addClass('fadeOutLeft closed');
            $('body').removeClass('ajax-page-visible');
            setTimeout(function () {
                $('#page-ajax-loaded.closed').html('');
                ajaxLoadedContent.hide();
            }, 500);
        }

        var href = $('.ajax-page-load').each(function () {
            href = $(this).attr('href');
            if (location.hash == location.hash.split('/')[0] + '/' + href.substr(0, href.length - 5)) {
                var toLoad = $(this).attr('href');
                showContent();
                ajaxLoadedContent.load(toLoad);
                return false;
            }
        });

        $(document)
            .on("click", "#ajax-page-close-button", function (e) { // Hide Ajax Loaded Page on Navigation cleck and Close button
                e.preventDefault();
                hideContent();
                location.hash = location.hash.split('/')[0];
            })
            .on("click", ".ajax-page-load", function () { // Show Ajax Loaded Page
                var hash = location.hash.split('/')[0] + '/' + $(this).attr('href').substr(0, $(this).attr('href').length - 5);
                location.hash = hash;
                showContent();

                return false;
            });
    }

    function scrollTop() {
        if ($(body).scrollTop() > 150) {
            $('.lmpixels-scroll-to-top').removeClass('hidden-btn');
        } else {
            $('.lmpixels-scroll-to-top').addClass('hidden-btn');
        }
    }


    // On Document Load
    $(document).ready(function () {
        var movementStrength = 15;
        var height = movementStrength / $(document).height();
        var width = movementStrength / $(document).width();
        $("body").on('mousemove', function (e) {
            var pageX = e.pageX - ($(document).width() / 2),
                pageY = e.pageY - ($(document).height() / 2),
                newvalueX = width * pageX * -1,
                newvalueY = height * pageY * -1;
            if ($('.page-container').hasClass('bg-move-effect')) {
                var elements = $('.home-photo .hp-inner:not(.without-move), .lm-animated-bg');
            } else {
                var elements = $('.home-photo .hp-inner:not(.without-move)');
            }
            elements.addClass('transition');
            elements.css({
                "background-position": "calc( 50% + " + newvalueX + "px ) calc( 50% + " + newvalueY + "px )",
            });

            setTimeout(function () {
                elements.removeClass('transition');
            }, 300);
        })
            .scroll(function () {
                scrollTop();
            });

        // Mobile menu
        $('.menu-toggle').on("click", function () {
            $('.site-nav').addClass('animate');
            $('.site-nav').toggleClass('mobile-menu-hide');
        });

        // Text rotation
        $('.text-rotation').owlCarousel({
            loop: true,
            dots: false,
            nav: false,
            margin: 10,
            items: 1,
            autoplay: true,
            autoplayHoverPause: false,
            autoplayTimeout: 3800,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn'
        });

        // Testimonials Slider
        $(".testimonials.owl-carousel").owlCarousel({
            nav: false, // Show next/prev buttons.
            items: 3, // The number of items you want to see on the screen.
            loop: false, // Infinity loop. Duplicate last and first items to get loop illusion.
            navText: false,
            margin: 25,
            responsive: {
                // breakpoint from 0 up
                0: {
                    items: 1,
                },
                // breakpoint from 480 up
                480: {
                    items: 1,
                },
                // breakpoint from 768 up
                768: {
                    items: 2,
                },
                1200: {
                    items: 2,
                }
            }
        });

        // Clients Slider
        $(".clients.owl-carousel").imagesLoaded().owlCarousel({
            nav: false, // Show next/prev buttons.
            items: 2, // The number of items you want to see on the screen.
            loop: false, // Infinity loop. Duplicate last and first items to get loop illusion.
            navText: false,
            margin: 10,
            autoHeight: false,
            responsive: {
                // breakpoint from 0 up
                0: {
                    items: 1,
                },
                // breakpoint from 480 up
                480: {
                    items: 2,
                },
                // breakpoint from 768 up
                768: {
                    items: 4,
                },
                1200: {
                    items: 6,
                }
            }
        });

        // Lightbox init
        body.magnificPopup({
            fixedContentPos: false,
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
                markup: '<div class="mfp-iframe-scaler">' +
                    '<div class="mfp-close"></div>' +
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                    '<div class="mfp-title mfp-bottom-iframe-title"></div>' +
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
                markupParse: function (template, values, item) {
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

        $('.portfolio-page-wrapper .portfolio-grid').each(function () {
            $(this).magnificPopup({
                delegate: 'a.gallery-lightbox',
                type: 'image',
                gallery: {
                    enabled: true
                }
            });
        });

        $('.form-control').val('');

        $(".form-control").on("focusin", function () {
            $(this).parent('.form-group').addClass('form-group-focus');
        });

        $(".form-control").on("focusout", function () {
            if ($(this).val().length === 0) {
                $(this).parent('.form-group').removeClass('form-group-focus');
            }
        });

        $('body').append('<div id="page-ajax-loaded" class="page-portfolio-loaded animated fadeInLeft" style="display: none"><div class="preloader-portfolio"><div class="preloader-animation"><div class="preloader-spinner"></div></div></div></div>');

        ajaxLoader();

        // Sidebar toggle
        $('.sidebar-toggle').on("click", function () {
            $('#blog-sidebar').toggleClass('open');
            $(this).toggleClass('open');
        });

        $('.lmpixels-scroll-to-top').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 400);
            return false;
        });

        scrollTop();
    });

})(jQuery);

// Adutos
const adultToggle = document.querySelector('#adult-toggle');
// Obtener el valor guardado en localstorage
const adultValue = localStorage.getItem('adult');
// Actualizar el valor seleccionado en el toggle
if (adultValue === 'true') {
    adultToggle.checked = true;
}
// FunciÃ³n para ocultar o mostrar los canales para adultos
function toggleAdultChannels() {
    const channels = document.querySelectorAll('.adulto');
    channels.forEach(channel => {
        if (adultToggle.checked) {
            channel.style.display = 'block';
        } else {
            channel.style.display = 'none';
        }
    });
    // Guardar el estado del toggle en localstorage
    localStorage.setItem('adult', adultToggle.checked);
}
// Agregar el evento "change" al toggle
adultToggle.addEventListener('change', toggleAdultChannels);
// Ocultar o mostrar los canales para adultos al cargar la pÃ¡gina
toggleAdultChannels();
