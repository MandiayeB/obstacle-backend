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
    /**@type {JSON} */
    guide;
    /**@type {Number} */
    order;
    /**@type {Number} */
    difficulty_id;

    /**
     * @param {String} content
     * @param {String} image
     * @param {JSON} guide
     * @param {Number} order
     * @param {Number} difficulty_id
     */
     static async create(content, image, guide, order, difficulty_id) {
        const text = `INSERT INTO ${DailyContent.tableName}(content, image, guide, order_index, difficulty_id) 
            VALUES($1, $2, $3, $4, $5)`;
        const values = [content, image, guide, order, difficulty_id];
        await PostgresClient.client.query(text, values);
    }

    /**
     * @param {Number} goal_id
     * @returns {Promise<DailyContent>}
     */
     static async retrieve(goal_id) {
        const text = `
            SELECT ${GoalDailyContent.tableName}.id AS gdc_id, validated, content, image, guide ,order_index 
                FROM ${GoalDailyContent.tableName} 
            INNER JOIN ${Goal.tableName} 
                ON ${GoalDailyContent.tableName}.goal_id = ${Goal.tableName}.id
            INNER JOIN ${DailyContent.tableName} 
                ON ${GoalDailyContent.tableName}.dailycontent_id = ${DailyContent.tableName}.id
            WHERE ${Goal.tableName}.id = $1
            ORDER BY order_index
        `;
        const value = [goal_id];
        const res = await PostgresClient.client.query(text, value);
        return res.rows;
    }

    /**
     * @param {Number} id
     * @returns {Promise<DailyContent>}
     */
    static async getByDiffId(id) {
        const text = `SELECT id FROM ${DailyContent.tableName} WHERE difficulty_id = $1`;
        const value = [id];
        const res = await PostgresClient.client.query(text, value);
        return res.rows;
    }

    static async updateDaily(content, gif, id) {
        const text = `UPDATE ${DailyContent.tableName} SET content=$1, image=$2 WHERE id=$3`
        const values = [content, gif, id];
        await PostgresClient.client.query(text, values);
    }

    /**
     * @param {Number} id
     * @returns {Promise<DailyContent>}
     */
    static async getAllFormId(id) {
        const text = `SELECT * FROM ${DailyContent.tableName} WHERE difficulty_id = $1 ORDER BY order_index`;
        const value = [id];
        const res = await PostgresClient.client.query(text, value);
        return res.rows;
    }

    /**
     * @param {Number} difficulty_id
     */
    static async countDailyContent(difficulty_id) {
        const text = `SELECT COUNT(*) FROM ${DailyContent.tableName} WHERE difficulty_id = $1`;
        const value = [difficulty_id];
        const res = await PostgresClient.client.query(text, value);
        return res.rows[0];
    }

    /**
     * @param {Number} goal_id
     */
    static async getGuideById(goal_id){
        const res = await PostgresClient.client.query(`
            SELECT guide
            FROM ${DailyContent.tableName}
            WHERE goal_id = $1`,
            [goal_id]
        );
        return res.rows[0];
    }

    static toSQLTable() {
        return `
            CREATE TABLE ${DailyContent.tableName} (
                id SERIAL PRIMARY KEY,
                content TEXT,
                image VARCHAR(255),
                guide JSON,
                order_index INTEGER,
                difficulty_id INTEGER NOT NULL,
                CONSTRAINT fk_difficulty_id
                    FOREIGN KEY(difficulty_id)
                        REFERENCES difficulty(id) ON DELETE CASCADE
            );
        `;
    }
}

DailyContent.tableName = 'dailycontent';
module.exports = DailyContent;