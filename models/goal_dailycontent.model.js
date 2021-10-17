const PostgresClient = require('../services/PostgresClient');

class GoalDailyContent {

    /**@type {Number} */
    id;
    /**@type {Boolean} */
    validated;
    /**@type {Number} */
    goal_id;
    /**@type {Number} */
    dailycontent_id;

    /**
     * @param {Boolean} validated
     * @param {Number} goal_id
     * @param {Number} dailycontent_id
     */
     static async create(validated, goal_id, dailycontent_id) {
        const text = `INSERT INTO ${GoalDailyContent.tableName}(validated, goal_id, dailycontent_id) 
            VALUES($1, $2, $3)`;
        const values = [validated, goal_id, dailycontent_id];
        await PostgresClient.client.query(text, values);
    }

    /**
     * @param {Number} gdc_id
     */
     static async validate(gdc_id) {
        const text = `UPDATE ${GoalDailyContent.tableName} SET validated = true WHERE id = $1`;
        const value = [gdc_id];
        await PostgresClient.client.query(text, value);
    }

    static toSQLTable() {
        return `
            CREATE TABLE ${GoalDailyContent.tableName} (
                id SERIAL PRIMARY KEY,
                validated BOOLEAN,
                goal_id INTEGER NOT NULL,
                dailycontent_id INTEGER NOT NULL,
                CONSTRAINT fk_goal_id
                    FOREIGN KEY(goal_id)
                        REFERENCES goal(id) ON DELETE CASCADE,
                CONSTRAINT fk_dailycontent_id
                    FOREIGN KEY(dailycontent_id)
                        REFERENCES dailycontent(id) ON DELETE CASCADE
            );
        `;
    }
}

GoalDailyContent.tableName = 'goaldailycontent';
module.exports = GoalDailyContent;