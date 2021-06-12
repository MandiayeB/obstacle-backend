const express = require('express');
const router = express.Router();
const DailyContent = require('../models/dailycontent.model');
const hasToBeAuthenticated = require('../middlewares/hasToBeAuthenticated');
const Achievement = require('../models/achievement.model');
const Theme = require('../models/theme.model');
const Challenge = require('../models/challenge.model');

router.get('/', hasToBeAuthenticated, async(req,res) => {
    const retrieveContent = await DailyContent.retrieve(req.session.goal_id);
    console.log(req.session.goal_id);
    content = retrieveContent.find(content => !content.validated);
    const theme = await Challenge.getByGoalId(req.session.goal_id);
    if (content) res.status(200).json({ content: content, theme: theme.theme });
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