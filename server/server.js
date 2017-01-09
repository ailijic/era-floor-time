start();
function start () {
  'use strict';

  const express = require('express');
  const app = express();

  // app.use(bodyParser.json());
  app.use(express.static('public'));
  
  app.listen(process.env.PORT || 8080);
}

