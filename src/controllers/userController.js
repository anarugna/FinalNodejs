const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = (req, res) => {
    const { nombre, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    User.create({ nombre, email, password: hashedPassword }, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ message: 'Registro Exitoso!' });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(404).send({ message: 'No se encuentra el usuario' });

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.status(401).send({ message: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: 86400 }); // esto equivale a 24 hs

        res.status(200).send({ auth: true, token });
    });
};