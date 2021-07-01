const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const hasToBeAuthenticated = require('../middlewares/hasToBeAuthenticated');
const { upload, storage, multer } = require('../middlewares/multer-config');

router.put('/', hasToBeAuthenticated, async(req, res) =>{
    let error = false;
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            res.send(err);
            error = true;
        } else if (err) {
            res.send(err);
            error = true;
        }
        if (!error) {
            const picture = req.file.filename;
            const emailsession = req.session.email;
            await User.uploadPicture(emailsession, picture);
            res.status(201).json({ 
                url: process.env.PG_CUSTOM_ORIGIN || `https://obstacle-backend.herokuapp.com` + `/pictures/${picture}` 
            });
        } else {
            res.status(501).json({ msg: 'Le serveur ne peut pas stocker cette image.'})
        }
    })
});

module.exports = router;