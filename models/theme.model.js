const PostgresClient = require('../PostgresClient');

class Theme {

    /**@type {Number} */
    id;
    /**@type {String} */
    theme;

    /**
     * @param {String} theme
     */
     static async create(theme) {

        const text = `INSERT INTO ${Theme.tableName}(theme) VALUES($1)`;
        const values = [theme];
        const res = await PostgresClient.client.query(text, values);
        console.log('Thème enregistré !');
    }

    static toSQLTable() {
        return `
            CREATE TABLE ${Theme.tableName} (
                id SERIAL PRIMARY KEY,
                theme VARCHAR(255)
            );
        `;
    }
}
Theme.tableName = 'theme';
module.exports = Theme;