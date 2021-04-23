const PostgresClient = require('../PostgresClient');

class Challenge {

    /**@type {Number} */
    id;
    /**@type {String} */
    challenge;
    /**@type {Number} */
    author;
    /**@type {Number} */
    activity_id;

    /**
     * @param {String} challenge
     * @param {Number} author
     * @param {Number} activity_id
     */
     static async create(challenge, author, activity_id) {

        const text = `INSERT INTO ${Challenge.tableName}(challenge, author, activity_id) 
            VALUES($1, $2, $3)`;
        const values = [challenge, author, activity_id];
        const res = await PostgresClient.client.query(text, values);
        console.log('Challenge enregistré !');
    }

    static toSQLTable() {
        return `
            CREATE TABLE ${Challenge.tableName} (
                id SERIAL PRIMARY KEY,
                challenge VARCHAR(255),
                author INTEGER,
                activity_id INTEGER,
                CONSTRAINT fk_author
                    FOREIGN KEY(author)
                        REFERENCES users(id),
                CONSTRAINT fk_activity_id
                    FOREIGN KEY(activity_id)
                        REFERENCES activity(id)
            );
        `;
    }
}
Challenge.tableName = 'challenge';
module.exports = Challenge;