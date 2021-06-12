const express = require('express');
const router = express.Router();
const Goal = require('../models/goal.model');
const hasToBeAuthenticated = require('../middlewares/hasToBeAuthenticated');

router.get('/', hasToBeAuthenticated, async(req,res) => {
    const goals = await Goal.getGoals(req.session.credentials.user_id);
    res.json(goals);
});

router.post('/', hasToBeAuthenticated, async(req, res) => {
    req.session.goal_id = req.body.goal_id;
    console.log(req.session.goal_id);
    res.send('Identifiant de l\'objectif stocké');
});

module.exports = router;