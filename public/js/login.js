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
      $.post({
        url: '/login',
        data: loginObj,
        dataType: 'JSON',
        sucess: (result) => console.log(result)
      });
    });
  });
}
