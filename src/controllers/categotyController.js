const Category = require('../models/Category');

exports.getCategories = (req, res) => {
    Category.findAll((err, categories) => {
        if (err) {
            console.error('Error al obtener las categorías:', err);
            return res.status(500).send({ error: 'Error al obtener las categorías' });
        }
        res.status(200).send(categories);
    });
};