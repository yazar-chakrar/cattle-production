const mongoose = require('mongoose');
const config = require('config');

module.exports = () => {
    const db = process.env.MONGO_URI;
    mongoose.connect(db)
        .then(()=> console.log(`INFO: Connected to ${db}...`));
};