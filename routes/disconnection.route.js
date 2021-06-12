const express = require('express');
const router = express.Router();
const hasToBeAuthenticated = require('../middlewares/hasToBeAuthenticated');

router.delete('/', hasToBeAuthenticated, async(req,res) => {
    req.session.authenticated = false;
    res.json(req.session.authenticated);
});

module.exports = router;