const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/', isAuthenticated, async(req,res) => {
    res.json(req.session.credentials);
});

router.put('/', isAuthenticated, async(req,res) => {
    const modify_creds = await User.updatePassword(req.body.password);
    res.json(modify_creds);
});

module.exports = router;