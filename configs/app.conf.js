module.exports = new (function () {
	this.console = require("tracer").colorConsole();
	this.sys = {
		"environment": "Development",
		"versions": ["v1"],
		"port": "25000",
		"base_url": "http://localhost:25000"
	}
	this.auth = {
		iterations: 2500,
		salt: "example_setter",
		length: 50,
		password: "(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.*[A-Za-z])(?=.{6,})",
	};
	this.dbTables = {
		user: "users",
		event: "events",
		participants: "participants",
	};
})();