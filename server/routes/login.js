start();
function start () {
  'use strict';

  const express = require('express');
  const router = express.Router();

  router.use(function timeLog (req, res, next) {
    console.log(`${Date.now()}: Login Request`);
    next();
  });

  router.get('/', (req, res) => {
    res.sendFile('./public/login.hrml');
  });

  exports = router;
}
