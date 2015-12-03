onload = function() {
    var dragObjects = document.getElementById('dragObjects').getElementsByTagName('label')
    for(var i=0; i<dragObjects.length; i++) {
        new DragObject(dragObjects[i])
    }
    new DropTarget(document.getElementById('basket__purchases'))
}

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

    $( ".callback__currency" ).buttonset();

    $( ".basket dd" ).buttonset();

    $( "#slider-range" ).each(function(){
        $( "#slider-range" ).slider({
            min: 0,
            max: 2000000,
            value: 100000,
            range: "min",
            slide: function( event, ui ) {
                $( "#callback__budget" ).val( ui.value );
            }
        })
        $( "#callback__budget" ).val($("#slider-range").slider("value"));
    })

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
    if (_obj.hasClass('reviews__slider')){
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
    if (_obj.hasClass('experience__slider')){
        var __swiperSlider = new Swiper(_obj, {
            scrollbar: '.swiper-scrollbar',
            direction: 'horizontal',
            slidesPerView: 'auto',
            mousewheelControl: true
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

};

