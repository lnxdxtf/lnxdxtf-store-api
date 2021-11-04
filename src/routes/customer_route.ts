import Express, {NextFunction, Request, Response} from "express"

const express = require('express');
const router = express.Router();
const controllerCustomer = require('../controllers/customer_controller')

router.post('/',controllerCustomer.post)

module.exports= router;