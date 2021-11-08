import Express, {NextFunction, Request, Response} from "express"

const express = require('express');
const router = express.Router();
const controllerIndex = require('../controllers/index-controller')
const authService = require('../services/auth_service')


router.get('/', controllerIndex.get)
router.get('/:slug', controllerIndex.getBySlug)
router.get('/admin/:id', controllerIndex.getById)
router.get('/tags/:tag', controllerIndex.getByTag)

router.post('/',authService.authorize,controllerIndex.post)

router.put('/:id',authService.authorize,controllerIndex.put)

router.delete('/:id',authService.authorize,controllerIndex.delete)

module.exports= router;