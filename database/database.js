"use strict";

const UserModel = require(`${__dirname}/models/user`);
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

function add(credentials) {
    // TODO: If the record already exists log in the user
    const newRecord = new UserModel(credentials);
    newRecord.isNew = false;
    return newRecord.save();
}

function getUserId(username) {
    return UserModel.findOne({ username }).exec()
        .then((obj) => Promise.resolve(obj._id))
}

function isMatch(userInput, dbRecord) {
    let ret = false;
    if (dbRecord === null) {
    } else if (userInput.username === dbRecord.username &&
            userInput.password === dbRecord.password) {
        ret = true;
    }
    return ret;
}

function setAvailability(username, boolArray) {
    const conditions    = { username }
        , update        = { availability: boolArray }

    return UserModel.update(conditions, update).exec();
}

function verify(credentials) {
    return UserModel.findOne(credentials).exec()
        .then(function (dbRecord) {
            const result = isMatch(credentials, dbRecord);
            if (result) {
                return Promise.resolve();
            } else {
                return Promise.reject();
            }
        })
}

const user = {
    add,
    verify,
    setAvailability,
    getUserId
};

mongoose.connect("mongodb://localhost/era-shift-db-dev");
module.exports = {user};
