const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({ auth: false, message: 'No hay Token.' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            if (err.name === 'JsonWebTokenError') {
                return res.status(401).send({ auth: false, message: 'Token inválido.' });
            }
            if (err.name === 'TokenExpiredError') {
                return res.status(401).send({ auth: false, message: 'Token expirado.' });
            }
            return res.status(500).send({ auth: false, message: 'Fallo al autenticar el token.' });
        }

        // Si el token es válido, agregamos el id del usuario decodificado al objeto req para usarlo en las rutas protegidas
        req.userId = decoded.id;
        next();
    });
};
