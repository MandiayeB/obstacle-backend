const express = require('express');
const router = express.Router();
const Goal = require('../models/goal.model');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/', isAuthenticated, async(req,res) => {
    const goals = await Goal.getGoals(req.session.credentials.user_id);
    res.json(goals);
});

module.exports = router;