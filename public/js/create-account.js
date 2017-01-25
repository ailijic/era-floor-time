$(document).ready(start);
function start() {
    "use strict";

    $("form").submit((event) => {
        event.preventDefault();
        const username = $("#username").val().trim;
        const password = $("#password").val().trim;
        const passwordVerify = $("#passwordVerify").val();
        if (! isValidPassword(password)) {
            $("#passwordVerify").append("<p> Password Invalid </p>");
            return;
        } else if (! doPasswordsMatch(password, passwordVerify)) {
            $("#passwordVerify").append("<p> Passwords do not match </p>");
            return;
        } else {
            $.post(
                "/api/create-account", 
                { username, password },
                processResponse,
                "json"
            );
            return;
        }
        // $.post({
            // url: "/login/auth",
            // data: JSON.stringify(loginObj),
            // dataType: "JSON",
            // contentType: "application/json; charset=utf-8",
            // success: response.process
        // });
    });

    function  isValidPassword(password) {
        return password !== null && password !== undefined;
    }

    function doPasswordsMatch(pass1, pass2) {
        return pass1 === pass2;
    }

    function processResponse(data, status) {
        console.log(status);
        console.log(data);
        // $("#login").append(`
            // <p> Status: ${status} </p>
            // <p> Data: ${data} </p>
        // `);
    }
}
