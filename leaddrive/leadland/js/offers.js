/* Дано */

let arrowCountryUp = document.querySelectorAll('.block2__countries-arrow_up'),
    arrowCountryDown = document.querySelectorAll('.block2__countries-arrow_down');

/* Высота одного флага */
const heightCountryEl = 29 + 26;
/* Смещение стартовое из-за стилей */
let currentCountryOffset = 6;

//let maxCountryOffset = countrySlider.clientHeight - countrySliderContainer.clientHeight;

/* Навесить события, установить стартовые состояния */
arrowCountryUp.forEach(item => {
    item.classList.add('block2__countries-arrow_disable');
    getChild(getNeighbor(item, 'block2__countries-container'), 'block2__country-slider').style.top = currentCountryOffset + 'px';

    item.addEventListener('click', moveCountryDown);
});
arrowCountryDown.forEach(item => {
    item.addEventListener('click', moveCountryUp);

    /* Неподвижный контейнер */
    let container = getNeighbor(item, 'block2__countries-container');

    /* То, что надо двигать */
    let slider = getChild(container, 'block2__country-slider');

    if (container.clientHeight > slider.clientHeight) {
        item.classList.add('block2__countries-arrow_disable');
    }
});

function moveCountryUp(e) {
    /* Неподвижный контейнер */
    let container = getNeighbor(e.target, 'block2__countries-container');

    /* То, что надо двигать */
    let slider = getChild(container, 'block2__country-slider');

    /* 
        Если контейнер меньше высоты блока, то ничего 
        перематывать и не нужно
    */
    if (container.clientHeight > slider.clientHeight) {
        return;
    }

    /*  Поиск другой кнопки в этом блоке */
    let anotherBtn = getNeighbor(e.target, 'block2__countries-arrow_up');

    /* Узнаём смещение */
    let currentCountryOffset = +slider.style.top.slice(0, slider.style.top.length - 2) - heightCountryEl;

    /* Чистим предварительно состояния на кнопках */
    anotherBtn.classList.remove('block2__countries-arrow_disable');
    e.target.classList.remove('block2__countries-arrow_disable');

    let maxCountryOffset = container.clientHeight - slider.clientHeight;

    if (currentCountryOffset <= maxCountryOffset) {
        currentCountryOffset = maxCountryOffset;
        e.target.classList.add('block2__countries-arrow_disable');
    }

    slider.style.top = currentCountryOffset + 'px';
}

function moveCountryDown(e) {
    /* Неподвижный контейнер */
    let container = getNeighbor(e.target, 'block2__countries-container');

    /* То, что надо двигать */
    let slider = getChild(container, 'block2__country-slider');

    /* 
        Если контейнер меньше высоты блока, то ничего 
        перематывать и не нужно
    */
    if (container.clientHeight > slider.clientHeight) {
        return;
    }

    /*  Поиск другой кнопки в этом блоке */
    let anotherBtn = getNeighbor(e.target, 'block2__countries-arrow_down');

    /* Узнаём смещение */
    let currentCountryOffset = +slider.style.top.slice(0, slider.style.top.length - 2) + heightCountryEl;

    /* Чистим предварительно состояния на кнопках */
    anotherBtn.classList.remove('block2__countries-arrow_disable');
    e.target.classList.remove('block2__countries-arrow_disable');

    if (currentCountryOffset >= 6) {
        currentCountryOffset = 6;
        e.target.classList.add('block2__countries-arrow_disable');
    }

    slider.style.top = currentCountryOffset + 'px';
}

function getChild(el, childClass) {
    for (let i = 0; i < el.children.length; ++i) {
        if (el.children[i].classList.contains(childClass)) return el.children[i];
    }
}

function getNeighbor(el, neighborClass) {
    let parent = el.parentElement;
    return getChild(el.parentElement, neighborClass);
}
/* Дано */

/* Все элементы для раскрытия */
let titles = document.querySelectorAll('.block2__navigation__title');

/* Все подэлменты */
let navItems = document.querySelectorAll('.block2__navigation__list__item');

/* Все сольные элементы */
let soloNavItems = document.querySelectorAll('.block2__navigation__item_solo');

/* Событие на заголовки */
titles.forEach(item => {
    item.addEventListener('click', e => e.target.classList.toggle('block2__navigation__title_active'));
});

function disableAll() {
    navItems.forEach(item => {
        item.classList.remove('block2__navigation__list__item_active');
    });
    soloNavItems.forEach(item => {
        item.classList.remove('block2__navigation__list__item_active');
    });
}

navItems.forEach(item => {
    item.addEventListener('click', chooseNavItem);
});
soloNavItems.forEach(item => {
    item.addEventListener('click', chooseNavItem);
});

function chooseNavItem(e) {
    disableAll();
    e.target.classList.add('block2__navigation__list__item_active');
}
let form = document.querySelector('.block2__first-line');

function doSelect(selectEl, containerCl, choosenCl) {
    /* Сам селект */
    let select = getChild(selectEl, 'search-line__select__input');
    /* Контейнер для заполнения */
    let optionContainer = getChild(selectEl, containerCl);
    /* Текущий элемент выбора */
    let choosenEl = getChild(selectEl, choosenCl);

    /* Создать на каждый option pseudoOption */
    Array.from(select.children).forEach(item => {
        if (item.disabled) return;

        let pseudoOption = document.createElement('div');
        pseudoOption.classList.add('search-line__select__item');
        pseudoOption.innerHTML = item.innerHTML;
        pseudoOption.dataset.value = item.value;

        optionContainer.appendChild(pseudoOption);
    });

    /* Записать choosen элемент */
    choosenEl.innerHTML = select.options[select.selectedIndex].innerHTML;

    /* Открытие и закрытие контейнера выпадающего списка */
    selectEl.addEventListener('click', e => {
        optionContainer.classList.toggle(containerCl + '_active');
    });

    /* Сворачивание контейнера при нажатии вне его границ */
    document.body.addEventListener('click', e => {
        if (e.target === selectEl || e.target === optionContainer || e.target === choosenEl) return;
        optionContainer.classList.remove(containerCl + '_active');
    });

    /* При нажатии на элемент, выбрать его */
    Array.from(optionContainer.children).forEach(item => {
        item.addEventListener('click', selectItem);
    });

    function selectItem(e) {
        choosenEl.innerHTML = select.options[select.selectedIndex].innerHTML;

        Array.from(select.options).forEach(option => {
            if (option.value == e.target.dataset.value) {
                option.selected = true;
            }
        });

        form.submit();
    }
}

doSelect(document.querySelector('.search-line__traffic-type'), 'search-line__select__container', 'search-line__select__choosen');

doSelect(document.querySelector('.search-line__geo'), 'search-line__select__container', 'search-line__select__choosen');