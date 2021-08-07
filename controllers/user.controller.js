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
        return send.invalid(res);
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
    let user = req.body;
    if (!(user.username && user.password))
        return send.invalid(res);
    user.password = lib.createHash(user.password);
    let obj = {
        username: user.username,
        password: user.password,
    };
    lib.selectQuery(conf.dbTables.user, obj, function (err, data) {
        if (err)
            return send.failure(res, err);
        if (data.rows.length)
            return send.ok(res);
        return send.unauthorized(res);
    });
}