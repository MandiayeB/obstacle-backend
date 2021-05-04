const router = require('express').Router();
const User = require('../models/user.model');

router.post('/', async(req, res) => {

    const { firstname, lastname, email, password, pw_confirmation } = req.body;

    if (firstname && lastname && email && password && pw_confirmation) {

        if (await User.findByEmail(email)) {
            res.status(403).json({ msg: 'This email is already used.' });

        } else {

            if (password === pw_confirmation) {
                const createUser = await User.create(firstname, lastname, email, password, 1);
                const credentials = await User.findByEmail(email);
                req.session.authenticated = true;
                delete credentials.password;
                req.session.credentials = credentials;
                res.redirect(301, '/');
            } else {
                res.status(403).json({ msg: 'Password do not match password confirmation.' });
            }
        }
    } else {
        res.status(403).json({ msg: 'Wrong Credentials.' });
    }
});

module.exports = router;