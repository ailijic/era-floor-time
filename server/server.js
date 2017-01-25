(function start() {
    "use strict";

    const morgan = require("morgan");
    const express = require("express");
    const login = require(`${__dirname}/routes/login`);
    const jwt = require("jsonwebtoken");
    const app = express();

    /** Use Morgan to log requests */
    app.use(morgan("dev"));

    /** Add static sites */
    app.use(express.static("public"));

    app.get("/dashboard", function (req, res) {
        res.send("hello");
    });

    /** Add login Route */
    app.use("/login", login);

    app.use(authFilter);
    
    app.get("/secure", function (req, res) {
        res.send(`Hello from the secure route!`);
    });
    app.listen(process.env.PORT || 8080);
}());
