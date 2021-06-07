const express = require('express');
const router = express.Router();
const agendaController = require('./controllers/agendaController');
const loginController = require('./controllers/loginController');

router.get('/', agendaController.index);
router.get('/login', loginController.index);
router.post('/login/register', loginController.register);

module.exports = router;