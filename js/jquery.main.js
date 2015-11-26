$(function(){

    if ($('.strategy').length) {
        var stage = new swiffy.Stage(document.getElementById('swiffycontainer'),
            swiffyobject, {  });

        stage.start();
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
} );
