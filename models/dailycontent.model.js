const PostgresClient = require('../PostgresClient');
const Goal = require('./goal.model');
const GoalDailyContent = require('./goal_dailycontent.model');

class DailyContent {

    /**@type {Number} */
    id;
    /**@type {String} */
    content;
    /**@type {Number} */
    order;
    /**@type {Number} */
    difficulty_id;

    /**
     * @param {String} content
     * @param {Number} order
     * @param {Number} difficulty_id
     */
     static async create(content, order, difficulty_id) {
        const text = `INSERT INTO ${DailyContent.tableName}(content, order_index, difficulty_id) 
            VALUES($1, $2, $3)`;
        const values = [content, order, difficulty_id];
        const res = await PostgresClient.client.query(text, values);
        console.log('Défi journalier enregistré !');
    }

    /**
     * @param {Number} goal_id
     * @returns {Promise<DailyContent>}
     */
     static async retrieve(goal_id) {
        const res = await PostgresClient.client.query(
            `SELECT ${GoalDailyContent.tableName}.id AS gdc_id, validated, content 
            FROM ${GoalDailyContent.tableName} 
            INNER JOIN ${Goal.tableName} 
                on ${GoalDailyContent.tableName}.goal_id = ${Goal.tableName}.id
            INNER JOIN ${DailyContent.tableName} 
                on ${GoalDailyContent.tableName}.dailycontent_id = ${DailyContent.tableName}.id
            WHERE goal_id = $1
            ORDER BY order_index`
        ,[goal_id]);
        return res.rows;
    }

    /**
     * @param {Number} id
     * @returns {Promise<DailyContent>}
     */
    static async getByDiffId(id) {
        const res = await PostgresClient.client.query(`SELECT id FROM ${DailyContent.tableName} WHERE difficulty_id = $1`, [id]);
        return res.rows;
    }

    static toSQLTable() {
        return `
            CREATE TABLE ${DailyContent.tableName} (
                id SERIAL PRIMARY KEY,
                content TEXT,
                order_index INTEGER,
                difficulty_id INTEGER,
                CONSTRAINT fk_difficulty_id
                    FOREIGN KEY(difficulty_id)
                        REFERENCES difficulty(id)
            );
        `;
    }
}
DailyContent.tableName = 'dailycontent';
module.exports = DailyContent;