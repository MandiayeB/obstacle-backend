const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

router.post('/', async(req, res) => {
    const { firstname,lastname,email,password,confirm,gender,birthdate } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const picture = "defaultProfilePicture.jpg";

    if (firstname && lastname && email && password && confirm && gender && birthdate) {
        if (await User.findByEmail(email)) {
            res.status(403).json({ msg: 'Cette adresse mail est déjà utilisée.' });

        } else {
            if (password === confirm) {
                await User.create(firstname, lastname, email, hashPassword, gender, birthdate, picture, 2);
                const credentials = await User.findByEmail(email);
                req.session.authenticated = true;
                delete credentials.password;
                req.session.credentials = credentials;
                res.status(308).send("Les informations sont valides, nous vous redirigeons vers la page de connexion.");
            } else {
                res.status(403).json({ msg: 'Les mots de passe ne correspondent pas.' });
            }
        }
        
    } else {
        res.status(403).json({ msg: 'Les informations sont éronnées.' });
    }
});

module.exports = router;