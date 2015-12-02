$(function(){

    if ($('.strategy').length) {

        $(window).on({
            'load':function(){
                if($(this).width() > 640) {

                    $.getScript(location.href + 'js/runtime.js', function(){});

                    $.getScript(location.href + 'js/pic-script.js', function(){
                        var stage = new swiffy.Stage(document.getElementById('swiffycontainer'),
                            swiffyobject, {  });

                        stage.start();
                    });


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

    $('.swiper-container').each(function () {
        Slider($(this));
    });

    $('.about-me__slider').each(function () {
        Slider($(this));

    } );

} );


var Slider = function (obj) {

    //private properties
    var _self = this,
        _obj = obj;

    //private methods

    var _addEvents = function () {

        },
        _init = function () {
            _addEvents();
        };
    if (_obj.hasClass('swiper-container')){
        var swiper = new Swiper(_obj, {
            autoplay: 7000,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            loop: true,
            loopedSlides: 3,
            slidesPerView: 'auto',
            centeredSlides: true
        });
    }
    if (_obj.hasClass('about-me__slider')){
        var _swiperSlider = new Swiper(_obj, {
            nextButton: '.about-me__next',
            prevButton: '.about-me__prev',
            pagination: '.about-me__points',
            paginationClickable: true,
            slidesPerView: 3,
            autoplay: 10000,
            spaceBetween: 180,
            loop: false,
            breakpoints: {
                1320: {
                    slidesPerView: 1
                }
            }
        });
    }

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

