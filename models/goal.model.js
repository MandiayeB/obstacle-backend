const PostgresClient = require('../PostgresClient');

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
     */
      static async create(creation_date, supposed_end_date, user_id, difficulty_id) {

        const text = `INSERT INTO ${Goal.tableName}
            (creation_date, supposed_end_date, user_id, difficulty_id) 
            VALUES(to_timestamp($1/1000.0), to_timestamp($2/1000.0), $3, $4)`;
        const values = [creation_date, supposed_end_date, user_id, difficulty_id];
        const res = await PostgresClient.client.query(text, values);
        console.log('Objectif enregistré !');
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