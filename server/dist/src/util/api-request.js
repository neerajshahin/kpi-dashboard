"use strict";
var apiRequest = require('request');
var APIRequest = (function () {
    function APIRequest() {
    }
    APIRequest.prototype.get = function (reqObject, onDone) {
        reqObject.rejectUnauthorized = false;
        apiRequest.get(reqObject, onDone);
    };
    APIRequest.prototype.post = function (reqObject, onDone) {
        reqObject.rejectUnauthorized = false;
        apiRequest.post(reqObject, onDone);
    };
    return APIRequest;
}());
module.exports = APIRequest;
//# sourceMappingURL=/Users/niks/Projects/kpi-dashboard/server/dist/src/util/api-request.js.map