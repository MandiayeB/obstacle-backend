const PostgresClient = require('../services/PostgresClient');

class Difficulty {

    /**@type {Number} */
    id;
    /**@type {Number} */
    level;
    /**@type {String} */
    title;
    /**@type {String} */
    image;
    /**@type {Number} */
    length;
    /**@type {String} */
    difficulty;
    /**@type {Number} */
    challenge_id;

    /**
     * @param {Number} level
     * @param {String} title
     * @param {String} image
     * @param {Number} length
     * @param {String} difficulty
     * @param {Number} challenge_id
     */
     static async create(level, title, image, length, difficulty, challenge_id) {

        const text = `INSERT INTO ${Difficulty.tableName}(level, title, image, length, difficulty, challenge_id) 
            VALUES($1, $2, $3, $4, $5, $6)`;
        const values = [level, title, image, length, difficulty, challenge_id];
        await PostgresClient.client.query(text, values);
    }

    /**
     * @param {Number} id
     * @returns {Promise<Difficulty>}
     */
    static async getById(id) {
        const text = `SELECT id, length FROM ${Difficulty.tableName} WHERE id = $1`;
        const value = [id];
        const res = await PostgresClient.client.query(text, value);
        return res.rows[0];
    }
    /**
     * @param {Number} length
     * @param {Number} length
     * @returns {Promise<Difficulty>}
     */
     static async UpdateLength(length,id) {
        const text = `UPDATE ${Difficulty.tableName} SET length=$1 WHERE id=$2`;
        const value = [length,id];
        await PostgresClient.client.query(text, value);
    }

    /**
     * @param {Number} challenge_id
     * @returns {Promise<Difficulty>}
     */
    static async getByChallengeId(id) {
        const text = `SELECT * FROM ${Difficulty.tableName} WHERE challenge_id = $1`;
        const value = [id];
        const res = await PostgresClient.client.query(text, value);  
        return res.rows;  
    }
    

    static toSQLTable() {
        return `
            CREATE TABLE ${Difficulty.tableName} (
                id SERIAL PRIMARY KEY,
                level INTEGER,
                title VARCHAR(255),
                image VARCHAR(255),
                length INTEGER,
                difficulty VARCHAR(255),
                challenge_id INTEGER NOT NULL,
                CONSTRAINT fk_challenge_id
                    FOREIGN KEY(challenge_id)
                        REFERENCES challenge(id) ON DELETE CASCADE
            );
        `;
    }
}

Difficulty.tableName = 'difficulty';
module.exports = Difficulty;