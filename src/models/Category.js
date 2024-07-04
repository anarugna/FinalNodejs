const db = require('../config/db');

const Category = {
    findAll: (callback) => {
        const sql = `SELECT * FROM Categoria`;
        db.query(sql, (err, result) => {
            if (err) callback(err);
            callback(null, result);
        });
    }
};

module.exports = Category;