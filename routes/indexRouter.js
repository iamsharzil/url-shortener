const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController');

const cacheMiddleware = require('../middlewares/cacheMiddleware');

router.get('/:url', cacheMiddleware.cache, indexController.getUrl);

router.post('/', indexController.postUrl);

module.exports = router;
