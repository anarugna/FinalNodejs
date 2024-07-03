const pool = require('../config/db');

const Movie = {
    create: async (data) => {
        try {
            const sql = `INSERT INTO Pelicula (titulo, descripcion, categoria_id, director_id, imagen) VALUES (?, ?, ?, ?, ?)`;
            const [result] = await pool.query(sql, [data.titulo, data.descripcion, data.categoria_id, data.director_id, data.imagen]);
            return { id: result.insertId, ...data };
        } catch (err) {
            throw err;
        }
    },
    getAll: async () => {
        try {
            const sql = 'SELECT * FROM Pelicula';
            const [rows] = await pool.query(sql);
            return rows;
        } catch (err) {
            throw err;
        }
    },
    getById: async (id) => {
        try {
            const sql = 'SELECT * FROM Pelicula WHERE id = ?';
            const [rows] = await pool.query(sql, [id]);
            return rows[0];
        } catch (err) {
            throw err;
        }
    },
    update: async (id, data) => {
        try {
            const sql = `UPDATE Pelicula SET titulo = ?, descripcion = ?, categoria_id = ?, director_id = ?, imagen = ? WHERE id = ?`;
            const [result] = await pool.query(sql, [data.titulo, data.descripcion, data.categoria_id, data.director_id, data.imagen, id]);
            return { id: id, ...data };
        } catch (err) {
            throw err;
        }
    },
    delete: async (id) => {
        try {
            const sql = 'DELETE FROM Pelicula WHERE id = ?';
            const [result] = await pool.query(sql, [id]);
            return result.affectedRows > 0;
        } catch (err) {
            throw err;
        }
    }
};

module.exports = Movie;
