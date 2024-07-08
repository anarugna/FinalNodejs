const db = require('../config/db');

const Movie = {
    create: (data, callback) => {
        const { titulo, descripcion, categoria_id, director_id, imagen_url } = data;
        const sql = `INSERT INTO Pelicula (titulo, descripcion, categoria_id, director_id, imagen_url) VALUES (?, ?, ?, ?, ?)`;
        db.query(sql, [titulo, descripcion, categoria_id, director_id, imagen_url], (err, result) => {
            if (err) {
                // Manejar el error si ocurre
                return callback(err); // Asegurarse de devolver el error al callback
            }
            // Llamar al callback con null para indicar que no hay error y pasar el resultado
            callback(null, result);
        });
    },
    findAll: (callback) => {
        const sql = `SELECT * FROM Pelicula`;
        db.query(sql, (err, result) => {
            if (err) {
                // Manejar el error si ocurre
                return callback(err); // Asegurarse de devolver el error al callback
            }
            // Llamar al callback con null para indicar que no hay error y pasar el resultado
            callback(null, result);
        });
    },
    findById: (id, callback) => {
        const sql = `SELECT * FROM Pelicula WHERE id = ?`;
        db.query(sql, [id], (err, result) => {
            if (err) {
                // Manejar el error si ocurre
                return callback(err); // Asegurarse de devolver el error al callback
            }
            // Llamar al callback con null para indicar que no hay error y pasar el resultado
            callback(null, result[0]);
        });
    },
    update: (id, data, callback) => {
        const { titulo, descripcion, categoria_id, director_id, imagen_url } = data;
        const sql = `UPDATE Pelicula SET titulo = ?, descripcion = ?, categoria_id = ?, director_id = ?, imagen_url = ? WHERE id = ?`;
        db.query(sql, [titulo, descripcion, categoria_id, director_id, imagen_url, id], (err, result) => {
            if (err) {
                // Manejar el error si ocurre
                return callback(err); // Asegurarse de devolver el error al callback
            }
            // Llamar al callback con null para indicar que no hay error y pasar el resultado
            callback(null, result);
        });
    },
    delete: (id, callback) => {
        const sql = `DELETE FROM Pelicula WHERE id = ?`;
        db.query(sql, [id], (err, result) => {
            if (err) {
                // Manejar el error si ocurre
                return callback(err); // Asegurarse de devolver el error al callback
            }
            // Llamar al callback con null para indicar que no hay error y pasar el resultado
            callback(null, result);
        });
    }
};

module.exports = Movie;
