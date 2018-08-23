$(function(){
  //2. Получить элемент, к которому необходимо добавить маску
  $("#phone").mask("8(999) 999-9999");
  $("#signUpBannerFormPhone").mask("8(999) 999-9999");
});


        $("#formx").submit(function(e) { //устанавливаем событие отправки для формы с id=form
            e.preventDefault();
            var form_data = $(this).serialize(); //собераем все данные из формы
            $.ajax({
                type: "POST", //Метод отправки
                url: "res.php", //путь до php фаила отправителя
                data: form_data,
                success: function(data) {
                    var json = JSON.parse(data);
                    $("#results").text(json.error.msg);
                }
          });
        });

$('.bigSlider').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 1,
    prevArrow: '<div class="bigSlider__arrowContainer"><img class="bigSlider__arrowLeft" src="../img/slider_prevArrow.svg" alt="prev"></div>',
    nextArrow: '<div class="bigSlider__arrowContainer"><img class="bigSlider__arrowRight" src="../img/slider_nextArrow.svg" alt="next"></div>',
    variableWidth: true,
    focusOnSelect:true
    });


$('[data-fancybox="images"]').fancybox({

});

var Morphing = function( $btn ) {
    this._init( $btn );
};

Morphing.prototype._init = function( $btn ) {
    var that = this;

    that.$btn = $btn.width( $btn.width() ).addClass('morphing-btn');

    // Add wrapping element and set initial width used for positioning
    $btn.wrap(function() {
        var $wrap = $('<div class="morphing-btn-wrap"></div>');

        $wrap.width( $(this).outerWidth( true ) );

        return $wrap;
    });

    that.$clone = $('<div />')
        .hide()
        .addClass('morphing-btn-clone')
        .insertAfter( $btn );

    $btn.on('click', function(e) {
        e.preventDefault();

        that.open();
    });
};

Morphing.prototype.open = function() {
    var that = this;

    if ( that.$btn.hasClass('morphing-btn_circle') ) {
        return;
    }

    // First, animate button to the circle
    that.$btn.one("transitionend.fm webkitTransitionEnd.fm oTransitionEnd.fm MSTransitionEnd.fm", function(e) {
        if ( e.originalEvent.propertyName !== 'width' ) {
            return;
        }

        $(this).off(".fm");

        that._animate();
    });

    that.$btn.width( that.$btn.width() ).addClass('morphing-btn_circle');

};

Morphing.prototype._animate = function() {
    var that   = this;
    var $btn   = that.$btn;
    var $clone = that.$clone;
    var scale  = this._retrieveScale( $btn );
    var pos    = $btn[0].getBoundingClientRect();

    $clone.css({
        top       : pos.top  + $btn.outerHeight() * 0.5 - ( $btn.outerHeight() * scale * 0.5 ),
        left      : pos.left + $btn.outerWidth()  * 0.5 - ( $btn.outerWidth()  * scale * 0.5 ),
        width     : $btn.outerWidth()  * scale,
        height    : $btn.outerHeight() * scale,
        transform : 'scale(' + 1 / scale + ')'
    });

    $clone.one("transitionend.fm webkitTransitionEnd.fm oTransitionEnd.fm MSTransitionEnd.fm", function(e) {
        $(this).off(".fm");

        // Open fancyBox
        $.fancybox.open({ src : $btn.data('src') || $btn.attr('href') }, {
            infobar  : false,
            buttons  : false,
            smallBtn : false,
            touch    : false,
            margin   : 0,
            onInit : function( instance ) {
                instance.$refs.slider_wrap.append('<button class="morphing-close" data-fancybox-close>X</button>');
                instance.$refs.bg.remove();
            },
            afterClose : function() {
                that.close();
            }
        });

    });

    // Trigger expanding of the cloned element
    $clone.show().addClass('morphing-btn-clone_visible');

};

Morphing.prototype.close = function() {
    var that   = this;
    var $btn   = that.$btn;
    var $clone = that.$clone;
    var scale  = that._retrieveScale( $btn );
    var pos    = $btn[0].getBoundingClientRect();

    $clone.css({
        top       : pos.top  + $btn.outerHeight() * 0.5 -  ( $btn.outerHeight() * scale * 0.5 ),
        left      : pos.left + $btn.outerWidth()  * 0.5  - ( $btn.outerWidth()  * scale * 0.5 ),
        width     : $btn.outerWidth()  * scale,
        height    : $btn.outerHeight() * scale,
        transform : 'scale(' + ( 1 / scale ) + ')'
    });

    $clone.one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {
        $clone.hide();

        $btn.removeClass('morphing-btn_circle');
    });

    $clone.removeClass('morphing-btn-clone_visible');
};

Morphing.prototype._retrieveScale = function( $btn ) {
    var rez = Math.max( $(window).height() * 3 / $btn.height() , $(window).width() * 3 / $btn.width() );

    return rez;
};

$.fn.fancyMorph = function( duration ) {
    this.each(function() {
        var $this = $(this);

        if ( !$this.data('morphing') ) {
            $this.data('morphing', new Morphing( $this ));
        }

    });

    return this;
};

$("[data-morphing]").fancyMorph();


  function main() {

    $('.header__menuTrigger').click(function() { 
 
        $('.header__menu__list').animate({ //выбираем класс menu и метод animate
 
            top: '0' /* теперь при клике по иконке, меню, скрытое за
               левой границей на 285px, изменит свое положение на 0px и станет видимым */
 
        }, 200); //скорость движения меню в мс
    });
 
 
/* Закрытие меню */
 
    $('.header__menuClose').click(function() { 
 
        $('.header__menu__list').animate({ 
            top: '-100%' 
        }, 200); 
});

};
 
$(document).ready(main()); /* как только страница полностью загрузится, будет
               вызвана функция main, отвечающая за работу меню */