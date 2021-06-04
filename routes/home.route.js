const express = require('express');
const router = express.Router();
const Goal = require('../models/goal.model');
const hasToBeAuthenticated = require('../middlewares/hasToBeAuthenticated');

router.get('/', hasToBeAuthenticated, async(req,res) => {
    console.log(req.session);
    const goals = await Goal.getGoals(req.session.credentials.user_id);
    res.json(goals);
});

module.exports = router;