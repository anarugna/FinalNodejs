const pool = require('../config/db');

const User = {
    create: async (data) => {
        try {
            const sql = `INSERT INTO Usuario (nombre, email, password) VALUES (?, ?, ?)`;
            const [result] = await pool.query(sql, [data.nombre, data.email, data.password]);
            return { id: result.insertId, ...data };
        } catch (err) {
            throw err;
        }
    },
    findByEmail: async (email) => {
        try {
            const sql = 'SELECT * FROM Usuario WHERE email = ?';
            const [rows] = await pool.query(sql, [email]);
            return rows[0];
        } catch (err) {
            throw err;
        }
    },
    getById: async (id) => {
        try {
            const sql = 'SELECT * FROM Usuario WHERE id = ?';
            const [rows] = await pool.query(sql, [id]);
            return rows[0];
        } catch (err) {
            throw err;
        }
    }
};

module.exports = User;