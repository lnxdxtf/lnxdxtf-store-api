import Express, { Router, Request, Response } from "express"
//    yarn dev:run // comando para rodar no terminal

const express = require('express')
const app = express()
const router = express.Router()
app.use(express.json())

//mongodb - mongoose//========================
const mongoose = require('mongoose')      //||
//mongoose-conexão======================================================================
const connectionString = 'mongodb+srv://sa:123qwe@cluster-01.pb6qj.mongodb.net/test'//||
mongoose.connect(connectionString)        //||==========================================
//============================================
//===================Carregar Modelos=========
const Produtct = require('./models/modelProduct')
//============================================
//==================rotas=====================

const indexRoutes = require('./routes/indexRoutes');
app.use('/products', indexRoutes)

//=============================================

module.exports = app