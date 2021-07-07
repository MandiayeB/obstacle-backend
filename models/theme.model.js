const PostgresClient = require('../services/PostgresClient');


class Theme {

    /**@type {Number} */
    id;
    /**@type {String} */
    name;

    /**
     * @param {String} name
     */
    static async create(name) {

        const text = `INSERT INTO ${Theme.tableName}(name) VALUES($1)`;
        const values = [name];
        await PostgresClient.client.query(text, values);
    }

    static toSQLTable() {
        return `
            CREATE TABLE ${Theme.tableName} (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255)
            );
        `;
    }
}

Theme.tableName = 'theme';
module.exports = Theme;