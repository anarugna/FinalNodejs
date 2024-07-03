const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const auth = require('../middleware/auth');

// Rutas para CRUD de películas
router.post('/movies', auth, movieController.createMovie);
router.get('/movies', auth, movieController.getMovies);
router.get('/movies/:id', auth, movieController.getMovieById);
router.put('/movies/:id', auth, movieController.updateMovie);
router.delete('/movies/:id', auth, movieController.deleteMovie);

module.exports = router;