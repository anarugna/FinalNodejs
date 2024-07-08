const db = require('../config/db');

const Movie = {
    create: (data, callback) => {
        const { titulo, descripcion, categoria_id, director_id, imagen_url } = data;
        const sql = `INSERT INTO Pelicula (titulo, descripcion, categoria_id, director_id, imagen_url) VALUES (?, ?, ?, ?, ?)`;
        db.query(sql, [titulo, descripcion, categoria_id, director_id, imagen_url], (err, result) => {
            if (err) {
                return callback(err); // Devuelve un error al callback si hay un error
            }
            callback(null, result); // Devuelve el resultado al callback si no hay error
        });
    },
    findAll: (callback) => {
        const sql = `SELECT * FROM Pelicula`;
        db.query(sql, (err, result) => {
            if (err) {
                return callback(err); // Devuelve un error al callback si hay un error
            }
            callback(null, result); // Devuelve el resultado al callback si no hay error
        });
    },
    findById: (id, callback) => {
        const sql = `SELECT * FROM Pelicula WHERE id = ?`;
        db.query(sql, [id], (err, result) => {
            if (err) {
                return callback(err); // Devuelve un error al callback si hay un error
            }
            callback(null, result[0]); // Devuelve el resultado al callback si no hay error
        });
    },
    update: (id, data, callback) => {
        const { titulo, descripcion, categoria_id, director_id, imagen_url } = data;
        const sql = `UPDATE Pelicula SET titulo = ?, descripcion = ?, categoria_id = ?, director_id = ?, imagen_url = ? WHERE id = ?`;
        db.query(sql, [titulo, descripcion, categoria_id, director_id, imagen_url, id], (err, result) => {
            if (err) {
                return callback(err); // Devuelve un error al callback si hay un error
            }
            callback(null, result); // Devuelve el resultado al callback si no hay error
        });
    },
    delete: (id, callback) => {
        const sql = `DELETE FROM Pelicula WHERE id = ?`;
        db.query(sql, [id], (err, result) => {
            if (err) {
                return callback(err); // Devuelve un error al callback si hay un error
            }
            callback(null, result); // Devuelve el resultado al callback si no hay error
        });
    }
};

module.exports = Movie;
