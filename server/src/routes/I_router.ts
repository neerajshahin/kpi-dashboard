import express = require('express');
import { Request, Response, Router } from "express";

let router: Router = express.Router();
//let clientController: IClientController;

interface I_Router {
  getRouter(): Router;
} 
export = I_Router;