"use strict";

const root = process.cwd();
const express = require("express");
const api = new express.Router();
const db = require(`${root}/database/database`);

// Post request
api.post("create-account", db.createAccount);
