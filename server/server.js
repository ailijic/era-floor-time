// Require
const aRoot = process.cwd();
const api = require(`${__dirname}/routes/api`);
const authFilter = require(`${aRoot}/modules/auth-filter`);
const config = require(`${aRoot}/config`);
const express = require("express");
const logger = require("morgan");
const login = require(`${__dirname}/routes/login`);
const Secret = require(`${aRoot}/modules/secret`);

// Constants
const app = express();

// Main
app.use(logger("dev"));

app.use(express.static("public"));

app.set("secretKey", new Secret().key());

app.use("/login", login);

app.use("/api", api);

app.use(authFilter);

app.get("/secure"
    , (req, res) => {
        res.send("Hello from the secure route!");
    }
);

app.listen(config.web.port);
