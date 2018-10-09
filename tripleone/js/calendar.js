(function () {
    let element = document.getElementById('calendar');

    /* https://gramthanos.github.io/jsCalendar/docs.htm */
    let calendar = jsCalendar.new({
        target: element,
        monthFormat: 'MMM YYYY'
    });

    calendar.onDateClick(function (event, date) {
        if (event.target.classList.contains('jsCalendar-previous') || event.target.classList.contains('jsCalendar-next')) {
            return;
        }

        document.querySelectorAll('.jsCalendar td').forEach(item => {
            item.classList.remove('jsCalendar-current');
        });

        event.target.classList.add('jsCalendar-current');
    });

    document.querySelector('.last-month').addEventListener('click', () => {
        calendar.previous();
    });

    document.querySelector('.next-month').addEventListener('click', () => {
        calendar.next();
    });
})();