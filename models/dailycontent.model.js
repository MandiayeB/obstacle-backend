const PostgresClient = require('../PostgresClient');
const Goal = require('./goal.model');
const GoalDailyContent = require('./goal_dailycontent.model');

class DailyContent {

    /**@type {Number} */
    id;
    /**@type {String} */
    content;
    /**@type {String} */
    image;
    /**@type {Number} */
    order;
    /**@type {Number} */
    difficulty_id;

    /**
     * @param {String} content
     * @param {String} image
     * @param {Number} order
     * @param {Number} difficulty_id
     */
     static async create(content, image, order, difficulty_id) {
        const text = `INSERT INTO ${DailyContent.tableName}(content, image, order_index, difficulty_id) 
            VALUES($1, $2, $3, $4)`;
        const values = [content, image, order, difficulty_id];
        const res = await PostgresClient.client.query(text, values);
        console.log('Défi journalier enregistré !');
    }

    /**
     * @param {Number} goal_id
     * @returns {Promise<DailyContent>}
     */
     static async retrieve(goal_id) {
        const res = await PostgresClient.client.query(
            `SELECT ${GoalDailyContent.tableName}.id AS gdc_id, validated, content, image, order_index 
            FROM ${GoalDailyContent.tableName} 
            INNER JOIN ${Goal.tableName} 
                on ${GoalDailyContent.tableName}.goal_id = ${Goal.tableName}.id
            INNER JOIN ${DailyContent.tableName} 
                on ${GoalDailyContent.tableName}.dailycontent_id = ${DailyContent.tableName}.id
            WHERE ${Goal.tableName}.id = $1
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

    /**
     * @param {Number} difficulty_id
     */
    static async countDailyContent(difficulty_id){
        const res = await PostgresClient.client.query(`
            SELECT COUNT(*)
            FROM ${DailyContent.tableName}
            WHERE difficulty_id = $1`,
            [difficulty_id]
        );
        return res.rows[0];
    }

    static toSQLTable() {
        return `
            CREATE TABLE ${DailyContent.tableName} (
                id SERIAL PRIMARY KEY,
                content TEXT,
                image VARCHAR(255),
                order_index INTEGER,
                difficulty_id INTEGER ON DELETE CASCADE,
                CONSTRAINT fk_difficulty_id
                    FOREIGN KEY(difficulty_id)
                        REFERENCES difficulty(id)
            );
        `;
    }
}
DailyContent.tableName = 'dailycontent';
module.exports = DailyContent;