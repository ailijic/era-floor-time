// Require
require("rootpath")();
const api = require("server/routes/api");
const authFilter = require("modules/auth-filter");
const bodyParser = require("body-parser");
const config = require("config");
const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const login = require("server/routes/login");
const Secret = require("modules/secret");

// Constants
const app = express();
const options = { extensions: ["html", "htm"] };

// Main
if (config.util.getEnv("NODE_ENV") !== "test") {
    app.use(morgan("dev"));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser("secret"));
app.set("views", "public");
app.set("view engine", "ejs");
app.set("secretKey", new Secret().key());

app.use("/", express.static("public", options));

app.get("/", (req, res) => {
    res.redirect("/dashboard");
})

app.get("/login", (req, res) =>  {
    // const msg = "Invalid Username or Password";
    const msg = "";
    res.render("login"
        , { msg }
    );
});

app.use("/api", api);

// app.use(authFilter);

app.use("/", express.static("private", options));

app.get("/secure", 
    (req, res) => {
        res.send("Hello from the secure route!");
    }
);

app.listen(config.web.port);
console.log(`Listening on port: ${config.web.port}`);

module.exports = app;
