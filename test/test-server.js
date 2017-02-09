process.env.NODE_ENV = "test";

// Require
require("rootpath")();
const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const userDB = require("database/models/user")
const server = require("server/server");

// Constants
const should =chai.should();
const expect = chai.expect;

// Main
chai.use(chaiHttp);
describe("Server", () => {
    beforeEach((done) => { // Empty the DB before each test
        userDB.remove({}, (err) => {
            done();
        });
    });
});
