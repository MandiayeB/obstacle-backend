const express = require('express');
const router = express.Router();
const Goal = require('../models/goal.model');
const Challenge = require('../models/challenge.model');
const hasToBeAuthenticated = require('../middlewares/hasToBeAuthenticated');
const Difficulty = require('../models/difficulty.model');
const GoalDailyContent = require('../models/goal_dailycontent.model');
const DailyContent = require('../models/dailycontent.model');


router.get('/', hasToBeAuthenticated, async(req,res) => {
    const show_options = await Challenge.showOptions();
    res.json(show_options);
});

router.post('/', hasToBeAuthenticated, async(req,res) => {
    const checkExistingGoals = await Goal.checkExistingGoals(
        req.session.credentials.user_id,
        req.body.difficulty_id
    );
    if (!checkExistingGoals) {
        const create_goal = await Goal.create(
            req.body.creation_date,
            req.body.supposed_end_date,
            req.session.credentials.user_id,
            req.body.difficulty_id
        );
        const { id, length } = await Difficulty.getById(create_goal.difficulty_id);
        const dailyCts = await DailyContent.getByDiffId(id);
        for (let i = 0; i < length; i++) {
            await GoalDailyContent.create(false, create_goal.id, dailyCts[i].id);
        }
        res.status(204);
    } else {
        res.status(403).json({ msg : 'You have already created a goal with this difficulty' });
    }
});

router.delete('/', hasToBeAuthenticated, async(req,res) => {
    const delete_goal = await Goal.delete(req.body.goal_id);
    res.json(delete_goal);
});

module.exports = router;