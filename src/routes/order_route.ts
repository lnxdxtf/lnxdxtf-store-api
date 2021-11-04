import Express, {NextFunction, Request, Response} from "express"

const express = require('express');
const router = express.Router();
const controllerCustomer = require('../controllers/order_controller')

router.post('/',controllerCustomer.post)

router.get('/',controllerCustomer.get)


module.exports= router;