const express = require('express');
const router = express.Router();
const agendaController = require('./controllers/agendaController');
const loginController = require('./controllers/loginController');
const contactController = require('./controllers/contactController');
const { loginRequired } = require('./middlewares/middleware');

router.get('/', agendaController.index);

router.get('/login', loginController.index);
router.post('/login/register', loginController.register);
router.post('/login/login', loginController.login);
router.get('/login/logout', loginController.logout);

router.get('/contato', loginRequired, contactController.index);
router.get('/contato/:id', loginRequired, contactController.editContact);
router.post('/contato/register', loginRequired, contactController.register);
router.post('/contato/edit/:id', loginRequired, contactController.edit);
router.get('/contato/delete/:id', loginRequired, contactController.delete);

module.exports = router;