const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas para registro y login de usuario
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;