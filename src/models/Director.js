const db = require('../config/db');

const Director = {
    findAll: (callback) => {
        const sql = `SELECT * FROM director`;
        db.query(sql, (err, result) => {
            if (err) callback(err);
            callback(null, result);
        });
    }
};

module.exports = Director;