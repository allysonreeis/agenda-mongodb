const express = require('express');
const router = express.Router();
const homeController = require('./controllers/homeController');
const loginController = require('./controllers/loginController');

router.get('/', homeController.index);
router.get('/login', loginController.index);

module.exports = router;