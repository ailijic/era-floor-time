const root = process.cwd();
const db = require(`${root}/database/database`);
const jwt = require("jsonwebtoken");

module.exports = Token;

function Token(secret = "secret") {
    this.secret = function () { return secret; };
}
Token.prototype.gen = function (username, expireString="24h") {
    const expiresIn = expireString;
    return db.user.getUserId(username)
        .then((payload) => {
            const ret = jwt.sign(
                { payload },
                this.secret(),
                { expiresIn }
            );
            return Promise.resolve(ret);
        });
};
Token.prototype.isValid = function (token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, this.secret(), (err, decoded) => {
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    });
};
