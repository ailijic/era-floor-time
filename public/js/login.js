/* eslint-env jquery */

start();
function start () {
  'use strict';

  $(document).ready(() => {
    $('form').submit(event => {
      event.preventDefault();
      const username = $('#username').val();
      const password = $('#password').val();
      const loginObj = {
        username,
        password
      };
      console.log(loginObj);
      $.post({
        url: '/login',
        data: JSON.stringify(loginObj),
        dataType: 'JSON',
        contentType: "application/json; charset=utf-8",
        sucess: (result) => console.log(result)
      });
    });
  });
}
