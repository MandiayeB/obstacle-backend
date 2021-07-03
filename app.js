const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const PostgresClient = require('./services/PostgresClient');
const PostgresqlService = require('./services/PostgresService');
const homeRouter = require('./routes/home.route');
const profileRouter = require('./routes/profile.route');
const goalRouter = require('./routes/goal.route');
const connectionRouter = require('./routes/connection.route');
const registrationRouter = require('./routes/registration.route');
const dailycontentRouter = require('./routes/dailycontent.route');
const disconnectionRouter = require('./routes/disconnection.route');
const dashboardRouter = require('./routes/dashboard.route');
const uploadRouter = require('./routes/upload.route');

const app = express();
const port = process.env.PORT || 3000;

PostgresClient.init().then(() => console.log("Connected to Postgres Db!"));

app.use(express.json());

app.use(cors({ 
    origin: [`http://localhost:${port}`, process.env.PG_CUSTOM_ORIGIN || `https://obstacle.herokuapp.com`], 
    credentials: true 
}));

app.set('trust proxy', 1);
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        cookie: { 
            secure: process.env.NODE_ENV === "development" ? false : true,
            maxAge: 1000 * 60 * 60 * 24
        },
        PostgresClient
    })
);

app.use('/', homeRouter);
app.use('/profile', profileRouter);
app.use('/goal', goalRouter);
app.use('/login', connectionRouter);
app.use('/signin', registrationRouter);
app.use('/dailycontent', dailycontentRouter);
app.use('/disconnection', disconnectionRouter);
app.use('/dashboard', dashboardRouter);
app.use('/upload', uploadRouter);
app.use('/pictures', express.static(path.join(__dirname, 'pictures')));

app.listen(port, () => {
    console.log('Express server is up!');
});