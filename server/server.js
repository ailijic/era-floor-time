(function start() {
    "use strict";

    const express = require("express");
    const app = express();

    // app.use(bodyParser.json());
    app.use(express.static("public"));

    const login = require(`${__dirname}/routes/login`);
    app.use("/login", login);

    app.listen(process.env.PORT || 8080);
}());
