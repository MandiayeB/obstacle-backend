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
        const res = await PostgresClient.client.query(text, values);
        console.log('Activité enregistrée !');
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