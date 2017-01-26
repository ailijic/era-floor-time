function start() {
    "use strict";

    const currentDate = new Date();
    const nextMonth = (currentDate) => currentDate.getMonth() + 1;

    function renderCalendar(eventsObj) {
        console.log(eventsObj);
        $('#calendar').fullCalendar({
            events: eventsObj,
            displayEventEnd: true,
            defaultDate: moment().add(1, "months"),
            timezone: "local"
        });
    }

    $.getJSON("shift-template.json", renderCalendar);
}

$(document).ready(start);
