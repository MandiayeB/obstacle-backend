const PostgresClient = require('../services/PostgresClient');

class Status {

    /**@type {Number} */
    id;
    /**@type {String} */
    role;

    /**
     * @param {String} role
     */
     static async create(role) {
        const text = `INSERT INTO ${Status.tableName}(role) VALUES($1)`;
        const value = [role];
        await PostgresClient.client.query(text, value);
    }

    static toSQLTable() {
        return `
            CREATE TABLE ${Status.tableName} (
                id SERIAL PRIMARY KEY,
                role VARCHAR(255)
            );
        `;
    }
}

Status.tableName = 'status';
module.exports = Status;