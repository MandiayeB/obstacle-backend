const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const hasToBeAuthenticated = require('../middlewares/hasToBeAuthenticated');

router.get('/', hasToBeAuthenticated, async(req,res) => {
    res.json(req.session.credentials);
});

router.put('/', hasToBeAuthenticated, async(req,res) => {
    const modify_creds = await User.updatePassword(req.body.password);
    res.json(modify_creds);
});

module.exports = router;