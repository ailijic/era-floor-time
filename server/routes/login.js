(function start() {
    "use strict";

    const root = Object.freeze({root: process.cwd()});
    const express = require("express");
    const router = new express.Router();
    const bodyParser = require("body-parser");

    router.use(bodyParser.json());
    router.use(function timeLog(req, res, next) {
        console.log(`${Date.now()}: Login Request`);
        next();
    });

    router.get("/", function (req, res) {
        res.sendFile("/public/login.html", root);
    });

    router.post("/", function (req) {
        console.log(req.body);
    });

    module.exports = router;
}());
