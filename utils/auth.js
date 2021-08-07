let conf = require("../configs/app.conf");
const lib = require("./lib");
let console = conf.console;

module.exports = {
	isAuthenticated: isAuthenticated,
	isAdmin: isAdmin,
}

function isAuthenticated(req, res, cb) {
	let user = {
		username: req.body.username,
		password: lib.createHash(req.body.password),
	};
	lib.selectQuery(conf.dbTables.user, user, function (err, data) {
		if (err || !data.rows.length)
			return cb("unauthenticated");
		cb(null, req);
	});
}

function isAdmin(req, res, cb) {
	let user = {
		username: req.body.username,
		password: lib.createHash(req.body.password),
	};
	if (user.username != "admin")
		return cb("unauthenticated");
	lib.selectQuery(conf.dbTables.user, user, function (err, data) {
		if (err || !data.rows.length)
			return cb("unauthenticated");
		cb(null, req);
	});
}