const Movie = require('../models/Movie');
const Category = require('../models/Category');
const Director = require('../models/Director');

exports.createMovie = async (req, res) => {
    const { titulo, descripcion, categoria, director } = req.body;
    let categoria_id = req.body.categoria_id;
    let director_id = req.body.director_id;
    let imagen_url = req.body.imagen_url; // Asegúrate de capturar la URL de la imagen aquí

    try {
        // Verificar si se seleccionó una categoría existente
        if (!categoria_id && categoria) {
            // Crear una nueva categoría
            const newCategory = await Category.create({ nombre: categoria });
            categoria_id = newCategory.id;
        }

        // Verificar si se seleccionó un director existente
        if (!director_id && director) {
            // Crear un nuevo director
            const newDirector = await Director.create({ nombre: director });
            director_id = newDirector.id;
        }

        // Crear la película con las referencias a categoría, director y URL de imagen
        Movie.create({ titulo, descripcion, categoria_id, director_id, imagen_url }, (err, result) => {
            if (err) {
                console.error('Error al crear la película:', err);
                return res.status(500).send({ error: 'Error al crear la película' });
            }
            res.status(201).send({ message: 'Película creada exitosamente' });
        });

    } catch (error) {
        console.error('Error al crear la película:', error);
        res.status(500).send({ error: 'Error al crear la película' });
    }
};

exports.getMovies = (req, res) => {
    Movie.findAll((err, movies) => {
        if (err) {
            console.error('Error al obtener las películas:', err);
            return res.status(500).send({ error: 'Error al obtener las películas' });
        }
        res.status(200).send(movies);
    });
};

exports.getMovieById = (req, res) => {
    const { id } = req.params;

    Movie.findById(id, (err, movie) => {
        if (err) {
            console.error('Error al obtener la película por ID:', err);
            return res.status(500).send({ error: 'Error al obtener la película por ID' });
        }
        if (!movie) {
            return res.status(404).send({ message: 'Película no encontrada' });
        }
        res.status(200).send(movie);
    });
};

exports.updateMovie = (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, categoria_id, director_id, imagen_url } = req.body;

    Movie.update(id, { titulo, descripcion, categoria_id, director_id, imagen_url }, (err, result) => {
        if (err) {
            console.error('Error al actualizar la película:', err);
            return res.status(500).send({ error: 'Error al actualizar la película' });
        }
        res.status(200).send({ message: 'Película actualizada exitosamente' });
    });
};

exports.deleteMovie = (req, res) => {
    const { id } = req.params;

    Movie.delete(id, (err, result) => {
        if (err) {
            console.error('Error al eliminar la película:', err);
            return res.status(500).send({ error: 'Error al eliminar la película' });
        }
        res.status(200).send({ message: 'Película eliminada exitosamente' });
    });
};
