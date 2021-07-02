const fs = require('fs');
const User = require('../models/user.model');

async function deleteFile(email, file) {
    const { picture } = await User.getPicture(email);
    if (picture) {
        const dir = await fs.promises.opendir('./pictures');
        for await (const image of dir) {
            if (image.name === picture && image.name !== file && image.name !== 'defaultProfilePicture.jpg') {
                await fs.unlink('./pictures/' + image.name, (err) => {
                    if (err) console.error(err);
                });
            }
        }
    }
}

module.exports = deleteFile;