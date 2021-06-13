const PostgresClient = require('../PostgresClient');

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
        const res = await PostgresClient.client.query(text, values);
        console.log('Objectif-Jour enregistré !');
    }

    /**
     * @param {Number} gdc_id
     */
     static async validate(gdc_id) {
        
        const res = await PostgresClient.client.query(
            `UPDATE ${GoalDailyContent.tableName} 
            SET validated = true 
            WHERE id = $1`, [gdc_id]
        );
    }

    static toSQLTable() {
        return `
            CREATE TABLE ${GoalDailyContent.tableName} (
                id SERIAL PRIMARY KEY,
                validated BOOLEAN,
                goal_id INTEGER,
                dailycontent_id INTEGER,
                CONSTRAINT fk_goal_id
                    FOREIGN KEY(goal_id)
                        REFERENCES goal(id),
                CONSTRAINT fk_dailycontent_id
                    FOREIGN KEY(dailycontent_id)
                        REFERENCES dailycontent(id)
            );
        `;
    }
}
GoalDailyContent.tableName = 'goaldailycontent';
module.exports = GoalDailyContent;