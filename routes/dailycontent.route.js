const express = require('express');
const router = express.Router();
const DailyContent = require('../models/dailycontent.model');
const hasToBeAuthenticated = require('../middlewares/hasToBeAuthenticated');
const Achievement = require('../models/achievement.model');
const Theme = require('../models/theme.model');

router.get('/', hasToBeAuthenticated, async(req,res) => {
    const retrieveContent = await DailyContent.retrieve(req.session.goal_id);
    content = retrieveContent.find(content => !content.validated);
    if (content) res.json(content);
    else res.send('Félicitations, vous avez accompli votre objectif !');
});

router.post('/achievement', hasToBeAuthenticated, async(req,res) => {
    const { theme: type } = Theme.getByGoalId(req.session.goal_id);
    const acm = {
        "theme": {
            "type": type,
            "fields": req.body.fields
        }
    };
    const createAchievement = await Achievement.create(req.session.goal_id, acm);
    res.send('Achievement registered.');
});

module.exports = router;