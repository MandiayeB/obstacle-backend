const express = require('express');
const Theme = require('../models/challenge.model');
const DailyContent = require('../models/dailycontent.model');
const hasToBeAuthenticated = require('../middlewares/hasToBeAuthenticated');
const router = express.Router();

router.get('/', hasToBeAuthenticated, async(req, res) => {
   const theme = await Theme.showOptions();
   res.json(theme);
});

router.post('/dailycontent', hasToBeAuthenticated, async (req,res) => {
    const { difficulty_id } = req.body;
    console.log(req.body);
    const dailycontent = await DailyContent.getByDiffId(difficulty_id); //A CHANGER
    res.json(dailycontent)
})

router.post('/',  hasToBeAuthenticated, async(req, res) => {
    const { theme, typeDifficulty, gif, duree, titleDifficulty, titleChallenge, activiter } = req.body;

    console.log(theme+typeDifficulty+gif+duree+titleChallenge+titleDifficulty+activiter);
 
});

module.exports = router;