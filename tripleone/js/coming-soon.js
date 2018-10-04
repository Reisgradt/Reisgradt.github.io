(function () {
    let btn = document.querySelector('.btn');

    btn.addEventListener('click', nextContent);

    function nextContent() {
        let hide = function () {
            document.querySelector('.content__img').style.opacity = 0;
            document.querySelector('.content__form').style.opacity = 0;
            document.querySelector('.content').classList.add('content_hide-line');
        };

        let remove = function () {
            document.querySelector('.content__img').style.transform = 'scale(0)';
            document.querySelector('.content__form').style.transform = 'scale(0)';
        };

        let show = function () {
            document.querySelector('.content__img').style.display = 'none';
            document.querySelector('.content__form').style.display = 'none';

            document.querySelector('.soon-2').classList.add('soon-2_active');
        };

        // 1s
        hide();

        let content = document.querySelector('.content');
        let h = content.offsetHeight,
            w = content.offsetWidth;

        content.style.height = h + 'px';
        content.style.width = w + 'px';

        console.log(w, h);

        let newSizes = () => {
            content.style = {};

            content.style.height = 257 + 'px';
            content.style.width = 357 + 'px';

            document.querySelector('.soon-2').style.display = 'block';
        };

        setTimeout(remove, 1000);
        setTimeout(newSizes, 1500);
        setTimeout(show, 2500);
    }
})();