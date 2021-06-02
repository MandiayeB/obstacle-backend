const router = require('express').Router();
const User = require('../models/user.model');

router.post('/', async(req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        if (req.session.authenticated) {
            res.json(req.session);
        } else {
            const credentials = await User.findByEmail(email);
            if (credentials) {
                if (password === credentials.password) {
                    req.session.authenticated = true;
                    delete credentials.password;
                    req.session.credentials = credentials;
                    res.status(308).send(req.session.credentials);
                } else {
                    res.status(403).json({ msg: 'Wrong Credentials.' });
                }
            } else {
                res.status(403).json({ msg : 'Wrong Credentials.' });
            }
        }
    } else {
        res.status(403).json({ msg: 'Wrong Credentials.' });
    }
});

module.exports = router;