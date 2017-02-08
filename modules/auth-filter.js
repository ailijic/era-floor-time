require('rootpath')();
const config = require("config");
const Token = require("modules/token");

function authFilter(req, res, next) {
    const redirectURL = config.url.noAuth || "/login";
    // console.log(req.cookies);
    const checker = new Token(req.app.get("secretKey"));
    const token = req.cookies.token;
    if (token) {
        checker.isValid(token)
            .then((obj) => {
                // console.log(obj);
                next();
            })
            .catch((err) => {
                // console.log(err);
                console.log("Failed to authenticate token.");
                return res.redirect(redirectURL);
            });
    } else {
        console.log("No Token");
        return res.redirect("login.html");
    }
}

module.exports = authFilter;
