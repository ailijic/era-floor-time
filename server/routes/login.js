start();
function start () {
  'use strict';

  const root = Object.freeze({ root: process.cwd() });
  const express = require('express');
  const router = express.Router();

  router.use(function timeLog (req, res, next) {
    console.log(`${Date.now()}: Login Request`);
    next();
  });

  router.get('/', (req, res) => {
    res.sendFile('/public/login.html', root);
  });

  module.exports = router;
}
