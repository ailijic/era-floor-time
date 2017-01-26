"use strict";

const root = process.cwd();
const express = require("express");
const api = express.Router();
const db = require(`${root}/database/database`);
const bodyParser = require("body-parser");

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

module.exports = api;
