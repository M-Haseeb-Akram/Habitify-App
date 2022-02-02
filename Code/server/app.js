const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/connection');
require('dotenv').config();
const app = express();
const passport = require('passport');
const routes = require('./routes/index');
const cookieParser = require('cookie-parser');
// const cron = require('node-cron');
// const test = require('./node-cron/cron-ping');
// const { send } = require('process');

app.use(cors());
app.use(passport.initialize());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/dist/client')));
connectDB();

app.listen(process.env.PORT, () => {
    console.log(`App Listening on port ${process.env.PORT}!`);
});

app.use('/api', routes);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/dist/client/index.html'));
});
// cron.schedule('* * * * *', () => test());

