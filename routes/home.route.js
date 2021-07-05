const express = require('express');
const router = express.Router();
const Goal = require('../models/goal.model');
const hasToBeAuthenticated = require('../middlewares/hasToBeAuthenticated');
const User = require('../models/user.model');

router.get('/', hasToBeAuthenticated, async(req,res) => {
    const goals = await Goal.getGoals(req.session.credentials.user_id);
    res.json(goals);
});

router.get('/isAdmin', hasToBeAuthenticated, async(req,res) => {
    const isAdmin = await User.isAdmin(req.session.credentials.user_id);
    res.json(isAdmin === "Admin" ? true : false);
});

module.exports = router;