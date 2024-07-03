const pool = require('../config/db');

const Director = {
    create: async (data) => {
        try {
            const sql = `INSERT INTO Director (nombre) VALUES (?)`;
            const [result] = await pool.query(sql, [data.nombre]);
            return { id: result.insertId, ...data };
        } catch (err) {
            throw err;
        }
    },
    getAll: async () => {
        try {
            const sql = 'SELECT * FROM Director';
            const [rows] = await pool.query(sql);
            return rows;
        } catch (err) {
            throw err;
        }
    },
    getById: async (id) => {
        try {
            const sql = 'SELECT * FROM Director WHERE id = ?';
            const [rows] = await pool.query(sql, [id]);
            return rows[0];
        } catch (err) {
            throw err;
        }
    },
    update: async (id, data) => {
        try {
            const sql = `UPDATE Director SET nombre = ? WHERE id = ?`;
            const [result] = await pool.query(sql, [data.nombre, id]);
            return { id: id, ...data };
        } catch (err) {
            throw err;
        }
    },
    delete: async (id) => {
        try {
            const sql = 'DELETE FROM Director WHERE id = ?';
            const [result] = await pool.query(sql, [id]);
            return result.affectedRows > 0;
        } catch (err) {
            throw err;
        }
    }
};

module.exports = Director;
