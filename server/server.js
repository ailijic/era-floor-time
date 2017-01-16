(function start() {
    "use strict";

    const morgan = require("morgan");
    const express = require("express");
    const login = require(`${__dirname}/routes/login`);
    const app = express();

    /** Use Morgan to log requests */
    app.use(morgan("dev"));

    /** Add static sites */
    app.use(express.static("public"));

    /** Add login Route */
    app.use("/login", login);

    app.listen(process.env.PORT || 8080);
}());
