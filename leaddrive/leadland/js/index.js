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