const db = require('../config/db');

const Director = {
    findAll: (callback) => {
        const sql = `SELECT * FROM director`;
        db.query(sql, (err, result) => {
            if (err) callback(err);
            callback(null, result);
        });
    },
    create: (data) => {
        return new Promise((resolve, reject) => {
            const { nombre } = data;
            const sql = `INSERT INTO Director (nombre) VALUES (?)`;
            db.query(sql, [nombre], (err, result) => {
                if (err) return reject(err);
                resolve({ id: result.insertId, nombre });
            });
        });
    }
};

module.exports = Director;
