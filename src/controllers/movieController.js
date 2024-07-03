const Movie = require('../models/Movie');

exports.createMovie = async (req, res) => {
    try {
        const { titulo, descripcion, categoria_id, director_id, imagen } = req.body;
        const newMovie = await Movie.create({ titulo, descripcion, categoria_id, director_id, imagen });
        res.status(201).send({ message: 'Pelicula Creada con Exito', movie: newMovie });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.getAll();
        res.status(200).send(movies);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.getById(id);
        if (!movie) return res.status(404).send({ message: 'Pelicula no encontrada' });
        res.status(200).send(movie);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, categoria_id, director_id, imagen } = req.body;
        const updatedMovie = await Movie.update(id, { titulo, descripcion, categoria_id, director_id, imagen });
        res.status(200).send({ message: 'Pelicula Actualizada con exito', movie: updatedMovie });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Movie.delete(id);
        if (!deleted) return res.status(404).send({ message: 'Pelicula no encontrada' });
        res.status(200).send({ message: 'Se borro la Pelicula !!' });
    } catch (err) {
        res.status(500).send(err);
    }
};


exports.getMovieById = (req, res) => {
    const { id } = req.params;

    Movie.findById(id, (err, movie) => {
        if (err) return res.status(500).send(err);
        if (!movie) return res.status(404).send({ message: 'Pelicula no encontrada' });
        res.status(200).send(movie);
    });
};

exports.updateMovie = (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, categoria_id, director_id } = req.body;

    Movie.update(id, { titulo, descripcion, categoria_id, director_id }, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Peli Actualizada con exito' });
    });
};

exports.deleteMovie = (req, res) => {
    const { id } = req.params;

    Movie.delete(id, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Se borro la Pelicula !!' });
    });
};