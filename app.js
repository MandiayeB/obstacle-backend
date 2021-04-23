const express = require('express');
const session = require('express-session');
const cors = require('cors');
const PostgresClient = require('./PostgresClient');

const app = express();

PostgresClient.init().then(() => console.log("Connected to Postgres Db!"));

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Express server is up!');
});