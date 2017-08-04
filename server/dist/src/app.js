"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env = process.env.NODE_ENV || "dev";
var LogConfig = require("./util/logconfig");
var log = new LogConfig().getLogger("App");
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var path = require("path");
var APP_CONFIG = require("./config/app_config");
var IPRouter = require("./routes/router");
var IPController = require("./controllers/controller");
var APIRequest = require("./util/api-request");
var cors = require('cors');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
process.on('uncaughtException', function (err) {
    log.debug('Caught exception: ' + err + "\n" + err.stack);
});
app.use(function (err, req, res, next) {
    log.error(err.stack);
    res.status(500).send('Something broke!' + err.stack);
});
var apiRequest = new APIRequest();
var controller = new IPController(apiRequest);
var routes = new IPRouter(controller);
app.use("/", routes.getRouter());
app.use("/", express.static(path.resolve(__dirname, "../../../web-app/dist")));
var PORT = APP_CONFIG.PORT;
app.listen(PORT, function () {
    log.info("Customer WEB API server listening on port %d in %s mode", PORT);
});
exports.App = app;
//# sourceMappingURL=/Users/niks/Projects/kpi-dashboard/server/dist/src/app.js.map