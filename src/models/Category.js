const pool = require('../config/db');

const Category = {
    create: (data, callback) => {
        const sql = `INSERT INTO Categoria (nombre) VALUES ($1) RETURNING *`;
        const values = [data.nombre];
        pool.query(sql, values, (err, result) => {
            if (err) callback(err);
            callback(null, result.rows[0]);
        });
    },
    getAll: (callback) => {
        const sql = 'SELECT * FROM Categoria';
        pool.query(sql, (err, result) => {
            if (err) callback(err);
            callback(null, result.rows);
        });
    },
    getById: (id, callback) => {
        const sql = 'SELECT * FROM Categoria WHERE id = $1';
        pool.query(sql, [id], (err, result) => {
            if (err) callback(err);
            callback(null, result.rows[0]);
        });
    },
    update: (id, data, callback) => {
        const sql = `UPDATE Categoria SET nombre = $1 WHERE id = $2 RETURNING *`;
        const values = [data.nombre, id];
        pool.query(sql, values, (err, result) => {
            if (err) callback(err);
            callback(null, result.rows[0]);
        });
    },
    delete: (id, callback) => {
        const sql = 'DELETE FROM Categoria WHERE id = $1 RETURNING *';
        pool.query(sql, [id], (err, result) => {
            if (err) callback(err);
            callback(null, result.rows[0]);
        });
    }
};
module.exports = Category;