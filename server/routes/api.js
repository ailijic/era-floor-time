"use strict";

const root = process.cwd();
const express = require("express");
const api = express.Router();
const db = require(`${root}/database/database`);
const bodyParser = require("body-parser");
const morgan = require("morgan");

api.use(morgan("dev"));
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

api.post("/create-account", (req, res) => {
    console.log(req.body);
    // db.user.add()
    res
        .json({ accountCreated: true })
        .sendStatus(202);
});

module.exports = api;
