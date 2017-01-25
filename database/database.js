"use strict";

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const UserModel = require(`${__dirname}/models/user`);

function add(credentials) {
    const newRecord = new UserModel(credentials);
    return newRecord.save().exec();
}

function isMatch(userInput, dbRecord) {
    let ret = false;
    if (dbRecord === null) {
        console.log("AUTH: Record not found");
    } else if (userInput.username === dbRecord.username &&
            userInput.password === dbRecord.password) {
        ret = true;
    }
    return ret;
}

function verify(credentials) {
    return UserModel.findOne(credentials).exec()
        .then(function (dbRecord) {
            return isMatch(credentials, dbRecord);
        })
        .catch(function (err) {
            console.log(`ERR-FUNC(verify): ${err}`);
        });
}

const user = {
    add,
    verify
};

mongoose.connect("mongodb://localhost/era-shift-db-dev");
module.exports = {user};
