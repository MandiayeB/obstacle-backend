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

router.post('/difficulty', hasToBeAuthenticated, async(req, res) => {
    const { challenge } = req.body;
    const challengeId = await Challenge.getByChallengeTitle(challenge[0]);
    const difficulty = await Difficulty.getByChallengeId(challengeId.id);
    res.json(difficulty);
})


router.post('/mychallenge', hasToBeAuthenticated, async(req, res) => {
    const { author } = req.body;
    const theme = await Theme.getByAuthor(author);
    res.json(theme);
});

router.post('/dailycontent', hasToBeAuthenticated, async (req,res) => {
    const { content, gif, difficulty_id, textyoutube, youtube } = req.body;
    let urlYoutube="https://www.youtube.com/embed/";
    let watch = youtube.indexOf("watch?v=");
    if(watch !== -1){
        embed = youtube.split('watch?v=');
        let list = embed[1].indexOf("&list");
        if(list !== -1) {
            embed = embed[1].split('&list');
            embed = urlYoutube+embed[0];
        } else { 
            embed = urlYoutube+embed[1];
        }
    } else{
        embed = youtube.split('youtu.be/')
        embed = embed[1].split('?');
        embed = urlYoutube+embed[0];
    }
    const index = await DailyContent.getAllFormId(difficulty_id);
    const order_max = index.length+1;
    let id_difficulty = parseInt(difficulty_id);
    let guide = '{"guide1": { "url": "'+embed+'", "text": "'+textyoutube+' :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}';
    await DailyContent.create(content, gif, guide, order_max, id_difficulty);
    const length = await Difficulty.getById(id_difficulty);
    await Difficulty.UpdateLength(length.length+1, id_difficulty);
    
});


router.post('/update', hasToBeAuthenticated, async (req,res) => {
    const { id, content, gif } = req.body;
    await DailyContent.updateDaily(content, gif, id);
})

router.post('/newchallenge', hasToBeAuthenticated, async(req,res) => {
    const { typeDifficulty, gif, titleDifficulty, titleChallenge, activity, author_id } = req.body;
    const { id: activity_id } = await Activity.getByName(activity);
    await Challenge.create(titleChallenge, author_id, activity_id);
    const challenge_id = await Challenge.getByChallengeTitle(titleChallenge);
    await Difficulty.create(1, titleDifficulty, gif, 0, typeDifficulty, challenge_id.id);
});

module.exports = router;