var flag = 0;
var flag1 = 0;
var flag2 = 0;
var flag3 = 0;

function num_animate(){
    if($(window).scrollTop() > 2500 && flag === 0){

        $('#num1').animateNumber({ number: 700 }, 1800);
        $('#num2').animateNumber({ number: 400 }, 1800);
        $('#num3').animateNumber({ number: 343 }, 1800);
        $('#num4').animateNumber({ number: 17}, 1800);
        $('#num5').animateNumber({ number: 7 }, 1800);
        $('#num6').animateNumber({ number: 201}, 1800);
        $('#num7').animateNumber({ number: 24}, 1800);
        $('#num8').animateNumber({ number: 7}, 1800);
        $('#num9').animateNumber({ number: 365}, 1800);
        flag = 1;
    }
}
function doSetTimeout(i) {
    setTimeout(function() { $('.our_services .item_' + i).addClass('active'); }, i * 500);
}
function doSetTimeout1(i) {
    setTimeout(function() { $('.stages_our_work .item_' + i).addClass('active'); }, i * 500);
}
function stages_animate(){
    if($(window).scrollTop() > 6000 && flag1 === 0){
        for (var i = 1; i <= 10; ++i){
            doSetTimeout1(i);
        }
        flag1 = 1;
    }
}
function service_animate(){
    if($(window).scrollTop() > 4300 && flag2 === 0){

        for (var i = 1; i <= 10; ++i){
            doSetTimeout(i);

        }
        flag2 = 1;
    }
}

function position_animate(){
    if($(window).scrollTop() > 700 && flag3 === 0){
        $('.positions').addClass('active');
        flag3 = 1;
    }
}
$(document).ready(function(){
    $('.fancybox').fancybox();
    $(".fancybox_iframe").fancybox({
        maxWidth	: 800,
        maxHeight	: 180,
        fitToView	: false,
        width		: '70%',
        height		: '70%',
        autoSize	: false,
        closeClick	: false,
        openEffect	: 'none',
        closeEffect	: 'none'
    });

    $("input[name=phone]").mask("+9 (999) 999-9999");
    $('.bxslider').bxSlider({
        pager:false,
        minSlides: 3,
        slideMargin: 30,
        slideWidth: 300,
        maxSlides: 3,
        moveSlides: 1
    });
    $(window).scroll(function(){
        num_animate();
        stages_animate();
        service_animate();
        position_animate();
    });
    $('body, html').on('click', '.ankor_nav a, .ankor_link', function () {
        offtop = $($(this).attr('href')).offset();
        $('html, body').animate({scrollTop: offtop.top}, '500');
        return false;
    });

    ymaps.ready(function () {
        var myMap = new ymaps.Map('map', {
                center: [55.617312, 37.220176],
                zoom: 15
            }, {
                searchControlProvider: 'yandex#search'
            }),
            myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                //hintContent: 'Собственный значок метки',
                //balloonContent: '<div class=\"balloon1\"> <div class=\"title\"> Hypersales </div> <p>Москва , ул. Дружбы д 2.</p> <p><strong>8-800-123-45-67</strong></p> <p><a href=\"mailto:hypersales@gmail.com\">hypersales@gmail.com</a></p></div>'
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: 'img/myIcon.png',
                // Размеры метки.
                iconImageSize: [30, 42],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-3, -42]
            });

        myMap.geoObjects.add(myPlacemark);
    });


    $('body').on('submit', 'form', function () {
        var flag = true;
        var name = $(this).find('[name="name"]');
        var phone = $(this).find('[name="phone"]');
        var country = $(this).find('[name="country"]');

        if (name.val() === '') {
            name.addClass('input_error');
            flag = false;
        } else {
            name.removeClass('input_error');
        }
        if (phone.val() === '') {
            phone.addClass('input_error');
            flag = false;
        } else {
            phone.removeClass('input_error');
        }
        if (phone.val() === '') {
            country.addClass('input_error');
            flag = false;
        } else {
            country.removeClass('input_error');
        }

        if (flag) {
            $.ajax({
                type: 'POST',
                url: $(this).attr('action'),
                data: $(this).serialize(),
                dataType: 'text',
                success: function (r) {
                    name.val('');
                    phone.val('');
                    country.val('');
                    $.fancybox('<h2 class="text-success no-margin">Ваш заказ<br>успешно отправлен!</h2>');
                    setTimeout(function () {
                        $.fancybox.close(true);
                    }, 5000);
                }
            });
        }
        return false;
    });

});