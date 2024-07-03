const pool = require('../config/db');

const User = {
    create: (data, callback) => {
        const sql = `INSERT INTO Usuario (nombre, email, password) VALUES ($1, $2, $3) RETURNING *`;
        const values = [data.nombre, data.email, data.password];
        pool.query(sql, values, (err, result) => {
            if (err) callback(err);
            callback(null, result.rows[0]);
        });
    },
    findByEmail: (email, callback) => {
        const sql = 'SELECT * FROM Usuario WHERE email = $1';
        pool.query(sql, [email], (err, result) => {
            if (err) callback(err);
            callback(null, result.rows[0]);
        });
    },
    getById: (id, callback) => {
        const sql = 'SELECT * FROM Usuario WHERE id = $1';
        pool.query(sql, [id], (err, result) => {
            if (err) callback(err);
            callback(null, result.rows[0]);
        });
    }
};

module.exports = User;