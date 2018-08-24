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