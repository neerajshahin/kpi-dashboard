let env = process.env.NODE_ENV || "dev";

//log4js configuration
import LogConfig = require('./util/logconfig');
let log = new LogConfig().getLogger("App");

import express = require("express");
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import * as  cookieParser from 'cookie-parser';
import * as pg from "pg";
import * as path from "path";
import APP_CONFIG = require("./config/app_config");
import IPRouter = require("./routes/router");
import IPController = require("./controllers/controller");
import APIRequest = require('./util/api-request');

var cors = require('cors');
let app = express();

// Configuration

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

process.on('uncaughtException', function (err: any) {
    log.debug('Caught exception: ' + err+"\n"+ err.stack);
});

app.use(function (err: Error, req: Request, res: Response, next: any) {
    log.error(err.stack);
    res.status(500).send('Something broke!' + err.stack);
});

let apiRequest = new APIRequest();
let controller = new IPController(apiRequest);
let routes = new IPRouter(controller);
app.use("/", routes.getRouter());
app.use("/", express.static(path.resolve(__dirname, "../../../web-app/dist")));
let PORT = APP_CONFIG.PORT;
app.listen(PORT, function () {
    log.info("Customer WEB API server listening on port %d in %s mode", PORT);
});

export var App = app;
