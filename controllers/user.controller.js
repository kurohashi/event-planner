'use strict';
var send = require("../configs/response.conf");
var conf = require("../configs/app.conf");
var lib = require("../utils/lib");
let console = conf.console;

module.exports = {
    register: register,
    login: login,
};

/**
 * User registration
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
function register(req, res) {
    let user = req.body;
    if (!(user.username && user.name && user.password))
        return send.invalid(res);
    if (!lib.validPasswordStrength(user.password))
        return send.invalid(res, "Password is weak");
    user.password = lib.createHash(user.password);
    user.wallet = user.wallet || 5000;
    lib.insertQuery(conf.dbTables.user, user, function (err, data) {
        if (err)
            return send.failure(res, err);
        send.ok(res);
    });
}

/**
 * User login
 * @param {*} req 
 * @param {*} res 
 * @returns
 */
function login(req, res) {
    send.ok(res);
}