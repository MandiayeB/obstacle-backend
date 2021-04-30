const express = require('express');
const router = express.Router();
const Goal = require('../models/goal.model');

router.get('/', async(req,res) => {
    const goals = await Goal.getGoals(1);
    res.json(goals);
})

module.exports = router;