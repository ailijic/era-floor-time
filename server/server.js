(function start() {
    "use strict";

    const express = require("express");
    const login = require(`${__dirname}/routes/login`);
    const app = express();

    app.use(express.static("public"));
    app.use("/login", login);

    app.listen(process.env.PORT || 8080);
}());
