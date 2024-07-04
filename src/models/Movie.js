const db = require('../config/db');

const Movie = {
    create: (data, callback) => {
        const sql = `INSERT INTO Pelicula (titulo, descripcion, categoria_id, director_id) VALUES (?, ?, ?, ?)`;
        db.query(sql, [data.titulo, data.descripcion, data.categoria_id, data.director_id], (err, result) => {
            if (err) callback(err);
            callback(null, result);
        });
    },
    findAll: (callback) => {
        const sql = `SELECT * FROM Pelicula`;
        db.query(sql, (err, result) => {
            if (err) callback(err);
            callback(null, result);
        });
    },
    findById: (id, callback) => {
        const sql = `SELECT * FROM Pelicula WHERE id = ?`;
        db.query(sql, [id], (err, result) => {
            if (err) callback(err);
            callback(null, result[0]);
        });
    },
    update: (id, data, callback) => {
        const sql = `UPDATE Pelicula SET titulo = ?, descripcion = ?, categoria_id = ?, director_id = ? WHERE id = ?`;
        db.query(sql, [data.titulo, data.descripcion, data.categoria_id, data.director_id, id], (err, result) => {
            if (err) callback(err);
            callback(null, result);
        });
    },
    delete: (id, callback) => {
        const sql = `DELETE FROM Pelicula WHERE id = ?`;
        db.query(sql, [id], (err, result) => {
            if (err) callback(err);
            callback(null, result);
        });
    }
};

module.exports = Movie;