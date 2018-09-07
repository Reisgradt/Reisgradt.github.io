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

function animChildren(cl, chcl, timeDelay, startDelay) {
    os.on('enter', '.' + cl, el => {
        let i = 0;
        Array.from(el.children).forEach(child => {
            if (child.classList.contains(chcl)) {
                addCl(child, chcl, timeDelay * i + startDelay);
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

animChildren('block2__table__content', 'block2__table__row', 200);

//anim('block3__title', 100);
animChildren('block3__middle__offers', 'block3__work-with-item', 140);

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
    setInterval(nextSlide2, 6000);
}

osSlider2.on('enter', '.block6__slider', el => slider2Activate.bind(null, osSlider2)());

animChildren('block6__meet-us', 'block6__meet-us__item', 500);

/* Попарно */
os.on('enter', '.block6__meet-us', el => {
    let itemArr = Array.from(el.children);

    for (let i = 0; i < itemArr.length - 1; i += 2) {
        addCl(itemArr[i], 'block6__meet-us__item', 200 * i);
        addCl(itemArr[i + 1], 'block6__meet-us__item', 200 * i);
    }
});

os.on('enter', '.block7__follow-us__row', el => {
    let itemArr = Array.from(el.children);

    itemArr.forEach((item, i) => {
        if (item.children.length === 1) addCl(item, 'block7__follow-us__cell', 210 * i);
    });
});

animChildren('l-img__container', 'l-img__icon', 300, 1500);

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

/* Parallax */
let coefParallax = .1,
    offsetValue = 100;

let parallaxText = document.querySelector('.block5__bg-text');
parallaxText.style.transform = 'translateX(' + offsetValue + 'px)';

let textToTop = parallaxText.getBoundingClientRect().top + window.pageYOffset;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    scrollTop += document.body.clientHeight;

    if (scrollTop > textToTop) {
        let currentScroll = scrollTop - textToTop,
            currentOffset = currentScroll * coefParallax;

        if (currentOffset > offsetValue) currentOffset = offsetValue;

        parallaxText.style.transform = 'translateX(' + (offsetValue - currentOffset) + 'px)';
    }
});

/* slider 1 */

const transTime = 1;

/* Все вставленные элементы */
let sliderItems = document.querySelectorAll('.slider__slide__item');

function slideWhile(e) {
    if (!e.target.classList.contains('slider__slide__item_active3')) return false;

    if (num == currentIndex) {
        goAhead = false;
        sliderItems.forEach(item => {
            item.style.transition = transTime + 's';
        });
    }

    if (goAhead) {
        if (getDirection() == 1) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

sliderItems.forEach(item => {
    item.addEventListener('transitionend', slideWhile);
});

/* Контейнер под кнопки */
let radio = document.querySelector('.slider__radio');

/* Контейнер под элементы */
let sliderContainer = document.querySelector('.slider__container');

/* Индекс элемента слева */
let currentIndex = sliderItems.length;

let goAhead = false,
    num = currentIndex;

/* Создание кнопок под каждый элемент */
Array.from(sliderItems).forEach((item, i) => {
    let radioItem = document.createElement('div');
    radioItem.classList.add('slider__radio__item');
    radioItem.dataset.num = i;

    radio.appendChild(radioItem);
});

/* Сохранение всех кнопок */
let sliderRadio = document.querySelectorAll('.slider__radio__item');

sliderRadio.forEach(radio => {
    radio.addEventListener('click', choseRadioBtn);
});

function getDirection() {
    let direction;

    if (num > currentIndex) {
        direction = 1;
    } else {
        direction = -1;
    }

    if (Math.abs(num - currentIndex) > sliderItems.length / 2) direction *= -1;

    return direction;
}

function activateByIndex(index) {
    sliderItems.forEach(item => item.className = 'slider__slide__item');

    for (let i = 0; i < 3; ++i) {
        sliderItems[(index + i) % sliderItems.length].classList.add('slider__slide__item_active' + (i + 1));
    }

    sliderItems[(index - 1 < 0 ? sliderItems.length - 1 : index - 1) % sliderItems.length].classList.add('slider__slide__item_prepare-l');
    sliderItems[(index + 3) % sliderItems.length].classList.add('slider__slide__item_prepare-r');
}

function chooseRadioByIndex(index) {
    sliderRadio.forEach(radio => radio.classList.remove('slider__radio__item_active'));

    for (let i = 0; i < sliderRadio.length; ++i) {
        if (sliderRadio[i].dataset.num == currentIndex) {
            sliderRadio[i].classList.add('slider__radio__item_active');
        }
    }
}

function nextSlide() {
    if (currentIndex + 1 >= sliderItems.length) currentIndex = 0;else currentIndex++;

    activateByIndex(currentIndex);
    chooseRadioByIndex(currentIndex);
}

function prevSlide() {
    if (currentIndex - 1 < 0) currentIndex = sliderItems.length - 1;else currentIndex--;

    activateByIndex(currentIndex);
    chooseRadioByIndex(currentIndex);
}

nextSlide();
let slideIntId = setInterval(nextSlide, 5500);

function choseRadioBtn(e) {
    num = +e.target.dataset.num;
    goAhead = true;

    clearInterval(slideIntId);
    slideIntId = setInterval(nextSlide, 5500);

    sliderItems.forEach(item => {
        item.style.transition = 2 * transTime / sliderItems.length + 's';
    });

    if (getDirection() == 1) {
        nextSlide();
    } else {
        prevSlide();
    }
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