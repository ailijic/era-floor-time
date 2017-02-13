"use strict";

const submitBtn = new Button("#submitButton");

function Button(elementString) {
    this.jQuery = $(elementString);
    return this;
}
Button.prototype.property = "disabled";
Button.prototype.setPropTo = function setPropTo(bool) {
    this.jQuery.prop(this.property, bool);
    return this;
};    
Button.prototype.enable = function enable() {
    this.setPropTo(false);
    return this;
}
Button.prototype.disable = function disable() {
    this.setPropTo(true);
    return this;
}

function renderCalendar(eventsObj) {
    const nextMonth = moment().add(1, "months");
    $('#calendar').fullCalendar({
        height: "parent",
        events: eventsObj,
        displayEventEnd: true,
        defaultDate: nextMonth,
        eventClick: toggleColor,
        timezone: "local",
    });
}

function reRender() {
    $("#calendar").fullCalendar("rerenderEvents");
}

function colorToBool(obj) {
    return obj.color === "green";
}

function sendAvailability(event) {
    const availabilityObj = $("#calendar")
        .fullCalendar("clientEvents")
        .map(colorToBool);

    submitBtn.disable();
    $("#sending").show();
    // TODO: send token as HTTP cookie
    $.post(
        "/api/user/set-availability",
        { availability: availabilityObj },
        responseHandler,
        "json"
    );
}

function start() {
    $.getJSON("shift-template.json", renderCalendar);
    $("#submitButton").click(sendAvailability);
    submitBtn.enable();
}

function responseHandler(data, status, jqXHR) {
    console.log(data);
    $("#sending").hide();
    submitBtn.enable();
}

function toggleColor(event, jsEvent, view) {
    if (event.color === "red") {
        event.color = "green";
        event.title = "Available";
    } else if (event.color === "green") {
        event.color = "red";
        event.title = "Unavailable";
    } else {
        throw new Error("Got an unhandeled color");
    }
    reRender();
}

$(document).ready(start);
