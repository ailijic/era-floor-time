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

    $("#login").submit((event) => {
        const username = $("#username").val();
        const password = $("#password").val();
        const loginObj = {
            username,
            password
        };

        event.preventDefault();
        redirectPost("/api/user/login", loginObj);
        function redirectPost(url, data) {
            var form = document.createElement('form');
            form.method = 'post';
            form.action = url;
            for (var name in data) {
                var input = document.createElement('input');
                input.type = 'hidden';
                input.name = name;
                input.value = data[name];
                form.appendChild(input);
            }
            form.submit();
        }

        /*
         * $.post({
         *     url: '/api/user/login',
         *     data: JSON.stringify(loginObj),
         *     dataType: 'JSON',
         *     contentType: 'application/json; charset=utf-8',
         *         success: response.process
         * });
         */
    });
}

$(document).ready(start);
