function start() {
    "use strict";

    const currentDate = new Date();
    const nextMonth = (currentDate) => currentDate.getMonth() + 1;

    function renderCalendar(eventsObj) {
        $('#calendar').fullCalendar({
            events: eventsObj,
            displayEventEnd: true,
            defaultDate: moment().add(1, "months"),
            eventClick: toggleColor,
            timezone: "local"
        });
    }

    function toggleColor(event, jsEvent, view) {
        if (event.color === "red") {
            event.color = "green";
            event.title = "Available";
        } else if (event.color === "green") {
            event.color = "red";
            event.title = "Unavailable";
        }
        $('#calendar').fullCalendar("rerenderEvents");
    }

    $.getJSON("shift-template.json", renderCalendar);
}

$(document).ready(start);
