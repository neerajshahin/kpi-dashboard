import express = require('express');
import { Request, Response } from "express";
import APIRequest = require('../util/api-request');

interface I_Controller {
    apiRequest : APIRequest;
    denyAccess(response: Response): void;
    allowAccess(response: Response): void;
}
export = I_Controller;