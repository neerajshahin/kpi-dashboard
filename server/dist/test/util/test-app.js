"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = require("express")();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
module.exports.getApp = app;
//# sourceMappingURL=/Users/niks/Projects/kpi-dashboard/server/dist/test/util/test-app.js.map