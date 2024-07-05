const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).send({ message: 'Acceso autorizado' });
});

module.exports = router;