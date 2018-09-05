(function () {
    let showIt = document.querySelectorAll('.b7__item');

    showIt.forEach(item => item.addEventListener('click', e => {
        if (e.target.classList.contains('b7__item')) {
            e.target.classList.toggle('b7__item_active');
        } else if (e.target.parentElement.classList.contains('b7__item')) {
            e.target.parentElement.classList.toggle('b7__item_active');
        }
    }));

    /* slider */
    let tick = 335 + 40;

    /* Все вставленные элементы */
    let sliderItems = document.querySelectorAll('.b8__slide');

    /* Контейнер под кнопки */
    let radio = document.querySelector('.b8__slider__radio');

    /* Создание кнопок под каждый элемент */
    Array.from(sliderItems).forEach((item, i) => {
        let radioItem = document.createElement('div');
        radioItem.classList.add('b8__radio__item');
        radioItem.dataset.num = i;

        radio.appendChild(radioItem);
    });

    let radioBtn = document.querySelectorAll('.b8__radio__item');

    radioBtn.forEach(item => {
        item.addEventListener('click', chooseSlide);
    });

    let container = document.querySelector('.b8__slider__container');

    function chooseSlide(e) {
        radioBtn.forEach(radio => radio.classList.remove('b8__radio__item_active'));

        e.target.classList.add('b8__radio__item_active');

        container.style.marginLeft = -(tick * e.target.dataset.num) + 'px';
    }

    chooseSlide({
        target: radioBtn[0]
    });

    /* counter */
    let h = 10,
        m = 47,
        s = 23;

    let hEl = document.querySelector('.b10__counter__hours');

    let mEl = document.querySelector('.b10__counter__min');

    let sEl = document.querySelector('.b10__counter__sec');

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