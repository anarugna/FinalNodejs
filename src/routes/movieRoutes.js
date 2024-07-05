const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const auth = require('../middleware/auth');
const multer = require('multer');
const axios = require('axios');
const dotenv = require('dotenv');
const FormData = require('form-data');

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).any();

router.post('/upload', auth, upload, async (req, res) => {
  console.log('Files:', req.files);
  
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No se pudo subir la imagen' });
  }

  const file = req.files[0];

  try {
    console.log('Intentando subir a Imgur...');
    
    // Crea una instancia de FormData
    const formData = new FormData();
    formData.append('image', file.buffer, file.originalname);

    // Configura los encabezados de la solicitud
    const headers = {
      Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
      ...formData.getHeaders()
    };

    // Envía la solicitud POST a Imgur
    const response = await axios.post('https://api.imgur.com/3/image', formData, { headers });

    console.log('Respuesta de Imgur:', response.data);
    res.json({ url: response.data.data.link });
  } catch (error) {
    console.error('Error completo:', error);
    console.error('Error subiendo la imagen a Imgur:', error.response ? error.response.data : error.message);
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
