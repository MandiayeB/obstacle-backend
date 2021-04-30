const PostgresClient = require('../PostgresClient');
const Activity = require('./activity.model');
const Challenge = require('./challenge.model');
const Difficulty = require('./difficulty.model');
const Theme = require('./theme.model');
const User = require('./user.model.js');

class Goal {

    /**@type {Number} */
    id;
    /**@type {Date} */
    creation_date;
    /**@type {Date} */
    supposed_end_date;
    /**@type {Number} */
    user_id;
    /**@type {Number} */
    difficulty_id;

    /**
     * @param {Date} creation_date
     * @param {Date} supposed_end_date
     * @param {Number} user_id
     * @param {Number} difficulty_id
     */
    static async create(creation_date, supposed_end_date, user_id, difficulty_id) {
        const text = `INSERT INTO ${Goal.tableName}
            (creation_date, supposed_end_date, user_id, difficulty_id) 
            VALUES(to_timestamp($1/1000.0), to_timestamp($2/1000.0), $3, $4)`;
        const values = [creation_date, supposed_end_date, user_id, difficulty_id];
        const res = await PostgresClient.client.query(text, values);
        console.log('Objectif enregistré !');
    }

    static async getGoals(user_id) {
        const res = await PostgresClient.client.query(
            `SELECT ${Goal.tableName}.id, ${Goal.tableName}.creation_date,
            ${Goal.tableName}.supposed_end_date, ${Difficulty.tableName}.title, ${Challenge.tableName}.challenge,
            ${Activity.tableName}.activity, ${Theme.tableName}.theme, ${User.tableName}.firstname AS author_firstname,
            ${User.tableName}.lastname AS author_lastname FROM ${Goal.tableName}
            INNER JOIN ${Difficulty.tableName} ON ${Goal.tableName}.difficulty_id = ${Difficulty.tableName}.id
            INNER JOIN ${Challenge.tableName} ON ${Difficulty.tableName}.challenge_id = ${Challenge.tableName}.id
            INNER JOIN ${Activity.tableName} ON ${Challenge.tableName}.activity_id = ${Activity.tableName}.id
            INNER JOIN ${Theme.tableName} ON ${Activity.tableName}.theme_id = ${Theme.tableName}.id
            INNER JOIN ${User.tableName} ON ${Goal.tableName}.user_id = ${User.tableName}.id
            WHERE user_id = $1`,
        [user_id]);
        return res.rows;
    }

    static toSQLTable() {
        return `
            CREATE TABLE ${Goal.tableName} (
                id SERIAL PRIMARY KEY,
                creation_date TIMESTAMP,
                supposed_end_date TIMESTAMP,
                user_id INTEGER,
                difficulty_id INTEGER,
                CONSTRAINT fk_user_id
                    FOREIGN KEY(user_id)
                        REFERENCES users(id),
                CONSTRAINT fk_difficulty_id
                    FOREIGN KEY(difficulty_id)
                        REFERENCES difficulty(id)
            );
        `;
    }
}
Goal.tableName = 'goal';
module.exports = Goal;