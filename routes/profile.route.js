const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.get('/', async(req,res) => {
    const user = await User.getById(req.session.user_id);
    res.json(user);
})

router.put('/', async(req,res) => {
    const modify_creds = await User.updatePassword(req.body.password);
    res.json(modify_creds);
})

module.exports = router;