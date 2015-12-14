$(function(){

    $(function() {
        $('.basket').each(function () {
            game = new Choiser($(this));
        });
    })

    if ($('.strategy').length) {

        if($(this).width() > 640) {

            //$.getScript(location.href + 'js/runtime.js', function(){});
            //
            //$.getScript( location.href + 'js/pic-script.js', function( data, textStatus, jqxhr ) {
            //    console.log(jqxhr.status);
            //    var stage = new swiffy.Stage(document.getElementById('swiffycontainer'),
            //        swiffyobject, {  });
            //
            //    stage.start();
            //});
            var stage = new swiffy.Stage(document.getElementById('swiffycontainer'),
                swiffyobject, {  });

            stage.start();
        }
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

    $.each( $('.experience__slider'), function(){
        new Review ( $(this) );
    } );

    $('.callback__currency').each(function () {
        $( this ).buttonset();
    });

    $('.basket dd').each(function () {
        $( this ).buttonset();
    });

    $.each($('.tabs'), function () {
        new Tabs( $( this ) );
    });

    $( "#slider-range" ).each(function(){
        $( "#slider-range" ).slider({
            min: $(this).data("min"),
            max: $(this).data("max"),
            value: $(this).data("value"),
            range: "min",
            slide: function( event, ui ) {
                $( "#callback__budget" ).val( ui.value );
            }
        })
        $( "#callback__budget" ).val($("#slider-range").slider("value"));
        $('#callback__budget').on( 'input', function() {
            $("#slider-range").slider( "value", $('#callback__budget').val() );
        });
    })

} );


var Slider = function (obj) {

    //private properties
    var _self = this,
        _window = $(window),
        _windowWidth = $(window).width(),
        _mainSlider = null,
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
    if (_obj.hasClass('list-works__slider')){
        var __swiper = new Swiper(_obj, {
            autoplay: 7000,
            pagination: '.list-works__points',
            paginationClickable: true,
            loop: false,
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
    if (_obj.hasClass('main-slider')){
        _window.on({
            load: function () {
                if (_windowWidth >= 1006) {
                    var _mainSlider = new Swiper(_obj, {
                        pagination: '.main-slider__points',
                        paginationClickable: true,
                        slidesPerView: 1,
                        loop: true
                    });
                }
            },
            resize: function () {
                _windowWidth = $(window).width();
                if (_windowWidth >= 1006) {
                    if(_mainSlider===null) {
                        _mainSlider = new Swiper(_obj, {
                            pagination: '.main-slider__points',
                            paginationClickable: true,
                            slidesPerView: 1,
                            loop: true
                        });
                    }
                } else {
                    if(_mainSlider!==null){
                        _mainSlider.destroy(false,true);
                        _mainSlider = null;
                    }
                }
            }

        })

    }

_init();

};

var Tabs = function (obj) {

    var _obj = obj,
        _window = $(window),
        _body = $("body"),
        _tabBtn = _obj.find('.tabs__controls-wrap > div'),
        _tabBtnInner = _tabBtn.find('> span'),
        _tabContent = _obj.find('.tabs__wrapper'),
        _controls = _obj.find('.tabs__controls-wrap'),
        _tabContentItem = _tabContent.find('> div');

    var _addEvents = function () {

            _window.on({
                'load': function(){
                    _showContentWhenLoading();
                }
            });

            _tabBtnInner.on({
                mousedown: function(){
                    _tabContent.css({
                        'height': _tabContent.innerHeight()
                    }, 300);
                },
                mouseup: function(){
                    var curItem = $(this),
                        parent = curItem.parent(),
                        index = parent.index();
                    var activeContent = _tabContentItem.eq(index),
                        activeContentHeight = activeContent.innerHeight();
                    _tabContent.animate({
                        'height': activeContentHeight
                    }, 300);
                    setTimeout(function(){
                        _tabContent.css({
                            "height": ""
                        });
                    },400)
                },
                click: function(){
                    var curItem = $(this),
                        parent = curItem.parent(),
                        index = parent.index();
                    _tabBtn.removeClass("active");
                    _tabBtn.eq(index).addClass("active");
                    _showContent(index);
                    _controls.removeClass("active");
                }
            });

            _body.on({
                click: function(){
                    _controls.removeClass("active");
                }
            });

        },
        _showContentWhenLoading = function(){
            var index = _tabBtn.filter('.active').index();
            if ( index == "-1" ){
                index = 0;
                _tabBtn.eq(index).addClass("active");
            }
            _showContent(index);
        },
        _showContent = function(i){
            var activeContent = _tabContentItem.eq(i);
            _tabContentItem.css({
                "display": "none"
            });
            activeContent.css({
                "display": "block"
            });
        },
        _init = function () {
            _addEvents();
        };

    _init();
};

var Review = function (obj) {

    var _obj = obj,
        _scroll = null,
        _window = $(window);

    var _addEvents = function () {

            _window.on({
                'resize': function(){
                    _scroll.resize();

                },
                'load': function(){
                    _addScroll();

                }
            });

        },
        _addScroll = function(){
            _scroll = _obj.niceScroll({
                cursorcolor:"#fff",
                cursoropacitymin: "0",
                cursorborderradius: "50%",
                cursorborder: false,
                cursorwidth: 15,
                cursorminheight: 15,
                autohidemode: false,
                touchbehavior: false,
                background: "#fff",
                railpadding: {top:0,right:200,left:200,bottom:0}
            });
        },
        _init = function () {
            _addEvents();
        };

    _init();
};

var Choiser = function (obj) {
    //private properties
    var _self = this,
        _label = obj.find($('label')),
        _clicking = false,
        _moving = false,
        _site = $('site'),
        _obj = obj;

    //private methods
    var _addEvents = function () {
            _label.on({
                mouseup: function(e) {
                    // Проверка отклика
                    $('#clone').remove();
                    _clicking = false;
                    if(_moving == false) return;
                    console.log('click');
                },
                mousedown: function() {
                    // Проверка отклика
                    _clicking = true;
                    _moving = true;
                    console.log('down');
                    $(this).clone().attr('id','clone').appendTo(this).parent('dd');
                },
                mousemove: function(e) {
                    // Проверка отклика
                    _moving = false;
                    if(_clicking == false) return;

                    var pos = $(this).offset(),
                        _elem_left = pos.left,
                        _elem_top = pos.top,
                        _Xinner = e.pageX - _elem_left,
                        _Yinner = e.pageY - _elem_top;

                    $('#clone').css({
                        top : _Yinner,
                        left : _Xinner
                    })

                    console.log("X: " + _Xinner + " Y: " + _Yinner);
                    console.log('mousedown');
                }
            });
            _site.on({

            });
        },
        _init = function () {
            _addEvents();
        };
    //public properties

    //public methods

    _init();
};
