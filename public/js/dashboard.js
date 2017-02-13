$(document).ready(start);
function start() {
    "use strict";

    $.getJSON("cal-data.json", renderCalendar);

    function renderCalendar(eventsObj) {
        $('#calendar').fullCalendar({
            height: "parent",
            events: eventsObj,
            color: "yellow",
            textColor: "black",
            displayEventEnd: true,
            timezone: "local",
        });
    }
}
