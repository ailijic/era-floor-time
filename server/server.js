"use strict";

const   root        = process.cwd(),
        authFilter  = require(`${root}/modules/auth-filter`),
        login       = require(`${__dirname}/routes/login`),
        api         = require(`${__dirname}/routes/api`),
        morgan      = require("morgan"),
        express     = require("express"),
        app         = express();

/**
 * Use Morgan to log requests
 */
app.use(morgan("dev"));

/**
 * Add static sites
 */
app.use(express.static("public"));

app.use("/login", login);

app.use("/api", api);

app.use(authFilter);

app.get("/secure", function (req, res) {
    res.send(`Hello from the secure route!`);
});

app.listen(process.env.PORT || 8080);
