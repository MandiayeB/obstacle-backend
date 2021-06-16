const express = require('express');
const router = express.Router();
const hasToBeAuthenticated = require('../middlewares/hasToBeAuthenticated');
const Achievement = require('../models/achievement.model');
const Goal = require('../models/goal.model');

router.get('/', hasToBeAuthenticated, async(req,res) => {
    const goals = await Goal.getByUserId(req.session.credentials.user_id);
    const acmStats = [];
    for (const goal of goals) {
        acm = await Achievement.getByGoalId(goal.id);
        if (acm.length > 0) acmStats.push(acm);
    }
    res.json(acmStats);
});

module.exports = router;