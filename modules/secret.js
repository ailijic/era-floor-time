const uuid = require("uuid/v4");

function Secret() {
    const key_ = uuid();

    this.key = function () {
        return key_;
    };
}

module.exports = Secret;
