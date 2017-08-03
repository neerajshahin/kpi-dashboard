import express = require('express');
import { Request, Response } from "express";
import I_Controller = require("./I_controller");
import APP_CONFIG = require("../config/app_config");
import path = require("path");
import APIRequest = require('../util/api-request');
var ipware = require('ipware');
var jwt = require('jwt-simple');

//log4js configuration
import LogConfig = require('../util/logconfig');
let log = new LogConfig().getLogger("Controller");


class Controller implements I_Controller {
    constructor(public apiRequest: APIRequest) { }

    denyAccess(response: Response): void {
        log.debug("Controller : denyAccess");
        return response.status(401).sendFile(path.join(__dirname + './../../../../web-app/dist/accessDenied.html'));
    }

    allowAccess(response: Response): void {
        log.debug("Controller : allowAccess");
        return response.status(200).sendFile(path.join(__dirname + './../../../../web-app/dist/index.html'));
    }

}
export = Controller;