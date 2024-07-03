const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 8);

        const newUser = await User.create({ nombre, email, password: hashedPassword });
        res.status(201).send({ message: 'Registro Exitoso!', user: newUser });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findByEmail(email);
        if (!user) return res.status(404).send({ message: 'No se encuentra el usuario' });

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.status(401).send({ message: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: 86400 }); // esto equivale a 24 hs

        res.status(200).send({ auth: true, token });
    } catch (err) {
        res.status(500).send(err);
    }
};
