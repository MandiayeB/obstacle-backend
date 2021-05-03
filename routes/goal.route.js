const express = require('express');
const router = express.Router();
const Goal = require('../models/goal.model');

router.post('/create', async(req,res) => {
    const create_goal = await Goal.create(
        req.body.creation_date, 
        req.body.supposed_end_date, 
        req.body.user_id, 
        req.body.difficulty_id
    );
    res.json(create_goal);
});

router.delete('/goal', async(req,res) => {
    const delete_goal = await Goal.delete(req.body.goal_id);
    res.json(delete_goal);
});

module.exports = router;