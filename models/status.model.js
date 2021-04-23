const PostgresClient = require('../PostgresClient');

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
        const values = [role];
        const res = await PostgresClient.client.query(text, values);
        console.log('Rôle enregistré !');
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