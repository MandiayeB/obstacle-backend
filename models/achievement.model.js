const PostgresClient = require('../PostgresClient');

class Achievement {

    /**@type {Number} */
    id;
    /**@type {String} */
    content;
    /**@type {Number} */
    goal_id;

    /**
     * @param {Number} goal_id
     * @returns {Promise<Achievement>}
     */
    static async getByGoalId(goal_id) {
        const res = await PostgresClient.client.query(`SELECT * FROM ${Achievement.tableName} WHERE goal_id = $1`, [goal_id]);
        return res.rows;
    }

    /**
     * @param {String} content
     * @param {Number} goal_id
     */
    static async create(content, goal_id) {

        const text = `INSERT INTO ${Achievement.tableName}(content, goal_id) VALUES($1, $2)`;
        const values = [content, goal_id];
        const res = await PostgresClient.client.query(text, values);
        console.log('Accomplissement enregistré !');
    }

    static toSQLTable() {
        return `
            CREATE TABLE ${Achievement.tableName} (
                id SERIAL PRIMARY KEY,
                content VARCHAR(255),
                goal_id INTEGER,
                CONSTRAINT fk_goal_id
                    FOREIGN KEY(goal_id)
                        REFERENCES goal(id)
            );
        `;
    }
}
Achievement.tableName = 'achievement';
module.exports = Achievement;