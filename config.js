const config = {};

config.url = {
    noAuth: "/login",
};

config.web = {
    port: process.env.PORT || 8080,
};

module.exports = Object.freeze(config);
