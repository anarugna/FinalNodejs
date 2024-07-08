const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Permitir acceso público a rutas específicas (por ejemplo, la ruta para registro de películas)
    if (req.path === '/api/movies/movies' && req.method === 'POST') {
        return next(); // Permitir acceso sin autenticación
    }

    if (!authHeader) {
        return res.status(403).send({ auth: false, message: 'No hay Token para nadie' });
    }

    // El token está en el formato 'Bearer <token>'
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Fallo autenticar el token.' });
        }

        req.userId = decoded.id;
        next();
    });
};