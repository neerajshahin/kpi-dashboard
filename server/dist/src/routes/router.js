"use strict";
var express = require("express");
var router = express.Router();
var LogConfig = require("../util/logconfig");
var log = new LogConfig().getLogger("AppRouter");
var AppRouter = (function () {
    function AppRouter(Controller) {
        this.Controller = Controller;
        this.init();
    }
    AppRouter.prototype.getRouter = function () {
        return router;
    };
    AppRouter.prototype.init = function () {
        var self = this;
        router.get("/", function (request, response) {
            self.Controller.allowAccess(response);
        });
        router.get("/health", function (request, response) {
            response.status(200).send("Health check success");
        });
    };
    return AppRouter;
}());
module.exports = AppRouter;
//# sourceMappingURL=/Users/niks/Projects/kpi-dashboard/server/dist/src/routes/router.js.map