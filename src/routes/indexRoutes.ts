const express = require('express');
const router = express.Router();
const controllerIndex = require('../controllers/index-controller')
const authService = require('../services/auth_service')

router.get('/', controllerIndex.get)
router.get('/:slug', controllerIndex.getBySlug)
router.get('/admin/:id', controllerIndex.getById)
router.get('/tags/:tag', controllerIndex.getByTag)

router.post('/',authService.isAdmin,controllerIndex.post)
router.put('/:id',authService.isAdmin,controllerIndex.put)
router.delete('/:id',authService.isAdmin,controllerIndex.delete)

module.exports= router;