start();
function start () {
  'use strict';

    function doPasswordsMatch(pass1, pass2) {
        const password1 = pass1.trim();
        const password2 = pass2.trim();
        return password1 === password2;
    }

  $(document).ready(() => {
    $('form').submit(event => {
      event.preventDefault();
      const username = $('#username').val();
      const password = $('#password').val();
      const passwordVerify = $('#passwordVerify').val();
        if(!doPasswordsMatch(password, passwordVerify)) {
            $('#passwordVerify').append("<p>Passwords do not match</p>");
        }
      const loginObj = {
        username,
        password
      };
      $.post({
          url: '/login/auth',
        data: JSON.stringify(loginObj),
        dataType: 'JSON',
        contentType: 'application/json; charset=utf-8',
        success: response.process
      });
    });
  });
  const response = {
    process: function (data, status) {
      $('#login').append(`
        <p> Status: ${status} </p>
        <p> Data: ${data} </p>
      `);
    }
  };
}
