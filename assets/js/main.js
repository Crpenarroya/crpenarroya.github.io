/* ---------------------------------- */
/*
 * Jeronimo Lopez
 * http://jerolopez.tk
 * 
 * Autor: Jeronimo Lopez
 * 
 *
 */
/* ---------------------------------- */

function scrollApp() {

    var scrollTimeOut = true,
    lastYPos = 0,
    yPos = 0,
    yPosDelta = 5,
    nav = $('header'),
    navHeight = nav.outerHeight(), //- $(window).height() 

    setNavClass = function() {
        scrollTimeOut = false;
        yPos = $(window).scrollTop();

        if(Math.abs(lastYPos - yPos) >= yPosDelta) {
            if (yPos > lastYPos && yPos > navHeight ){
                nav.addClass('hide-nav');

            } else {
                nav.removeClass('hide-nav');
            }
            lastYPos = yPos;
        }
    };

    $(window).scroll(function(e){
        scrollTimeOut = true;
    });



    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();

        if (scroll >= 100) {
            $("#main").addClass("reverse");
        } else {
            $("#main").removeClass("reverse");
        }
    });


    setInterval(function() {
        if (scrollTimeOut) {
            setNavClass();
        }
        if($(window).scrollTop() + $(window).height() > $(document).height() - 50) {
          nav.removeClass('hide-nav');
        }

    }, 250);


    $(window).scroll(function() { 
        var scroll     = $(window).scrollTop(),
            element = $('.block-titulo'),
            elementOffset = $('.block-titulo').outerHeight(),
            elementOffset2 = elementOffset / 2,
            distance      = (elementOffset - scroll),
            h = $(window).height(),
            b =  (h / 2) ;      

        if (scroll >= b) {
            element.addClass("is-static");
            element.css('top', b + 'px');
        } else {
            element.removeClass("is-static");
            element.css('top', '');
        }
    }); 

}


function galleta() {
    // check cookie
    var visited = Cookies.set("visited")

    if (visited == null) {
        $('.container-informacion').addClass("primera-visita open");
        // $('.container-informacion').addClass("open");
        // setTimeout(function(){
        //     $('.container-informacion').removeClass("primera-visita");
        //     alert("null");     
        // }, 4000);           
    }


    // set cookie
    Cookies.set('visited', 'yes', { expires: 1, path: '/' });

} 

function inicioApp() {

    if ($(".container-informacion").hasClass("open")) {
        $('.menu, .menu-overlay').addClass("open");
        $('.typewrite').typewrite({
            'callback': function(){
                setTimeout(function(){
                    $('.container-informacion').removeClass("primera-visita");
                    $('.container-informacion, .menu, .menu-overlay').removeClass("open");    
                }, 1000);    
            },
            'delay': 100

        });
    }
}


function type() {
    $(".menu-link").click(function(e) {
    e.preventDefault();
    $(".menu-overlay").toggleClass("open");
    $(".menu").toggleClass("open");


    $.getScript('/assets/js/jquery.typewriter.js', function() {
        var timeout = setTimeout(function() {
            console.log('llega');
            if ($(".menu-overlay").hasClass("open")) {
                $('.typewrite1').typewrite({
                    'callback': function(){
                      
                    },
                    'delay': 100

                });
            }
        }, 000)
    });

    });
}


function InitJQueryApp() {

    $("[data-class]").click(function(e) {
            e.preventDefault();
            var y = e.pageY;
            var color = $(this).attr('data-color');
            $('.box').append('<div class="box__bg" style="top:' + y + 'px; left:' + e.pageX + 'px; background-color: ' + color + '"></div>');
    });



    $("[data-class]").click(function(e) {
        e.preventDefault();
        var myEm = $(this).attr('data-class');
        var timeout = setTimeout(function() {
            $( "body" ).removeClass().addClass( myEm );
        }, 400)
    });

}


( function($) {
    galleta(); 
    inicioApp(); 
    type();         
    InitJQueryApp();
    scrollApp();
} )(jQuery);



(function ($) {
    
    'use strict';

    $(document).ready(function () {
        // Init here.
        var $body = $('body'),
            $main = $('#main'),
            $site = $('html, body'),
            $html = $('html'),
            transition = 'fade',
            smoothState;
             

        smoothState = $main.smoothState({
            blacklist: ".no-smoothstate, .post-edit-link,  a[href*='.jpg'], a[href*='.png'], a[href*='.jpeg'], a[href*='.pdf']",
            debug: true,
            prefetch: true,
            cacheLength: 2,
            onBefore: function($anchor, $container) {
                var current = $('[data-viewport]').first().data('viewport'),
                    target = $anchor.data('target');
                current = current ? current : 0;
                target = target ? target : 0;
                if (current === target) {
                    transition = 'fadew';
                } else if (current < target) {
                    transition = 'fadew'; //moveright
                } else {
                    transition = 'fadew'; //moveleft
                }
            },
            onStart: {
                duration: 600, //400
                render: function (url, $container) {
                    $main.attr('data-transition', transition);
                    setTimeout(function(){
                        $html.addClass('is-ok'); 
                    }, 10);                                        
                    $main.addClass('is-exiting');
                    // $site.animate({scrollTop: 0});
                    smoothState.restartCSSAnimations();
                }
            },
            onReady: {
                duration: 0,
                render: function ($container, $newContent) {
                    // setTimeout(function(){    
                    // }, 1000);
                



                    $container.html($newContent);
                    $html.removeClass('is-ok');
                    $container.removeClass('is-exiting'); 
                    $('.box__bg').remove();  
                }
            },

            onAfter: function($container, $newContent) {
                console.log('After');
                type();               
            }

        }).data('smoothState');

    });

}(jQuery));








