const express = require('express');
const session = require('express-session');
const cors = require('cors');
const PostgresClient = require('./PostgresClient');
const homepageRouter = require('./routes/homepage.route');
const profileRouter = require('./routes/profile.route');
const goalRouter = require('./routes/goal.route');
const connectionRouter = require('./routes/connection.route');
const registrationRouter = require('./routes/registration.route');

const app = express();
const port = process.env.PORT || 3000;

PostgresClient.init().then(() => console.log("Connected to Postgres Db!"));

app.use(express.json());

app.use(cors());
app.use(session({
    secret: 'my secret',
    cookie: { maxAge: 30000 },
    resave: true,
    saveUninitialized: true
}));

app.use('/', homepageRouter);
app.use('/profile', profileRouter);
app.use('/goal', goalRouter);
app.use('/login', connectionRouter);
app.use('/signin', registrationRouter);

app.listen(port, () => {
    console.log('Express server is up!');
});