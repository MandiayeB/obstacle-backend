const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const port = process.env.PORT || 3000;

router.post('/', async(req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        const credentials = await User.findByEmail(email);
        if (credentials) {
            const isMatch = await bcrypt.compare(password, credentials.password);
            if (isMatch) {
                req.session.authenticated = true;
                req.session.email = email;
                delete credentials.password;
                req.session.credentials = credentials;
                
                req.session.credentials.picture = (process.env.PORT ? `http://localhost:${port}` : `https://obstacle.herokuapp.com`) 
                    + `/pictures/${req.session.credentials.picture}`;

                res.status(308).send(req.session.credentials);
            } else {
                res.status(403).json({ msg: 'Les informations ne correspondent pas.' });
            }
        } else {
            res.status(403).json({ msg : 'Les informations ne correspondent pas.' });
        }
    } else {
        res.status(403).json({ msg: 'Les informations ne correspondent pas.' });
    }
});

module.exports = router;