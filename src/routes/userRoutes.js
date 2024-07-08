const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// Rutas públicas
router.post('/register', userController.register);
router.post('/login', userController.login);

// Rutas protegidas
router.get('/protected-route', authMiddleware, (req, res) => {
    res.send('Esta es una ruta protegida');
});

module.exports = router;