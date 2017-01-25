$(document).ready(start);
function start() {
    "use strict";

    $.getJSON("cal-data.json", renderCalendar);

    function renderCalendar(eventsObj) {
        $('#calendar').fullCalendar({
            events: eventsObj,
            color: "yellow",
            textColor: "black",
            displayEventEnd: true,
            timezone: "local"
        });
    }
    // $('#calendar').fullCalendar({
        // // put your options and callbacks here
        // // events: data.events,
        // events: [
            // { title: 'Event1', start: '2017-01-04' },
            // { title: 'Event2', start: '2017-01-05' }
        // ],
        // color: 'yellow',   // an option!
        // textColor: 'black' // an option!
    // });
}
