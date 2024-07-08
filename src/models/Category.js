const db = require('../config/db');

const Category = {
    findAll: (callback) => {
        const sql = `SELECT * FROM Categoria`;
        db.query(sql, (err, result) => {
            if (err) callback(err);
            callback(null, result);
        });
    },
    create: (data) => {
        return new Promise((resolve, reject) => {
            const { nombre } = data;
            const sql = `INSERT INTO Categoria (nombre) VALUES (?)`;
            db.query(sql, [nombre], (err, result) => {
                if (err) return reject(err);
                resolve({ id: result.insertId, nombre });
            });
        });
    }
};

module.exports = Category;
