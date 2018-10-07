(function () {
    $("#phone").intlTelInput({
        allowDropdown: false
    });

    $("#phone").mask("+9      999 999 99 99");

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
})();