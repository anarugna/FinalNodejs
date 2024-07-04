const Movie = require('../models/movie');

exports.createMovie = (req, res) => {
    const { titulo, descripcion, categoria_id, director_id } = req.body;

    Movie.create({ titulo, descripcion, categoria_id, director_id }, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ message: 'Pelicula Creada con Exito' });
    });
};

exports.getMovies = (req, res) => {
    Movie.findAll((err, movies) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(movies);
    });
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