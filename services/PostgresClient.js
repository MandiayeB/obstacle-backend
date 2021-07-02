const pg = require('pg');
require('dotenv').config();

class PostgresClient {
    
    client;

    async init() {
        this.client = new pg.Client({
            user: 'izsjhktyqctlff',
            host: 'ec2-174-129-225-160.compute-1.amazonaws.com',
            database: 'd7c3lle4281vh9',
            password: 'e539d88f19a1380d7fac967ec1bf53e4ecea820dfadd71fc2edc0f15f9bc2e64',
            port: 5432,
            connectionString: 'postgres://izsjhktyqctlff:e539d88f19a1380d7fac967ec1bf53e4ecea820dfadd71fc2edc0f15f9bc2e64@ec2-174-129-225-160.compute-1.amazonaws.com:5432/d7c3lle4281vh9',
            ssl: { rejectUnauthorized: false }
        })
        await this.client.connect();
    }
}

module.exports = new PostgresClient();