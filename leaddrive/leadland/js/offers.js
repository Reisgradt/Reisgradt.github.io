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
});

function moveCountryUp(e) {
    /*  Поиск другой кнопки в этом блоке */
    let anotherBtn = getNeighbor(e.target, 'block2__countries-arrow_up');

    /* Неподвижный контейнер */
    let container = getNeighbor(e.target, 'block2__countries-container');

    /* То, что надо двигать */
    let slider = getChild(container, 'block2__country-slider');

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
    /*  Поиск другой кнопки в этом блоке */
    let anotherBtn = getNeighbor(e.target, 'block2__countries-arrow_down');

    /* Неподвижный контейнер */
    let container = getNeighbor(e.target, 'block2__countries-container');

    /* То, что надо двигать */
    let slider = getChild(container, 'block2__country-slider');

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

function doSelect(selectEl, containerCl, choosenCl) {
    let optionContainer = getChild(selectEl, containerCl);
    let choosenEl = getChild(selectEl, choosenCl);

    selectEl.addEventListener('click', e => {
        optionContainer.classList.toggle(containerCl + '_active');
    });

    document.body.addEventListener('click', e => {
        if (e.target === selectEl || e.target === optionContainer || e.target === choosenEl) return;
        optionContainer.classList.remove(containerCl + '_active');
    });

    Array.from(optionContainer.children).forEach(item => {
        item.addEventListener('click', selectItem);
    });

    function selectItem(e) {
        choosenEl.innerHTML = e.target.innerHTML;
    }
}

doSelect(document.querySelector('.search-line__traffic-type'), 'search-line__select__container', 'search-line__select__choosen');

doSelect(document.querySelector('.search-line__geo'), 'search-line__select__container', 'search-line__select__choosen');