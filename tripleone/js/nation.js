(function () {
    var a = document.getElementById('sidebar'),
        b = null,
        P = 20; // если ноль заменить на число, то блок будет прилипать до того, как верхний край окна браузера дойдёт до верхнего края элемента. Может быть отрицательным числом
    window.addEventListener('scroll', Ascroll, false);
    document.body.addEventListener('scroll', Ascroll, false);

    function Ascroll() {
        if (b == null) {
            var Sa = getComputedStyle(a, ''),
                s = '';
            for (var i = 0; i < Sa.length; i++) {
                if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || Sa[i].indexOf('box-shadow') == 0 || Sa[i].indexOf('background') == 0) {
                    s += Sa[i] + ': ' + Sa.getPropertyValue(Sa[i]) + '; ';
                }
            }
            b = document.createElement('div');
            b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
            a.insertBefore(b, a.firstChild);
            var l = a.childNodes.length;
            for (var i = 1; i < l; i++) {
                b.appendChild(a.childNodes[1]);
            }
            a.style.height = b.getBoundingClientRect().height + 'px';
            a.style.padding = '0';
            a.style.border = '0';
        }
        var Ra = a.getBoundingClientRect(),
            R = Math.round(Ra.top + b.getBoundingClientRect().height - document.querySelector('.footer__container').getBoundingClientRect().top + 20); // селектор блока, при достижении верхнего края которого нужно открепить прилипающий элемент;  Math.round() только для IE; если ноль заменить на число, то блок будет прилипать до того, как нижний край элемента дойдёт до футера
        if (Ra.top - P <= 0) {
            if (Ra.top - P <= R) {
                b.className = 'stop';
                b.style.top = -R + 'px';
            } else {
                b.className = 'sticky';
                b.style.top = P + 'px';
            }
        } else {
            b.className = '';
            b.style.top = '';
        }
        window.addEventListener('resize', function () {
            a.children[0].style.width = getComputedStyle(a, '').width;
        }, false);
    }
})();

(function () {

    function currentYPosition() {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;
        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop;
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;
        return 0;
    }

    function elmYPosition(eID) {
        var elm = document.getElementById(eID);
        var y = elm.offsetTop;
        var node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        }
        return y;
    }

    function smoothScroll(eID) {
        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY);
            return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for (var i = startY; i < stopY; i += step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY += step;
                if (leapY > stopY) leapY = stopY;
                timer++;
            }
            return;
        }
        for (var i = startY; i > stopY; i -= step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY -= step;
            if (leapY < stopY) leapY = stopY;
            timer++;
        }
    }

    document.querySelectorAll('.sidebar__list__item').forEach(item => {
        item.addEventListener('click', e => {
            smoothScroll(e.target.dataset.id);
        });
    });
})();

(function () {
    function getCoords(elem) {
        // кроме IE8-
        var box = elem.getBoundingClientRect();

        return {
            top: box.top + window.pageYOffset,
            left: box.left + window.pageXOffset
        };
    }

    function removeActive() {
        document.querySelectorAll('.sidebar__list__item').forEach(a => {
            a.classList.remove('sidebar__list__item_active');
        });
    }

    function onScroll() {
        let scrolled = window.pageYOffset || document.documentElement.scrollTop;

        document.querySelectorAll('.sidebar__list__item').forEach(a => {
            let hash = a.dataset.id;
            let target = document.getElementById(hash);
            let top = getCoords(target).top;
            let height = target.offsetWidth;

            if (top <= scrolled && top + height > scrolled) {
                removeActive();
                a.classList.add('sidebar__list__item_active');
            } else {
                a.classList.remove('sidebar__list__item_active');
            }
        });
    }

    window.addEventListener('scroll', onScroll);
})();