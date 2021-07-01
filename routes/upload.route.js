const express = require('express');
const router = express.Router();
const fs = require('fs');
const User = require('../models/user.model');
const hasToBeAuthenticated = require('../middlewares/hasToBeAuthenticated');
const { upload, multer } = require('../scripts/multer-config');
const deleteFile = require('../scripts/deleteFile');
const port = process.env.PORT || 3000;

router.put('/', hasToBeAuthenticated, async(req, res) =>{
    let error = false;
    upload(req, res, async(err) => {
        if (err instanceof multer.MulterError) {
            res.send(err);
            error = true;
        } else if (err) {
            res.send(err);
            error = true;
        }
        if (!error) {
            const picture = req.file.filename;
            await deleteFile(picture);
            const emailsession = req.session.email;
            await User.uploadPicture(emailsession, picture);
            res.status(201).json({ 
                url: (process.env.PORT ? `http://localhost:${port}` : `https://obstacle-backend.herokuapp.com`) + `/pictures/${picture}` 
            });
        } else {
            res.status(501).json({ msg: 'Le serveur ne peut pas stocker cette image.'})
        }
    })
});

module.exports = router;