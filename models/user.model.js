const PostgresClient = require('../services/PostgresClient');
const Status = require('../models/status.model');
const bcrypt = require('bcrypt');

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
    /**@type {String} */
    gender;
    /**@type {Date} */
    birthdate;
    /**@type {String} */
    picture;
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
        const text = `SELECT * FROM ${User.tableName} WHERE id = $1`;
        const value = [userId];
        const res = await PostgresClient.client.query(text, value);
        return res.rows[0];
    }

    /**
     * @param {String} email
     * @returns {Promise<User>}
     */
    static async findByEmail(email) {
        const text = `
            SELECT ${User.tableName}.id AS user_id, firstname, lastname, email, 
                password, gender, birthdate, picture, ${Status.tableName}.role 
            FROM ${User.tableName} 
            INNER JOIN ${Status.tableName} ON ${User.tableName}.status_id = ${Status.tableName}.id
            WHERE email = $1
        `;
        const value = [email];
        const res = await PostgresClient.client.query(text, value);
        return res.rows[0];
    }

    /**
     * @param {String} firstname
     * @param {String} lastname
     * @param {String} email
     * @param {String} password
     * @param {String} gender
     * @param {Date} birthdate
     * @param {Number} status_id
     */
    static async create(firstname, lastname, email, password, gender, birthdate, picture, status_id) {

        const text = `INSERT INTO ${User.tableName}(firstname, lastname, email, 
                                password, gender, birthdate, picture, status_id) 
                        VALUES($1, $2, $3, $4, $5, $6, $7, $8)`;
        const values = [firstname, lastname, email, password, gender, birthdate, picture, status_id];

        await PostgresClient.client.query(text, values);
    }

    /**
     * @param {Number} userId
     */
    static async delete(userId) {
        const text = `DELETE FROM ${User.tableName} WHERE id = $1`;
        const value = [userId];
        await PostgresClient.client.query(text, value);
    }

    /**
     * @param {String} emailsession
     * @param {String} newPassword
     */
    static async updatePassword(emailsession, newPassword) {
        const text = `UPDATE ${User.tableName} SET password = $1 WHERE email = $2`;
        const values = [newPassword, emailsession];
        await PostgresClient.client.query(text, values);
    }

    /**
     * @param {String} emailsession
     * @param {String} name
     */
    static async updateName (emailsession, name) {
        const text = `UPDATE ${User.tableName} SET firstname = $1 WHERE email = $2`;
        const values = [name, emailsession];
        await PostgresClient.client.query(text, values);
    }

    /**
     * @param {String} emailsession
     * @param {String} lastname
     */
    static async updateLastName (emailsession, lastName) {
        const text = `UPDATE ${User.tableName} SET lastname = $1 WHERE email = $2`;
        const values = [lastName, emailsession];
        await PostgresClient.client.query(text, values);
    }

    /**
     * @param {String} emailsession
     * @param {String} email
     */
    static async updateEmail (emailsession, email) {
        const text = `UPDATE ${User.tableName} SET email = $1 WHERE email = $2`;
        const values = [email, emailsession];
        await PostgresClient.client.query(text, values);
    }


    /**
     * @param {String} email
     * @param {String} picture
     */
     static async uploadPicture (email, picture) {
        const text = `UPDATE ${User.tableName} SET picture = $1 WHERE email = $2`;
        const values = [picture, email];
        await PostgresClient.client.query(text, values);
    }

    /**
     * @param {String} emailsession
     */
    static async getPicture (emailsession) {
        const text = `SELECT picture FROM ${User.tableName} WHERE email = $1`;
        const value = [emailsession];
        const res = await PostgresClient.client.query(text, value);
        return res.rows[0];
    }

    static toSQLTable() {
        return `
            CREATE TABLE ${User.tableName} (
                id SERIAL PRIMARY KEY,
                firstname VARCHAR(255),
                lastname VARCHAR(255),
                email VARCHAR(255),
                password VARCHAR(255),
                gender VARCHAR(255),
                birthdate DATE,
                picture VARCHAR(255),
                status_id INTEGER,
                CONSTRAINT fk_status_id
                    FOREIGN KEY(status_id)
                        REFERENCES status(id)
            );
        `;
    }
}

User.tableName = 'users';
module.exports = User;