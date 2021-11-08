import Express, {NextFunction, Request, Response} from "express"

const express = require('express');
const router = express.Router();
const controllerCustomer = require('../controllers/customer_controller')
const authService = require('../services/auth_service')

router.get('/',controllerCustomer.get)

router.post('/',controllerCustomer.post)

router.post('/authenticate',controllerCustomer.authenticate)

router.post('/refresh-token',authService.authorize ,controllerCustomer.refreshToken)

module.exports= router;