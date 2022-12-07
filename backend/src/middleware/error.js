//Middleware to log any error catched while server running
const winston = require("winston");

module.exports = function(err, req, res, next){
    winston.error(err.message, err);
    res.status(500).send('Somthing faild on the server.');
};