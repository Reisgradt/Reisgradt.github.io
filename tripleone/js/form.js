(function () {
    /* Flags */
    $("#phone").intlTelInput({
        allowDropdown: false
    });

    /* Mask */
    $("#phone").mask("+9      999 999 99 99");

    /* Timer */
    let timers = document.querySelectorAll('.form-remaining__timer');

    function changeTimerValue(currentValue) {
        currentValue.timer.innerHTML = '0:' + (currentValue.sec > 10 ? currentValue.sec : '0' + currentValue.sec);
        currentValue.sec--;

        if (currentValue.sec < 0) {
            clearInterval(currentValue.intervalId);
        }
    }

    function timer(item) {
        let currentValue = {
            sec: 59,
            timer: item
        };

        currentValue.intervalId = setInterval(changeTimerValue, 1000, currentValue);
    }

    timers.forEach(item => timer(item));

    /* Custom Select */

    function getChild(el, childClass) {
        for (let i = 0; i < el.children.length; ++i) {
            if (el.children[i].classList.contains(childClass)) return el.children[i];
        }
    }

    function getNeighbor(el, neighborClass) {
        let parent = el.parentElement;
        return getChild(el.parentElement, neighborClass);
    }

    function doSelect(selectEl, containerCl, choosenCl) {
        /* Сам селект */
        let select = getChild(selectEl, 'custom-select__select');

        /* Контейнер для заполнения */
        let optionContainer = getChild(selectEl, containerCl);
        /* Текущий элемент выбора */
        let choosenEl = getChild(selectEl, choosenCl);

        /* Создать на каждый option pseudoOption */
        Array.from(select.children).forEach(item => {
            if (item.disabled) return;

            let pseudoOption = document.createElement('div');
            pseudoOption.classList.add('custom-select__item');
            pseudoOption.innerHTML = item.innerHTML;
            pseudoOption.dataset.value = item.value;

            optionContainer.appendChild(pseudoOption);
        });

        /* Записать choosen элемент */
        choosenEl.innerHTML = select.options[select.selectedIndex].innerHTML;

        /* Открытие и закрытие контейнера выпадающего списка */
        selectEl.addEventListener('click', e => {
            optionContainer.classList.toggle(containerCl + '_active');
            selectEl.classList.toggle('custom-select_active');
        });

        /* Сворачивание контейнера при нажатии вне его границ */
        document.body.addEventListener('click', e => {
            if (e.target === selectEl || e.target === optionContainer || e.target === choosenEl) return;
            optionContainer.classList.remove(containerCl + '_active');
            selectEl.classList.remove('custom-select_active');
        });

        /* При нажатии на элемент, выбрать его */
        Array.from(optionContainer.children).forEach(item => {
            item.addEventListener('click', selectItem);
        });

        function selectItem(e) {
            Array.from(select.options).forEach(option => {
                if (option.value == e.target.dataset.value) {
                    option.selected = true;
                }
            });

            choosenEl.innerHTML = select.options[select.selectedIndex].innerHTML;
        }
    }
    /*
    doSelect(
        document.querySelector('.custom-select'),
        'custom-select__container',
        'custom-select__choosen'
    );
    */

    /* for country select */

    function changeWidth() {
        $(".country-list").css('width', $(".country-select").width() + 'px');

        /* additional functional */
        $('.arrow').css('right', -($("#country").width() - 20) + 'px ');
    }

    $(window).on('load', () => $("#country").countrySelect());

    $(window).on('resize', changeWidth);
    $(window).on('load', changeWidth);
})();