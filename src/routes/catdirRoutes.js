const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const directorController = require('../controllers/directorController');

// Rutas para obtener categorías y directores
router.get('/categories', categoryController.getCategories);
router.get('/directors', directorController.getDirectors);

module.exports = router;