import Express, {NextFunction, request, Request, Response} from "express"

const express = require('express');
const router = express.Router();
const controllerCustomer = require('../controllers/order_controller')
const authService = require('../services/auth_service')

router.post('/' ,authService.authorize ,controllerCustomer.post)

router.get('/' ,authService.authorize ,controllerCustomer.get)


module.exports= router;