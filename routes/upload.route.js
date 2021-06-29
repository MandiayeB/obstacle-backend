const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const hasToBeAuthenticated = require('../middlewares/hasToBeAuthenticated');
const { upload, storage, multer } = require('../middlewares/multer-config');

router.put('/', hasToBeAuthenticated, async(req, res) =>{
    let error = false;
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          res.send(err);
          error = true;
        } else if (err) {
          // An unknown error occurred when uploading.
          res.send(err);
          error = true;
        }
        if (error == false){
            const picture = req.file.filename;
            const emailsession = req.session.email;
            const uploadPicture = await User.uploadPicture(emailsession, picture);
            res.status(201).json({ url: `http://localhost:3000/pictures/${picture}` });
        } else {
            res.status(501).json({ msg: 'Le serveur ne peut pas stocker cette image.'})
        }
    })
});

module.exports = router;