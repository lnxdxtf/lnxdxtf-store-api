import Express, { Router, Request, Response, NextFunction } from "express"
//    yarn dev:run // comando para rodar no terminal
const config = require('./config')
const express = require('express')
const app = express()
const router = express.Router()
app.use(express.json())

const mongoose = require('mongoose')     
mongoose.connect(config.connectionString)       

const bodyParser = require('body-parser')
app.use(bodyParser.json({
    limit: '5mb'
}))
app.use(bodyParser.urlencoded({
    extended: false
}))
//CORS- HABILITA
app.use(function (request:Request, response:Response, next:NextFunction) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});


//===================Carregar Modelos=========
const Produtct = require('./models/modelProduct')

const Customer = require('./models/customer')

const Order = require('./models/order')

//==================rotas=====================

const indexRoutes = require('./routes/indexRoutes');
const customerRoutes = require('./routes/customer_route');
const orderRoutes = require('./routes/order_route')


app.use('/products', indexRoutes)

app.use('/customers', customerRoutes)

app.use('/orders', orderRoutes)
//=============================================

module.exports = app