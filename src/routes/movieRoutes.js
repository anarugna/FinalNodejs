const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const auth = require('../middleware/auth');
const multer = require('multer');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', auth, upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se pudo subir la imagen' });
  }

  try {
    const response = await axios.post('https://api.imgur.com/3/image', req.file.buffer, {
      headers: {
        Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    res.json({ url: response.data.data.link });
  } catch (error) {
    res.status(500).json({ error: 'Error subiendo la imagen a Imgur' });
  }
});

// Rutas para CRUD de películas
router.post('/movies', auth, movieController.createMovie);
router.get('/movies', auth, movieController.getMovies);
router.get('/movies/:id', auth, movieController.getMovieById);
router.put('/movies/:id', auth, movieController.updateMovie);
router.delete('/movies/:id', auth, movieController.deleteMovie);

module.exports = router;