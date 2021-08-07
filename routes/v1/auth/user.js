var ctrl = require("../../../controllers/user.controller");
var event = require("../../../controllers/events.controller");
var utils = require("../../../utils/lib");

// The route urls presented here are going to  
module.exports = function (app) {
    app.route("/user/register")
        .post(ctrl.register);
    app.route("/user/login")
        .post(ctrl.login);
    app.route("/event/join/:event")
        .post(event.join);
    app.route("/event/:event")
        .post(event.details);
}