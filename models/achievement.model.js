const PostgresClient = require('../services/PostgresClient');
const Difficulty = require('./difficulty.model');
const Goal = require('./goal.model');

class Achievement {

    /**@type {Number} */
    id;
    /**@type {Date} */
    created_at;
    /**@type {Number} */
    goal_id;
    /**@type {JSON} */
    achievement;

    /**
     * @param {Number} goal_id
     * @returns {Promise<Achievement>}
     */
    static async getByGoalId(goal_id) {
        const text = `
            SELECT achievement, created_at, title FROM ${Achievement.tableName} 
            INNER JOIN ${Goal.tableName} 
                ON ${Achievement.tableName}.goal_id = ${Goal.tableName}.id
            INNER JOIN ${Difficulty.tableName} 
                ON ${Goal.tableName}.difficulty_id = ${Difficulty.tableName}.id
            WHERE goal_id = $1
            ORDER BY created_at ASC;
        `;
        const value = [goal_id];
        const res = await PostgresClient.client.query(text, value);
        return res.rows;
    }

    /**
     * @param {Number} goal_id
     * @param {JSON} achievement
     */
    static async create(goal_id, achievement) {
        const text = `INSERT INTO ${Achievement.tableName}(goal_id, achievement) 
            VALUES($1, $2)`;
        const values = [goal_id, achievement];
        await PostgresClient.client.query(text, values);
    }

    static toSQLTable() {
        return `
            CREATE TABLE ${Achievement.tableName} (
                id SERIAL PRIMARY KEY,
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                goal_id INTEGER NOT NULL,
                achievement JSON,
                CONSTRAINT fk_goal_id
                    FOREIGN KEY(goal_id)
                        REFERENCES goal(id) ON DELETE CASCADE
            );
        `;
    }
}

Achievement.tableName = 'achievement';
module.exports = Achievement;