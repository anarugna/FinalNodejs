const db = require('../config/db');

const User = {
    create: (data, callback) => {
        const sql = `INSERT INTO Usuario (nombre, email, password) VALUES (?, ?, ?)`;
        db.query(sql, [data.nombre, data.email, data.password], (err, result) => {
            if (err) callback(err);
            callback(null, result);
        });
    },
    findByEmail: (email, callback) => {
        const sql = `SELECT * FROM Usuario WHERE email = ?`;
        db.query(sql, [email], (err, result) => {
            if (err) callback(err);
            callback(null, result[0]);
        });
    }
};

module.exports = User;