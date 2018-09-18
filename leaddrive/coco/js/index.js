(function () {

    /* counter */
    let h = 10,
        m = 47,
        s = 23;

    let hEl = document.querySelectorAll('.b5__timer__hours > .b5__timer__item');

    let mEl = document.querySelectorAll('.b5__timer__min > .b5__timer__item');

    let sEl = document.querySelectorAll('.b5__timer__sec > .b5__timer__item');

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

        hEl.forEach(item => item.innerHTML = h < 10 ? '0' + h : h);
        mEl.forEach(item => item.innerHTML = m < 10 ? '0' + m : m);
        sEl.forEach(item => item.innerHTML = s < 10 ? '0' + s : s);
    }

    setInterval(nextTick, 1000);
})();