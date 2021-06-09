const express = require('express');
const router = express.Router();
const DailyContent = require('../models/dailycontent.model');
const hasToBeAuthenticated = require('../middlewares/hasToBeAuthenticated');

router.get('/', hasToBeAuthenticated, async(req,res) => {
    const retrieveContent = await DailyContent.retrieve(req.session.goal_id);
    content = retrieveContent.find(content => !content.validated);
    if (content) res.json(content);
    else res.send('Félicitations, vous avez accompli votre objectif !');
});

module.exports = router;