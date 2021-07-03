const express = require('express');
const router = express.Router();
const DailyContent = require('../models/dailycontent.model');
const hasToBeAuthenticated = require('../middlewares/hasToBeAuthenticated');
const Achievement = require('../models/achievement.model');
const Challenge = require('../models/challenge.model');
const GoalDailyContent = require('../models/goal_dailycontent.model');
const Goal = require('../models/goal.model');

router.post('/', hasToBeAuthenticated, async(req,res) => {
    if(req.body.goal_id){
        req.session.goal_id = req.body.goal_id;
        const retrieveContent = await DailyContent.retrieve(req.body.goal_id);
        content = retrieveContent.find(content => !content.validated);
        const theme = await Challenge.getByGoalId(req.body.goal_id);
        const id = await Goal.getDifficultyId(req.body.goal_id);
        const countDailyContent = await DailyContent.countDailyContent(id.difficulty_id);
        if (content) res.status(200).json({ content: content, theme: theme.theme, count: countDailyContent});
        else res.send('Félicitations, vous avez accompli votre objectif !');
    } else {
        const retrieveContent = await DailyContent.retrieve(req.session.goal_id);
        content = retrieveContent.find(content => !content.validated);
        const theme = await Challenge.getByGoalId(req.session.goal_id);
        const id = await Goal.getDifficultyId(req.session.goal_id);
        const countDailyContent = await DailyContent.countDailyContent(id.difficulty_id);
        if (content) res.status(200).json({ content: content, theme: theme.theme, count: countDailyContent});
        else res.send('Félicitations, vous avez accompli votre objectif !');
    }

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

router.post('/daily', hasToBeAuthenticated, async(req,res) => {
    const { difficulty_id } = req.body;
    const dailycontent = await DailyContent.getAllFormId(difficulty_id);
    res.json(dailycontent);
})

module.exports = router;