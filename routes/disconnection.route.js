const express = require('express');
const router = express.Router();
const hasToBeAuthenticated = require('../middlewares/hasToBeAuthenticated');

router.delete('/', hasToBeAuthenticated, async(req,res) => {
    req.session.authenticated = false;
});

module.exports = router;