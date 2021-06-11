const PostgresClient = require('../PostgresClient');
const Activity = require('./activity.model');
const Challenge = require('./challenge.model');
const Difficulty = require('./difficulty.model');
const Goal = require('./goal.model');

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
        const res = await PostgresClient.client.query(text, values);
        console.log('Thème enregistré !');
    }

    /**
     * @param {Number} goal_id
     * @returns {Promise<Theme>}
     */
     static async getByGoalId(goal_id) {
        const res = await PostgresClient.client.query(
            `SELECT ${Theme.tableName}.name AS theme, 
            FROM ${Theme.tableName}
            INNER JOIN ${Activity.tableName} 
                ON ${Theme.tableName}.id = ${Activity.tableName}.theme_id
            INNER JOIN ${Challenge.tableName} 
                ON ${Activity.tableName}.id = ${Challenge.tableName}.activity_id
            INNER JOIN ${Difficulty.tableName} 
                ON ${Challenge.tableName}.id = ${Difficulty.tableName}.challenge_id
            INNER JOIN ${Goal.tableName} 
                ON ${Difficulty.tableName}.id = ${Goal.tableName}.difficulty_id
            WHERE goal_id = $1`,
        [goal_id]);
        return res.rows[0];
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