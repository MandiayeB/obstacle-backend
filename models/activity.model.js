const PostgresClient = require('../PostgresClient');

class Activity {

    /**@type {Number} */
    id;
    /**@type {String} */
    activity;
    /**@type {Number} */
    theme_id;

    /**
     * @param {String} activity
     * @param {StrNumbering} theme_id
     */
     static async create(activity, theme_id) {

        const text = `INSERT INTO ${Activity.tableName}(activity, theme_id) VALUES($1, $2)`;
        const values = [activity, theme_id];
        const res = await PostgresClient.client.query(text, values);
        console.log('Activité enregistrée !');
    }

    static toSQLTable() {
        return `
            CREATE TABLE ${Activity.tableName} (
                id SERIAL PRIMARY KEY,
                activity VARCHAR(255),
                theme_id INTEGER,
                CONSTRAINT fk_theme_id
                    FOREIGN KEY(theme_id)
                        REFERENCES theme(id)
            );
        `;
    }
}
Activity.tableName = 'activity';
module.exports = Activity;