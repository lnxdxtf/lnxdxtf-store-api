import Express, { Router, Request, Response } from "express"
//    yarn dev:run // comando para rodar no terminal

const config = require('./config')

const express = require('express')
const app = express()
const router = express.Router()
app.use(express.json())
const mongoose = require('mongoose')     

mongoose.connect(config.connectionString)       

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