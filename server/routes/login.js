(function start() {
    "use strict";

    const root = process.cwd();
    const express = require("express");
    const app = express();
    const router = new express.Router();
    const bodyParser = require("body-parser");
    const db = require(`${root}/database/database`);

    // const R = require('Ramda');


    function Secret() {
        const that = {};
        const uuidV4 = require("uuid/v4");
        const secretKey = uuidV4();
        that.gen = function () {
            return secretKey;
        };
        return that;
    }
    app.set("secretKey", new Secret().gen());
    // console.log(app.get("secretKey")); // DELETE LATER

    const token = (function () {
        const that = {};
        const jwt = require("jsonwebtoken");
        that.gen = function (userObj, expireString) {
            const user = userObj || {};
            const expiresIn = expireString || "24h";
            return jwt.sign(
                user,
                app.get("secretKey"),
                {expiresIn}
            );
        };
        that.isValid = function (tokenString, callback) {
            // callback(bool, string: decodedToken)
            jwt.verify(
                tokenString,
                app.get("secretKey"),
                function (err, resultToken) {
                    let isAuth = false;
                    let decoded = "";
                    if (err) {
                        console.log(`ERR-isValid: ${err}`);
                    }
                    if (resultToken) {
                        isAuth = true;
                        decoded = resultToken;
                    }
                    callback(isAuth, decoded);
                }
            );
        };
        return that;
    }());

    const auth = {
        fail: {
            success: false,
            message: "Authentication Failed"
        },
        success: {
            success: true,
            message: "Token Granted",
            token: token.gen() // Create token
        }
    };

    const extract = {
        user: function (req) {
            const username = req.body.username || "";
            const password = req.body.password || "";
            return {username, password};
        },
        token: function (req) {
            return req.body.token || req.query.token
                    || req.headers["x-access-token"] || "";
        }
    };

    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({extended: false}));
    // router.use(function (req, res, next) {
    //     next();
    // });

    router.get("/", function (req, res) {
        res.sendFile("/public/login.html", {root});
    });

    router.post("/", function (req) {
        console.log(req.body);
    });

    /** Route to authenticate a user
    *  (POST http://localhost:8080/login/auth) */
    router.post("/auth", function (req, res) {
        db.user.verify(
            extract.user(req)
        ).then(function (isValidUser) {
            if (isValidUser === true) {
                res.json(auth.success);
            } else {
                res.json(auth.fail);
            }
        });
    });

    // Route middleware to verify a token
    router.use(function (req, res, next) {
        token.isValid(extract.token(req), function (isAuth, decoded) {
            if (isAuth === true) {
                req.decoded = decoded; // Save token for later
                next();
            } else {
                // No token or bad token
                return res.status(403).send({
                    success: false,
                    message: "Invalid or missing token"
                });
            }
        });
    });

    // Add route that should be secure
    // router.get("/secure", function (req, res) {
    //     res.send(`Hello from the secure route!`);
    // });
    module.exports = router;
}());
