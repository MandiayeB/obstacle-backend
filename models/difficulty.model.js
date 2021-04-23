const PostgresClient = require('../PostgresClient');

class Difficulty {

    /**@type {Number} */
    id;
    /**@type {Number} */
    level;
    /**@type {String} */
    title;
    /**@type {Number} */
    challenge_id;

    /**
     * @param {Number} level
     * @param {String} title
     * @param {Number} challenge_id
     */
     static async create(level, title, challenge_id) {

        const text = `INSERT INTO ${Difficulty.tableName}(level, title, challenge_id) 
            VALUES($1, $2, $3)`;
        const values = [level, title, challenge_id];
        const res = await PostgresClient.client.query(text, values);
        console.log('Difficulté enregistrée !');
    }

    static toSQLTable() {
        return `
            CREATE TABLE ${Difficulty.tableName} (
                id SERIAL PRIMARY KEY,
                level INTEGER,
                title VARCHAR(255),
                challenge_id INTEGER,
                CONSTRAINT fk_challenge_id
                    FOREIGN KEY(challenge_id)
                        REFERENCES challenge(id)
            );
        `;
    }
}
Difficulty.tableName = 'difficulty';
module.exports = Difficulty;