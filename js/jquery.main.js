$(function(){

    if ($('.strategy').length) {

        $(window).on({
            'load':function(){
                if($(window).width() > 640) {
                    $.getScript(location.href + 'js/runtime.js', function(){});
                    $.getScript(location.href + 'js/pic-script.js', function(){
                        var stage = new swiffy.Stage(document.getElementById('swiffycontainer'),
                            swiffyobject, {  });

                        stage.start();

                    });
                    var stage = new swiffy.Stage(document.getElementById('swiffycontainer'),
                        swiffyobject, {  });

                    stage.start();
                }
            }
        });

    }

    $('.menu__btn').on({
        'click':function(){
            var curElem = $(this).parent();

            if (curElem.hasClass('active')) {
                curElem.removeClass('active');
            } else {
                curElem.addClass('active');
            }

        }
    });

    $('.reviews').each(function () {
        Slider($(this).find('.swiper-container'));
    });

} );


var Slider = function (obj) {

    //private properties
    var _self = this,
        _obj = obj,
        _prev = obj.find($('.swiper-button-prev')),
        _next = obj.find($('.swiper-button-next'));

    //private methods
    var _init = function () {
        var swiper = new Swiper(_obj, {
            autoplay: 7000,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            loop: true,
            loopedSlides: 3,
            slidesPerView: 'auto',
            centeredSlides: true
        });
    };

    _init();


    var myMap;

    function init () {
        myMap = new ymaps.Map('map', {
            center: $('.map__item').eq(0).attr('data-coord').split(', '),
            zoom: 12
        });

        $.each($('.map__item'), function(i){
            var curElem = $(this);

            if (curElem.attr('data-coord')) {
                var coord = curElem.attr('data-coord').split(', ');

                myMap.geoObjects.add(new ymaps.Placemark(
                    [coord[0], coord[1]],
                    {   hintContent: "Описание",
                        balloonContentBody: curElem.find('a').text() }, {
                        iconLayout: 'default#image',
                        iconImageHref: 'img/map_icon.png',
                        iconImageSize: [30, 30],
                        iconImageOffset: [-15, -25]
                    }
                ));
            }
        });
    }

    ymaps.ready(init);

    $('.map__item span').on({
        'click':function(){
            var coord = $(this).parent().attr('data-coord').split(', ');

            myMap.setCenter(coord);

            return false;
        }
    });


};

