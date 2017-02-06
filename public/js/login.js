/* eslint-env jquery */

function start() {
    "use strict";

    const response = {
        process: function (data, status) {
            console.log(data);
            $(".msg").children().remove();
            $(".msg").append(
                $("<p></p>").text(data.message)
            );
            if (data.success) {
                console.log(document.cookie);
                // window.location = "/dashboard.html";
            }
        }
    };

    $("form").submit((event) => {
        const username = $("#username").val();
        const password = $("#password").val();
        const loginObj = {
            username,
            password
        };

        event.preventDefault();

        $.post({
            url: '/api/user/login',
            data: JSON.stringify(loginObj),
            dataType: 'JSON',
            contentType: 'application/json; charset=utf-8',
                success: response.process
        });
    });
}

$(document).ready(start);
