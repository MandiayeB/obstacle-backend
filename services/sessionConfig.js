const { Pool: sessionPool  } = require('pg');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const randomString = require("randomstring");
require('dotenv').config();

const sessionDBaccess = new sessionPool({
    user: process.env.PG_USER || 'izsjhktyqctlff',
    password: process.env.PG_PASSWORD || 'e539d88f19a1380d7fac967ec1bf53e4ecea820dfadd71fc2edc0f15f9bc2e64',
    host: process.env.PG_HOST || 'ec2-174-129-225-160.compute-1.amazonaws.com',
    database: process.env.PG_DATABASE || 'd7c3lle4281vh9',
    ssl: process.env.PG_SSL ? false : { rejectUnauthorized: false },
    port: 5432,
    connectionString: process.env.PG_DATABASE_URL || 'postgres://izsjhktyqctlff:e539d88f19a1380d7fac967ec1bf53e4ecea820dfadd71fc2edc0f15f9bc2e64@ec2-174-129-225-160.compute-1.amazonaws.com:5432/d7c3lle4281vh9'
});

const sessionConfig = {
    store: new pgSession({
        pool: sessionDBaccess,
        tableName: 'session'
    }),
    name: 'SID',
    secret: randomString.generate({
        length: 14,
        charset: 'alphanumeric'
    }),
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: true,
        secure: process.env.PG_SSL ? false : true
    }
}

module.exports = sessionConfig;