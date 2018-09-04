(function () {
    /* slider */
    let lArrow = document.querySelector('.b7__slider__left'),
        rArrow = document.querySelector('.b7__slider__right'),
        container = document.querySelector('.b7__slide__container'),
        slider = document.querySelector('.b7__slide__container');

    let slideCount = Array.from(slider.children).reduce((acc, item) => {
        if (item.classList.contains('b7__slide')) return ++acc;
        return acc;
    }, 0);

    lArrow.addEventListener('click', prevSlide);
    rArrow.addEventListener('click', nextSlide);

    let tick = 400;
    let currSlide = 0;

    function prevSlide() {
        currSlide--;
        if (currSlide < 0) currSlide = slideCount - 1;

        container.style.marginLeft = -(tick * currSlide) + 'px';
    }

    function nextSlide() {
        currSlide++;
        if (currSlide >= slideCount) currSlide = 0;

        container.style.marginLeft = -(tick * currSlide) + 'px';
    }

    /* counter */
    let h = 10,
        m = 47,
        s = 23;

    let hEl = document.querySelector('.b9__timer__hours > .b9__timer__item');

    let mEl = document.querySelector('.b9__timer__min > .b9__timer__item');

    let sEl = document.querySelector('.b9__timer__sec > .b9__timer__item');

    function nextTick() {
        s--;

        if (s < 0) {
            s = 59;
            m--;

            if (m < 0) {
                m = 59;
                h--;
            }
        }

        hEl.innerHTML = h < 10 ? '0' + h : h;
        mEl.innerHTML = m < 10 ? '0' + m : m;
        sEl.innerHTML = s < 10 ? '0' + s : s;
    }

    setInterval(nextTick, 1000);
})();