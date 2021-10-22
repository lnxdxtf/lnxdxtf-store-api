import Express, {NextFunction, Request, Response} from "express"

const express = require('express');
const router = express.Router();
const controllerIndex = require('../controllers/index-controller')

router.get('/', controllerIndex.get)
    
router.post('/',controllerIndex.post)

router.put('/:id',controllerIndex.put)

router.delete('/:id',controllerIndex.delete)

module.exports= router;