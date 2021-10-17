class Session {

    /**@type {String} */
    sid;
    /**@type {JSON} */
    sess;
    /**@type {Date} */
    expire;

    static toSQLTable() {
        return `
            CREATE TABLE ${Session.tableName} (
                sid VARCHAR NOT NULL COLLATE "default",
                sess JSON NOT NULL,
                expire TIMESTAMP NOT NULL,
                CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
            );
            CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON session ("expire");
        `;
    }
}

Session.tableName = 'session';
module.exports = Session;