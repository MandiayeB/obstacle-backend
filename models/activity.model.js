const PostgresClient = require('../PostgresClient');

class Activity {

    /**@type {Number} */
    id;
    /**@type {String} */
    name;
    /**@type {Number} */
    theme_id;

    /**
     * @param {String} name
     * @param {StrNumbering} theme_id
     */
     static async create(name, theme_id) {

        const text = `INSERT INTO ${Activity.tableName}(name, theme_id) VALUES($1, $2)`;
        const values = [name, theme_id];
        await PostgresClient.client.query(text, values);
    }

    
    /**
     * @param {String} name
     */

    static async getByName (name) {
        const text = `SELECT id FROM ${Activity.tableName} WHERE name = $1`;
        const value = [name[0]];
        const res = await PostgresClient.client.query(text, value);
        return res.rows[0];

    }

    static toSQLTable() {
        return `
            CREATE TABLE ${Activity.tableName} (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                theme_id INTEGER NOT NULL,
                CONSTRAINT fk_theme_id
                    FOREIGN KEY(theme_id)
                        REFERENCES theme(id) ON DELETE CASCADE
            );
        `;
    }
}

Activity.tableName = 'activity';
module.exports = Activity;