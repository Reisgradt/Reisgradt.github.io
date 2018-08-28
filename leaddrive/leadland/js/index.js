(function () {

    /* slider 1 */
    let slides = document.querySelectorAll('.slider__slide'),
        sliderRadio = document.querySelectorAll('.slider__radio__item');

    sliderRadio.forEach((radio, i) => {
        radio.addEventListener('click', choseRadioBtn);
        radio.dataset.number = i;
    });

    function choseRadioBtn(e) {

        sliderRadio.forEach(radio => radio.classList.remove('slider__radio__item_active'));

        e.target.classList.add('slider__radio__item_active');

        slides.forEach(slide => slide.classList.remove('slider__slide_active'));

        slides[e.target.dataset.number].classList.add('slider__slide_active');
    }

    /* slider 2 */
    let leftBtn = document.querySelector('.block6__btn_left'),
        rightBtn = document.querySelector('.block6__btn_right'),
        numSlider2 = document.querySelector('.block6__slider__number');

    let slides2 = document.querySelectorAll('.block6__slider__slide');

    let currentNum = 1;

    function changeSlide2(index) {
        slides2.forEach(slide => {
            slide.classList.remove('block6__slider__slide_active');
        });
        slides2[index].classList.add('block6__slider__slide_active');
    }

    function changeNumSlide2(num) {
        let strNum = num.toString();
        if (strNum.length === 1) strNum = '0' + strNum;
        numSlider2.innerHTML = strNum;
    }

    function nextSlide2() {
        if (currentNum + 1 > slides2.length) currentNum = 1;else currentNum++;
        changeSlide2(currentNum - 1);
        changeNumSlide2(currentNum);
    }

    function prevSlide2() {
        if (currentNum - 1 < 1) currentNum = slides2.length;else currentNum--;
        changeSlide2(currentNum - 1);
        changeNumSlide2(currentNum);
    }

    leftBtn.addEventListener('click', prevSlide2);
    rightBtn.addEventListener('click', nextSlide2);

    /* login */
    let loginBtn = document.querySelector('.menu__item_login'),
        isShown = false;

    let darkerBg = document.querySelector('.darker-bg'),
        login = document.querySelector('.login'),
        close = document.querySelector('.login__close'),
        nameField = document.querySelector('.login__name');

    loginBtn.addEventListener('click', toggleLogin);
    darkerBg.addEventListener('click', toggleLogin);
    close.addEventListener('click', toggleLogin);

    function toggleLogin() {
        darkerBg.classList.toggle('darker-bg_active');
        login.classList.toggle('login_active');
        nameField.focus();
    }

    /* Анимации */
    let os = new OnScreen({
        tolerance: 0,
        debounce: 0
    });

    function addCl(el, cl, time) {
        setTimeout(() => el.classList.add(cl + '_anim'), time);
    }

    function anim(cl, time) {
        os.on('enter', '.' + cl, el => addCl(el, cl, time));
    }

    function animChildren(cl, chcl, timeDelay) {
        os.on('enter', '.' + cl, el => {
            let i = 0;
            Array.from(el.children).forEach(child => {
                if (child.classList.contains(chcl)) {
                    addCl(child, chcl, timeDelay * i);
                    i++;
                }
            });
        });
    }

    /* b1 title1 */
    anim('block1__first__item', 100);

    /* b1 slogan2 */
    anim('block1__slogan2', 1000);

    /* b1 btn */
    anim('block1__btn', 1500);

    animChildren('block2__table__content', 'block2__table__row', 140);

    //anim('block3__title', 100);
    animChildren('block3__middle', 'block3__work-with-item', 140);

    animChildren('block3__work-with-systems', 'block3__work-with-systems__item', 200);

    animChildren('block4__right-side', 'block4__item', 500);

    anim('block4__icon', 100);
    anim('block4__title', 100);
    anim('block4__earning', 100);

    animChildren('block5__img', 'block5__item', 500);

    function toTopScreenOS(osMoney, el) {
        osMoney.destroy();

        let items = Array.from($('.block5__table__earnings'));

        var i = items.length;

        function toTopSpin(index) {
            if (i < 0) {
                return;
            }

            $(items[index]).spincrement({
                thousandSeparator: ' ',
                duration: 500,
                fade: false,
                complete: toTopSpin.bind(null, index - 1)
            });
        }
        toTopSpin(i - 1);
        $('.block5__table__earnings').css('opacity', .7);
    }

    let osMoney = new OnScreen({
        tolerance: 0,
        debounce: 0
    });

    osMoney.on('enter', '.block5__table__row:nth-child(7)', toTopScreenOS.bind(null, osMoney));

    let osSlider2 = new OnScreen();

    function slider2Activate(_osSlider2) {
        _osSlider2.destroy();
        console.log(1);
        setInterval(nextSlide2, 6000);
    }

    osSlider2.on('enter', '.block6__slider', el => slider2Activate.bind(null, osSlider2));
})();