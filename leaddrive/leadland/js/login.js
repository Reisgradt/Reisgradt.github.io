let titleWrapperMedium = document.querySelector('.block1-medium__wrapper');

let titleWrapperSmall = document.querySelector('.block1-small__wrapper');

setInterval(addHiddenClass, 700);

function addHiddenClass() {
    if (titleWrapperMedium) titleWrapperMedium.classList.add('block1-medium__wrapper_hide');

    if (titleWrapperSmall) titleWrapperSmall.classList.add('block1-small__wrapper_hide');
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
window.addEventListener('keydown', closeLogin);

function toggleLogin() {
    darkerBg.classList.toggle('darker-bg_active');
    login.classList.toggle('login_active');
    nameField.focus();
}

function closeLogin(e) {
    if (e.keyCode == 27) {
        darkerBg.classList.remove('darker-bg_active');
        login.classList.remove('login_active');
    }
}