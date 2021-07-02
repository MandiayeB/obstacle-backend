const { Pool } = require('pg');
const pgSession = require('connect-pg-simple');
require('dotenv').config();

class PostgresqlService {

    sessionHandler = (session) => {
        const pgs = pgSession(session);
        return new pgs({
            conString: process.env.PG_DATABASE_URL || 'postgres://izsjhktyqctlff:e539d88f19a1380d7fac967ec1bf53e4ecea820dfadd71fc2edc0f15f9bc2e64@ec2-174-129-225-160.compute-1.amazonaws.com:5432/d7c3lle4281vh9',
            tableName: 'session'
        });
    }
}

module.exports = new PostgresqlService();