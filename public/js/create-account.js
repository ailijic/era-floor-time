$(document).ready(start);
function start() {
    "use strict";

    $("form").submit((event) => {
        const accountObj = {
            firstName:          ($("#firstName").val()).trim(),
            lastName:           ($("#lastName").val()).trim(),
            email:              ($("#email").val()).trim(),
            username:           ($("#username").val()).trim(),
            password:           ($("#password").val()).trim(),
            passwordVerify:     ($("#passwordVerify").val()).trim()
        };

        event.preventDefault();

        if (! isValidPassword(accountObj.password)) {
            // console.log("invalid password");
            // $("#passwordVerify").append("<p> Password Invalid </p>");
            errorMsg("Invalid Password");
        } else if (! doPasswordsMatch(accountObj.password,
                accountObj.passwordVerify)) {
            // console.log("passwords do not Match");
            errorMsg("Passwords do not match");
        } else {
            delete accountObj.passwordVerify,

            $.post(
                "/api/create-account",
                accountObj,
                processResponse,
                "json"
            );
        }
    });

    function  isValidPassword(password) {
        return (
            password !== null
            && password !== undefined
            && password !== ""
        );
    }

    function doPasswordsMatch(pass1, pass2) {
        return pass1 === pass2;
    }

    function errorMsg(msg) {
        removeMessages();
        addMessage(msg);
    }

    function removeMessages() {
        $(".msg").children().remove();
    }

    function addMessage(msg) {
        $(".msg").append(
            $("<p></p>").text(msg)
        )
    }

    /**
     *  Handel the response from the server
     *  @arg data
     *  @arg status
     *  @arg jqXHR
     */
    function processResponse(data, status, jqXHR) {
        // TODO: Delete console.log later
        // console.log(status);
        // console.log(data);
        // console.log(jqXHR);

        removeMessages();
        addMessage(data.message);
    }
}
