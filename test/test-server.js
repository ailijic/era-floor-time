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
describe("Server:", () => {
    beforeEach((done) => { // Empty the DB before each test
        userDB.remove({}, (err) => {
            done();
        });
    });

    describe("HTTP GET /login", () => {
        it("should return status 200", (done) => {
            chai.request(server)
                .get("/login")
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });
    });
});

describe("API:", () => {
    describe("POST: /api/user/login", () => {
        it("should redirect with status 303", (done) => {
            chai.request(server)
                .post("/api/user/login")
                .redirects(0)
                .field("username", "a")
                .field("password", "a")
                .end((err, res) => {
                    // console.log(res);
                    res.should.have.headers;
                    res.should.redirect;
                    res.should.have.status(303);
                    res.should.redirectTo("/login");

                    done();
                });
        });
    });
});
