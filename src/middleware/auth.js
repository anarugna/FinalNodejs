const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) return res.status(403).send({ auth: false, message: 'No hay Token.' });

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Fallo autenticar el token.' });

        req.userId = decoded.id;
        next();
    });
};