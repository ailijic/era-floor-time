// (function start() {
    // "use strict";
//
    // // Route middleware to verify a token
    // function f (token, isValid) {
        // function (req, res, next) {
            // isValid(extract.token(req), function (isAuth, decoded) {
                // if (isAuth === true) {
                    // req.decoded = decoded; // Save token for later
                    // next();
                // } else {
                    // // No token or bad token
                    // return res.status(403).send({
                        // success: false,
                        // message: "Invalid or missing token"
                    // });
                // }
        // });
    // }
// }());
//
/**
 * If user has vaild token call next()
    * else 403 error
    * @param req: request
    * @param res: response
    * @param next: continue to the next route handler
    */
    // function authFilter(req, res, next) {
        // // get the token
        // // check if the token is vaild
        // // IF token is valid
            // // save token for later use
    // }

"use strict";

function authFilter(req, res, next) {
    console.log(req);
    next();        
}

module.exports = authFilter;
