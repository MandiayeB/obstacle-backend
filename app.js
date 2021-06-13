const express = require('express');
const session = require('express-session');
const cors = require('cors');
const PostgresClient = require('./PostgresClient');
const homeRouter = require('./routes/home.route');
const profileRouter = require('./routes/profile.route');
const goalRouter = require('./routes/goal.route');
const connectionRouter = require('./routes/connection.route');
const registrationRouter = require('./routes/registration.route');
const dailycontentRouter = require('./routes/dailycontent.route');
const disconnectionRouter = require('./routes/disconnection.route');

const app = express();
const port = process.env.PORT || 3000;

PostgresClient.init().then(() => console.log("Connected to Postgres Db!"));

app.use(express.json());

app.use(cors({ origin: [`http://localhost:${port}`, `http://localhost:8080`], credentials: true }));
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
}));

app.use('/', homeRouter);
app.use('/profile', profileRouter);
app.use('/goal', goalRouter);
app.use('/login', connectionRouter);
app.use('/signin', registrationRouter);
app.use('/dailycontent', dailycontentRouter);
app.use('/disconnection', disconnectionRouter);

app.listen(port, () => {
    console.log('Express server is up!');
});