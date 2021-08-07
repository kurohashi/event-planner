var ctrl = require("../../../controllers/events.controller");
var utils = require("../../../utils/lib");

// The route urls presented here are going to  
module.exports = function (app) {
    app.route("/event/create")
        .post(ctrl.create);
    app.route("/event/delete/:event")
        .post(ctrl.delete);
    app.route("/event/update")
        .post(ctrl.update);
}