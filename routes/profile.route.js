const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const hasToBeAuthenticated = require('../middlewares/hasToBeAuthenticated');
const bcrypt = require('bcrypt');


router.get('/', hasToBeAuthenticated, async(req,res) => {
    res.json(req.session.credentials);
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
    res.status(308).send('Informations mises à jour');
});

router.put('/editPassword', async(req,res) => {

    const { oldPassword, newPassword, confirmPassword, emailsession} = req.body;

    if (oldPassword && newPassword && confirmPassword !== undefined) {
        const credentials = await User.findByEmail(emailsession);
        if (credentials) {    
            const isMatch = await bcrypt.compare(oldPassword, credentials.password);
            if (isMatch) {
                if (newPassword === confirmPassword) {
                    const hashPassword = await bcrypt.hash(newPassword,10);
                    await User.updatePassword(emailsession, hashPassword);
                    res.status(308).send('Mot de passe mis à jour');
                } else {
                    res.status(403).json({ msg: 'Les deux mots de passe ne correspondent pas.' });
                }
            } else {
                res.status(403).json({ msg: 'Mot de passe erroné.' });
            }
        } else {
            res.status(403);
        }
    }
    
});

module.exports = router;