const express = require('express');
const router = express.Router();
const agendaController = require('./controllers/agendaController');
const loginController = require('./controllers/loginController');

router.get('/', agendaController.index);
router.get('/login', loginController.index);
router.post('/login/register', loginController.register);
router.post('/login/login', loginController.login);
router.get('/login/logout', loginController.logout);

module.exports = router;