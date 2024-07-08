const Director = require('../models/Director');

exports.getDirectors = (req, res) => {
    Director.findAll((err, directors) => {
        if (err) {
            console.error('Error al obtener los directores:', err);
            return res.status(500).send({ error: 'Error al obtener los directores' });
        }
        res.status(200).send(directors);
    });
};