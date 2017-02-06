const Token = require("./token");

function authFilter(req, res, next) {
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
                return res.redirect("login.html");
                // return res.json({
                    // success: false,
                    // message: "Failed to authenticate token.",
                // });
            });
    } else {
        console.log("No Token");
        return res.redirect("login.html");
        // return res.status(403).json({
            // success: false,
            // message: 'No token cookie provided',
        // });
    }
}

module.exports = authFilter;
