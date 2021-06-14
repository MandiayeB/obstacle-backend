const PostgresClient = require('../PostgresClient');
const Difficulty = require('./difficulty.model');

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
     * @returns {Promise<Goal>}
     */
    static async create(creation_date, supposed_end_date, user_id, difficulty_id) {
        const text = `INSERT INTO ${Goal.tableName}
            (creation_date, supposed_end_date, user_id, difficulty_id) 
            VALUES(to_timestamp($1/1000.0), to_timestamp($2/1000.0), $3, $4)
            RETURNING id, difficulty_id`;
        const values = [creation_date, supposed_end_date, user_id, difficulty_id];
        const res = await PostgresClient.client.query(text, values);
        return res.rows[0];
    }

    /**
     * @param {Number} userId
     * @returns {Promise<Goal>}
     */
    static async getGoals(user_id) {
        const res = await PostgresClient.client.query(
            `SELECT ${Goal.tableName}.id, ${Difficulty.tableName}.title,
            ${Difficulty.tableName}.image 
            FROM ${Goal.tableName}
            INNER JOIN ${Difficulty.tableName} 
            ON ${Goal.tableName}.difficulty_id = ${Difficulty.tableName}.id
            WHERE user_id = $1`,
            [user_id]
        );
        return res.rows;
    }

    /**
     * @param {Number} goal_id
     */
    static async getDifficultyId(goal_id){
        const res = await PostgresClient.client.query(
            `SELECT difficulty_id
            FROM ${Goal.tableName}
            WHERE ${Goal.tableName}.id = $1 `, 
            [goal_id]
        );
        return res.rows[0];
    }
    /**
     * @param {Number} userId
     * @param {Number} difficulty_id
     * @returns {Promise<Goal>}
     */
     static async checkExistingGoals(user_id, difficulty_id) {
        const res = await PostgresClient.client.query(
            `SELECT * FROM ${Goal.tableName} 
            WHERE user_id = $1 
            AND difficulty_id = $2`, 
            [user_id, difficulty_id]
        );
        return res.rows[0];
    }

    /**
     * @param {Number} goal_id
     */
    static async delete(goal_id) {
        const { title } = await this.getGoals(userId);
        const res = await PostgresClient.client.query(`
            DELETE FROM ${Goal.tableName} WHERE id = $1`, [goal_id]
        );
        console.log(`L'objectif ${title} a été supprimé`);
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