const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes');
const movieRoutes = require('./src/routes/movieRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);


// Ruta para servir archivos estáticos
app.use(express.static('src/public'));

// Ruta para servir la página principal
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});














