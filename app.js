const express = require('express');
const session = require('express-session');
const PostgresClient = require('./PostgresClient');
const goalRouter = require('./routes/goal.route');

const app = express();
const port = process.env.PORT || 3000;

PostgresClient.init().then(() => console.log("Connected to Postgres Db!"));

app.use(express.json());

app.use('/', goalRouter);

app.listen(port, () => {
    console.log('Express server is up!');
});