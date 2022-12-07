//loggin errors and save it

const winston = require('winston');
//require('winston-mongodb');

module.exports = function(){
    winston.add(new winston.transports.File ({filename: 'logfile.log'}));
    //winston.add(new winston.transports.MongoDB ({db: 'mongodb://localhost/corn-flix/?authSource=admin', capped : true}));

    process.on('uncaughtException', (ex)=>{
        //console.log('UncaughtException found on startup.');
        winston.error(ex.message, ex);
        process.exit(1);
    });
    process.on('unhandledRejection', (ex)=>{
        //console.log('unhandledRejection found on startup.');
        winston.error(ex.message, ex);
        process.exit(1);
    });
};