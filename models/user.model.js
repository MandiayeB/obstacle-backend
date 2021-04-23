const PostgresClient = require('../PostgresClient');

class User {

    /**@type {Number} */
    id;
    /**@type {String} */
    firstname;
    /**@type {String} */
    lastname;
    /**@type {String} */
    email;
    /**@type {String} */
    password;
    /**@type {Number} */
    status_id;

    /**
     * @returns {Promise<User>}
     */
    static async getAll() {
        const res = await PostgresClient.client.query(`SELECT * FROM ${User.tableName}`);
        return res.rows;
    }

    /**
     * @param {Number} userId
     * @returns {Promise<User>}
     */
    static async getById(userId) {
        const res = await PostgresClient.client.query(`SELECT * FROM ${User.tableName} WHERE id = $1`, [userId]);
        console.log(res.rows[0]);
    }

    /**
     * @param {String} email
     * @returns {Promise<User>}
     */
    static async findByEmail(email) {
        const res = await PostgresClient.client.query(`SELECT * FROM ${User.tableName} WHERE email = $1`, [email]);
        console.log(res.rows[0]);
    }

    /**
     * @param {String} firstname
     * @param {String} lastname
     * @param {String} email
     * @param {String} password
     * @param {Number} status_id
     */
    static async create(firstname, lastname, email, password, status_id) {

        const text = `INSERT INTO ${User.tableName}(firstname, lastname, email, password, status_id) 
                        VALUES($1, $2, $3, $4, $5)`;
        const values = [firstname, lastname, email, password, status_id];

        const res = await PostgresClient.client.query(text, values);
        console.log('Utilisateur enregistré !');
    }

    /**
     * @param {Number} userId
     */
    static async delete(userId) {
        const userName = this.getUserName(userId);
        const res = await PostgresClient.client.query(`DELETE FROM ${User.tableName} WHERE id = $1`, [userId]);
        console.log(`L'utilisateur : ${userName} a été supprimé`);
    }

    /**
     * @param {Number} userId
     * @param {String} password
     */
    static async updatePassword(userId, password) {
        const userName = this.getUserName(userId);
        const res = await PostgresClient.client.query(`UPDATE ${User.tableName} 
            SET password = $1 WHERE id = $2`, [password, userId]);
        console.log(`Le mot de passe de ${userName} a été modifié`);
    }

    /**
     * @param {Number} userId
     * @returns {String}
     */
    static async getUserName(userId) {
        const userName = await PostgresClient.client
        .query(`SELECT firstname FROM ${User.tableName} WHERE id = $1`, [userId]);
        return (userName['rows'][0]['firstname']);
    }

    static toSQLTable() {
        return `
            CREATE TABLE ${User.tableName} (
                id SERIAL PRIMARY KEY,
                firstname VARCHAR(255),
                lastname VARCHAR(255),
                email VARCHAR(255),
                password VARCHAR(255),
                status_id INTEGER,
                CONSTRAINT fk_status_id
                    FOREIGN KEY(status_id)
                        REFERENCES status(id)
            );
        `;
    }
}
User.tableName = 'users'
module.exports = User