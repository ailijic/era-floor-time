/* Required */
const aRoot = process.cwd();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require(`${aRoot}/database/database`);
const express = require("express");
const Token = require(`${aRoot}/modules/token`);

/* Constants */
const api = new express.Router();
const login = {
    fail: {
        message : "Authentication Failed",
        success : false
    },
    success: {
        message : "Login Granted",
        success : true,
        token   : ""  // Create token
    }
};
const http = {
    "accepted" : 202,
    "created"  : 201,
    "default"  : 200,     // 200: OK
};

/* Main */
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));

api.post("/create-account", (req, res) => {
    console.log("Received create/update account request for: ",
        `${req.body.username}`);
    db.user.add(req.body)
        .then((obj) => {
            obj.password = "********";
            console.log(`DB-COMMIT: ${obj}`);
            res
                .status(http.created)
                .json({
                    accountCreated : true,
                    message        : "Account Created"
                });
        })
        .catch((obj) => {
            console.log(`ERR: ${obj}`);
            res
                .status(http.default)
                .json({
                    accountCreated : false,
                    message        : "Server Unable to Create Account"
                });
        });
});

api.post("/user/login", function (req, res) {
    function makeToken() {
        const token = new Token(req.app.get("secretKey"));
        return Promise.resolve(token);
    }
    db.user.verify(req.body)
        .then(makeToken)
        .then((token) => token.gen(req.body.username))
        .then((tokenString) => {
            // console.log(`Sending token: ${tokenString}`);
            // console.log(`for user: ${req.body.username}`);
            login.success.token = tokenString;
            res
                .status(http.accepted)
                .cookie("token", tokenString)
                .json(login.success);
        })
        .catch(() => res.status(http.default).json(login.fail));
});

api.post("/user/set-availability", (req, res) => {
    db.user.setAvailability("ailijic", req.body.availability)
        .then(() => {
            res
                .status(http.created)
                .json({
                    message : "saved availability",
                    success : true
                });
            console.log("Availability saved to DB");
        })
        .catch(console.log);
});

module.exports = api;
