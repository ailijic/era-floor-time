"use strict";

const root = process.cwd();
const express = require("express");
const api = express.Router();
const db = require(`${root}/database/database`);
const bodyParser = require("body-parser");
const login = {
    fail: {
        success: false,
        message: "Authentication Failed"
    },
    success: {
        success: true,
        message: "Login Granted",
        // TODO: Add token gen
        token: "FEDCBA9876543210"   // token.gen() // Create token
    },
    status: {
        fail: 200,      // 200: OK
        success: 202    // 202: Accepted
    }
};


api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

api.post("/create-account", (req, res) => {
    console.log(`Received create/update account request for: `,
    `${req.body.username}`);
    db.user.add(req.body)
        .then((obj) => {
            obj.password = "********";
            console.log(`DB-COMMIT: ${obj}`);
            res
                .status(201)
                .json({
                    accountCreated: true,
                    message: "Account Created"
                });
        })
        .catch((obj) => {
            console.log(`ERR: ${obj}`);
            res
                .status(200)
                .json({
                    accountCreated: false,
                    message: "Server Unable to Create Account"
                });
        });
});

api.post("/user/login", (req, res) => {
    db.user.verify(req.body)
        .then((isValidUser) => {
            if (isValidUser === true) {
                res
                    .status(login.status.success)
                    .json(login.success);
            } else {
                res
                    .status(login.status.fail)
                    .json(login.fail);
            }
        })
        .catch(console.log);    
});

api.post("/user/set-availability", (req, res) => {
    console.log(req.body);
    res.status(200).json({ success: true, message: "saved availability" });
});

module.exports = api;
