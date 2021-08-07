var ctrl = require("../../../controllers/user.controller");
var event = require("../../../controllers/events.controller");
var utils = require("../../../utils/lib");

// The route urls presented here are going to  
module.exports = function (app) {
    app.route("/user/login")
        .get(ctrl.login);
    app.route("/event/join/:event")
        .get(event.join);
    app.route("/event/:event")
        .get(event.details);
}