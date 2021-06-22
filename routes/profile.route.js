const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const hasToBeAuthenticated = require('../middlewares/hasToBeAuthenticated');
const { upload, storage, multer } = require('../middlewares/multer-config');
const bcrypt = require('bcrypt');


router.get('/', hasToBeAuthenticated, async(req,res) => {
    res.json(req.session.credentials);
});

router.post('/', async(req, res) =>{
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          res.send(err);
        } else if (err) {
          // An unknown error occurred when uploading.
          res.send(err);
        }
        const picture = req.file.filename;
        console.log(picture);
    })
    // const { picture } = req.body;
    
    // const uploadPicture = await User.uploadPicture(emailsession, picture);
    // res.status(201).json({ msg: 'L\image à été stockée' });
});

router.put('/editCredentials', async(req,res) => {

    const { firstname, lastname, email, emailsession} = req.body;
    
        if (firstname) {
            await User.updateName(emailsession, firstname);
        }   
        if (lastname) {
            await User.updateLastName(emailsession, lastname);
        }  
        if (email) {
            await User.updateEmail(emailsession, email);
        }
        res.status(308).json({ msg: 'Redirection vers Profile' });

});
router.put('/editPassword', async(req,res) => {

    const { oldPassword, newPassword, confirmPassword, emailsession} = req.body;

    if(oldPassword && newPassword && confirmPassword !== undefined) {
        const credentials = await User.findByEmail(emailsession);
        if(credentials){    
            const isMatch = await bcrypt.compare(oldPassword, credentials.password);
            if(isMatch){
                if(newPassword === confirmPassword){
                    const hashPassword = await bcrypt.hash(newPassword,10);
                    await User.updatePassword(emailsession, hashPassword);
                    res.status(308).json({ msg: 'Redirection vers Profile' });
                } else {
                    res.status(403).json({ msg: 'Les deux mot de passe ne sont pas identique' });
                }
            } else {
                res.status(403).json({ msg: 'L ancien mot de passe n est pas correct' });
            }
        } else {
            res.status(403).json({ msg: 'J ai pas trouver ton adresse mail dans la BD' });
        }
    }
    
});

module.exports = router;