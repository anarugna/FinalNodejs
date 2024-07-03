const pool = require('../config/db');

const Movie = {
    create: (data, callback) => {
        const sql = `INSERT INTO Pelicula (titulo, descripcion, categoria_id, director_id, imagen) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [data.titulo, data.descripcion, data.categoria_id, data.director_id, data.imagen];
        pool.query(sql, values, (err, result) => {
            if (err) callback(err);
            callback(null, result.rows[0]);
        });
    },
    getAll: (callback) => {
        const sql = 'SELECT * FROM Pelicula';
        pool.query(sql, (err, result) => {
            if (err) callback(err);
            callback(null, result.rows);
        });
    },
    getById: (id, callback) => {
        const sql = 'SELECT * FROM Pelicula WHERE id = $1';
        pool.query(sql, [id], (err, result) => {
            if (err) callback(err);
            callback(null, result.rows[0]);
        });
    },
    update: (id, data, callback) => {
        const sql = `UPDATE Pelicula SET titulo = $1, descripcion = $2, categoria_id = $3, director_id = $4, imagen = $5 WHERE id = $6 RETURNING *`;
        const values = [data.titulo, data.descripcion, data.categoria_id, data.director_id, data.imagen, id];
        pool.query(sql, values, (err, result) => {
            if (err) callback(err);
            callback(null, result.rows[0]);
        });
    },
    delete: (id, callback) => {
        const sql = 'DELETE FROM Pelicula WHERE id = $1 RETURNING *';
        pool.query(sql, [id], (err, result) => {
            if (err) callback(err);
            callback(null, result.rows[0]);
        });
    }
};

module.exports = Movie;