/*jshint esversion: 6 */
const express = require('express');
const dotenv = require('dotenv');
const app = express();

// enable cors to multiple use for clients server
let cors = require("cors");
app.use(cors());

// load env vars
dotenv.config({path: './config/config.env'});

// settings
require('./settings/joi')();

// startup
require('./startup/db')();
require('./startup/logging')();
require('./startup/routes')(app);


const PORT = process.env.PORT || 4000;
app.listen(
    PORT,
    () => console.log(`app is running on port ${PORT}`)
);