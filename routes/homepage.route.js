const express = require('express');
const router = express.Router();
const Goal = require('../models/goal.model');

router.get('/', async(req,res) => {
    const goals = await Goal.getGoals(req.session.user_id);
    res.json(goals);
})

module.exports = router;