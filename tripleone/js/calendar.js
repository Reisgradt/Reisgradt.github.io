(function () {
    let element = document.getElementById('calendar');

    /* https://gramthanos.github.io/jsCalendar/docs.htm */
    let calendar = jsCalendar.new({
        target: element,
        monthFormat: 'MMM YYYY'
    });

    /* Select day */
    calendar.onDateClick(function (event, date) {
        if (event.target.classList.contains('jsCalendar-previous') || event.target.classList.contains('jsCalendar-next')) {
            return;
        }

        document.querySelectorAll('.jsCalendar td').forEach(item => {
            item.classList.remove('jsCalendar-current');
        });

        event.target.classList.add('jsCalendar-current');
    });

    /* change month */
    calendar.onMonthChange(changeDate);

    let calendarTitle = document.querySelector('.jsCalendar-title-name');

    let contentTitle = document.querySelector('.current-month');
    let prevArr = document.querySelector('.last-month');
    let nextArr = document.querySelector('.next-month');

    function changeDate() {
        contentTitle.innerHTML = calendarTitle.innerHTML;

        calendar.previous();
        prevArr.innerHTML = calendarTitle.innerHTML;
        calendar.next();

        calendar.next();
        nextArr.innerHTML = calendarTitle.innerHTML;
        calendar.previous();
    }

    prevArr.addEventListener('click', () => {
        calendar.previous();
        changeDate();
    });

    nextArr.addEventListener('click', () => {
        calendar.next();
        changeDate();
    });

    changeDate();
})();