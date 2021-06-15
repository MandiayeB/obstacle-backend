const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const hasToBeAuthenticated = require('../middlewares/hasToBeAuthenticated');
const bcrypt = require('bcrypt');

router.get('/', hasToBeAuthenticated, async(req,res) => {
    res.json(req.session.credentials);
});

router.put('/editCredentials', async(req,res) => {

    const { firstname, lastname, email, emailsession, picture} = req.body;
        console.log(picture);
    
        if(firstname) {
            const put_name = await User.updateName(emailsession, firstname);
        }   
        if(lastname) {
            const put_lastName = await User.updateLastName(emailsession, lastname);
        }  
        if(email){
            const put_email = await User.updateEmail(emailsession, email);
        }
        if(picture){
            const put_picture = await User.updatePicture(emailsession, picture);
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
                    const update_password = await User.updatePassword(emailsession, hashPassword);
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