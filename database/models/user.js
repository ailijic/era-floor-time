"use strict";

const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    username:       { type: String, required: true, unique: true },
    password:       { type: String, required: true },
    email:          { type: String, required: false },
    firstName:      { type: String, required: false },
    lastName:       { type: String, required: false }
});

const User = mongoose.model("User", ItemSchema);

module.exports = User;
