const express = require('express');
const Activity = require('../models/activity.model');
const Theme = require('../models/challenge.model');
const router = express.Router();

router.get('/', async(req, res) => {
   const theme = await Theme.showOptions();
   res.json(theme);
});

router.post('/', async(req, res) => {
    const { theme, typeDifficulty, gif, duree, titleDifficulty, titleChallenge, activiter } = req.body;

    console.log(theme+typeDifficulty+gif+duree+titleChallenge+titleDifficulty+activiter);
 
});

module.exports = router;