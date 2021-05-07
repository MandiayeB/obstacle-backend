const PostgresClient = require('../PostgresClient');

class Achievement {

    /**@type {Number} */
    id;
    /**@type {String} */
    content;
    /**@type {Date} */
    ach_date;
    /**@type {Number} */
    goal_id;

    /**
     * @param {Number} goal_id
     * @returns {Promise<Achievement>}
     */
    static async getByGoalId(goal_id) {
        const res = await PostgresClient.client.query(`
            SELECT * FROM ${Achievement.tableName} 
            WHERE goal_id = $1
            ORDER BY ach_date ASC;`,
        [goal_id]);
        return res.rows;
    }

    /**
     * @param {String} content
     * @param {Date} ach_date
     * @param {Number} goal_id
     */
    static async create(content, ach_date, goal_id) {

        const text = `INSERT INTO ${Achievement.tableName}(content, ach_date, goal_id) 
            VALUES($1, to_timestamp($2/1000.0), $3)`;
        const values = [content, ach_date, goal_id];
        const res = await PostgresClient.client.query(text, values);
        console.log('Accomplissement enregistré !');
    }

    static toSQLTable() {
        return `
            CREATE TABLE ${Achievement.tableName} (
                id SERIAL PRIMARY KEY,
                content VARCHAR(255),
                ach_date TIMESTAMP,
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