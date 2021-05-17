const PostgresClient = require('../PostgresClient');
const Theme = require('./theme.model');
const Activity = require('./activity.model');
const Difficulty = require('./difficulty.model');

class Challenge {

    /**@type {Number} */
    id;
    /**@type {String} */
    name;
    /**@type {Number} */
    author;
    /**@type {Number} */
    activity_id;

    /**
     * @param {String} name
     * @param {Number} author
     * @param {Number} activity_id
     */
     static async create(name, author, activity_id) {

        const text = `INSERT INTO ${Challenge.tableName}(name, author, activity_id) 
            VALUES($1, $2, $3)`;
        const values = [name, author, activity_id];
        const res = await PostgresClient.client.query(text, values);
        console.log('Challenge enregistré !');
    }

    /**
     * @returns {Promise<Challenge>}
     */
    static async showOptions() {
        const res = await PostgresClient.client.query(`
            SELECT
                (SELECT json_agg(json_build_object(
                    'name', ${Theme.tableName}.name,
                    'activity', (SELECT json_agg(json_build_object(
                        'name', ${Activity.tableName}.name,
                        'challenge', (SELECT json_agg(json_build_object(
                            'name', ${Challenge.tableName}.name,
                            'difficulty', (SELECT json_agg(json_build_object(
                                'id', ${Difficulty.tableName}.id,
                                'level', ${Difficulty.tableName}.level, 
                                'title', ${Difficulty.tableName}.title, 
                                'image', ${Difficulty.tableName}.image, 
                                'length', ${Difficulty.tableName}.length,
                                'difficulty', ${Difficulty.tableName}.difficulty
                            )) FROM ${Difficulty.tableName})
                        )) FROM ${Challenge.tableName})
                    )) FROM ${Activity.tableName})
                )) AS theme FROM ${Theme.tableName})

            FROM ${Challenge.tableName}

            INNER JOIN ${Difficulty.tableName} ON ${Challenge.tableName}.id = ${Difficulty.tableName}.challenge_id
            INNER JOIN ${Activity.tableName} ON ${Challenge.tableName}.activity_id = ${Activity.tableName}.id
            INNER JOIN ${Theme.tableName} ON ${Activity.tableName}.theme_id = ${Theme.tableName}.id
        `);
        return res.rows[0].theme;
    }

    static toSQLTable() {
        return `
            CREATE TABLE ${Challenge.tableName} (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                author INTEGER,
                activity_id INTEGER,
                CONSTRAINT fk_author
                    FOREIGN KEY(author)
                        REFERENCES users(id),
                CONSTRAINT fk_activity_id
                    FOREIGN KEY(activity_id)
                        REFERENCES activity(id)
            );
        `;
    }
}
Challenge.tableName = 'challenge';
module.exports = Challenge;