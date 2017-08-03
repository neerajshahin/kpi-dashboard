import express = require('express');
import { Request, Response, Router } from "express";
import Controller = require("../controllers/controller");
import I_Router = require("./I_router");

let router: Router = express.Router();
//let clientController: IClientController;

//log4js configuration
import LogConfig = require('../util/logconfig');
let log = new LogConfig().getLogger("AppRouter");

class AppRouter implements I_Router{
  Controller : Controller;
  public getRouter(): Router {
    return router;
  }

  constructor(Controller : Controller) {
    this.Controller = Controller;
    this.init();
  }

  private init() {
    let self = this;
    router.get("/", function (request: Request, response: Response) {
        self.Controller.allowAccess(response);
    });
      
    router.get("/health", function (request: Request, response: Response) {
        //request.headers["clientip"] = "158.182.255.255";
        // log.debug("AppRouter : req.cookie",request.cookies);
        response.status(200).send("Health check success");
    });


  }
} export = AppRouter;