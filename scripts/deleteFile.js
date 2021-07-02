const fs = require('fs');

async function deleteFile(file) {
    const pattern = file.slice(0, 13);
    const dir = await fs.promises.opendir('./pictures');
    for await (const picture of dir) {
        if (picture.name.includes(pattern) && picture.name !== file) {
            await fs.unlink('./pictures/' + picture.name, (err) => {
                if (err) console.error(err);
            });
        }
    }
}

module.exports = deleteFile;