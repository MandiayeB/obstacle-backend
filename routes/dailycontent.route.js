const express = require('express');
const router = express.Router();
const DailyContent = require('../models/dailycontent.model');
const hasToBeAuthenticated = require('../middlewares/hasToBeAuthenticated');
const Achievement = require('../models/achievement.model');
const Challenge = require('../models/challenge.model');
const GoalDailyContent = require('../models/goal_dailycontent.model');

router.post('/', hasToBeAuthenticated, async(req,res) => {
    const retrieveContent = await DailyContent.retrieve(req.body.goal_id);
    content = retrieveContent.find(content => !content.validated);
    const theme = await Challenge.getByGoalId(req.body.goal_id);
    if (content) res.status(200).json({ content: content, theme: theme.theme });
    else res.send('Félicitations, vous avez accompli votre objectif !');
});

router.post('/achievement', hasToBeAuthenticated, async(req,res) => {
    await GoalDailyContent.validate(req.body.gdc_id);
    const acm = {
        "theme": {
            "name": req.body.theme,
            "fields": req.body.fields
        }
    };
    await Achievement.create(req.body.goal_id, acm);
    res.status(200).send('Achievement registered.');
});

module.exports = router;