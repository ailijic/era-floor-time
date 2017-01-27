function start() {
    "use strict";

    const currentDate = new Date();
    const nextMonth = (currentDate) => currentDate.getMonth() + 1;

    function genSubmitButton() {
        $("#submit")
            .append(`<button type = "button"> Submit Floor Time </button>`);
        $("#submit").css("text-align", "center");
        // TODO: Add event click handler
    }

    function renderCalendar(eventsObj) {
        $('#calendar').fullCalendar({
            events: eventsObj,
            displayEventEnd: true,
            defaultDate: moment().add(1, "months"),
            eventClick: toggleColor,
            timezone: "local"
        });
        reRender();
    }

    function reRender() {
        $("#calendar").fullCalendar("rerenderEvents");
        $(".fc-event").css("height", "3em");
        $(".fc-day-grid-event").css("white-space", "normal");
        $(".fc-content").css("white-space", "normal");
        $("#calendar").css("margin", "0 auto")
        $("#calendar").css("max-width", "650px")
    }

    function toggleColor(event, jsEvent, view) {
        if (event.color === "red") {
            event.color = "green";
            event.title = "Available";
        } else if (event.color === "green") {
            event.color = "red";
            event.title = "Unavailable";
        }
        reRender();
    }

    $.getJSON("shift-template.json", renderCalendar);
    genSubmitButton();
}

$(document).ready(start);
