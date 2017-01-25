"use strict";

const   morgan  = require("morgan"),
        express = require("express"),
        login   = require(`${__dirname}/routes/login`),
        api     = require(`${__dirname}/routes/api`),
        app     = express();

/** Use Morgan to log requests */
app.use(morgan("dev"));

app.use("/login", login);

app.use("/api", api);

/** Add static sites */
app.use(express.static("public"));

// app.get("/dashboard", function (req, res) {
    // res.send("hello");
// });

// app.use(authFilter);

app.get("/secure", function (req, res) {
    res.send(`Hello from the secure route!`);
});

app.listen(process.env.PORT || 8080);
