"use strict";
var path = require("path");
var ipware = require('ipware');
var jwt = require('jwt-simple');
var LogConfig = require("../util/logconfig");
var log = new LogConfig().getLogger("Controller");
var Controller = (function () {
    function Controller(apiRequest) {
        this.apiRequest = apiRequest;
    }
    Controller.prototype.denyAccess = function (response) {
        log.debug("Controller : denyAccess");
        return response.status(401).sendFile(path.join(__dirname + './../../../../web-app/dist/accessDenied.html'));
    };
    Controller.prototype.allowAccess = function (response) {
        log.debug("Controller : allowAccess");
        return response.status(200).sendFile(path.join(__dirname + './../../../../web-app/dist/index.html'));
    };
    return Controller;
}());
module.exports = Controller;
//# sourceMappingURL=/Users/arunbillava/Projects/api-status/tnf-api-dashboard/server/dist/src/controllers/controller.js.map