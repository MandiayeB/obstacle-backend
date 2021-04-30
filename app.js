const express = require('express');
const session = require('express-session');
const PostgresClient = require('./PostgresClient');
const homepageRouter = require('./routes/homepage.route');
const profileRouter = require('./routes/profile.route');
const goalRouter = require('/routes/goal.route');

const app = express();
const port = process.env.PORT || 3000;

PostgresClient.init().then(() => console.log("Connected to Postgres Db!"));

app.use(express.json());

app.use('/', homepageRouter);
app.use('/profile', profileRouter);
app.use('/', goalRouter);

app.listen(port, () => {
    console.log('Express server is up!');
});