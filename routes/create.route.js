const express = require('express');
const Theme = require('../models/challenge.model');
const DailyContent = require('../models/dailycontent.model');
const hasToBeAuthenticated = require('../middlewares/hasToBeAuthenticated');
const Activity = require('../models/activity.model');
const Challenge = require('../models/challenge.model');
const Difficulty = require ('../models/difficulty.model')
const router = express.Router();

router.get('/', hasToBeAuthenticated, async(req, res) => {
   const theme = await Theme.showOptions();
   res.json(theme);
});

router.post('/dailycontent', hasToBeAuthenticated, async (req,res) => {
    const { content, gif, difficulty_id} = req.body;
    const index = await DailyContent.getAllFormId(difficulty_id);
    const order_max = index.length+1;
    await DailyContent.create(content, gif, order_max, difficulty_id)
});

router.post('/newchallenge', hasToBeAuthenticated, async(req,res) => {
    const { typeDifficulty, gif, duree, titleDifficulty, titleChallenge, activity, author_id } = req.body;
    const { id: activity_id } = await Activity.getByName(activity);
    await Challenge.create(titleChallenge, author_id, activity_id);
    const challenge_id = await Challenge.getByChallengeTitle(titleChallenge);
    await Difficulty.create(1, titleDifficulty, gif, duree, typeDifficulty, challenge_id[0].id);
});

module.exports = router;