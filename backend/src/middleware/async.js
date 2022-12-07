// Middlware to catch errors that happen on router requests
/* used placed of async middlware
require('express-async-errors');*/

module.exports = function(handler){
    return async (req, res, next) => {
        try{
            await handler(req, res);
        }
        catch(ex){
            next(ex);
        }
    };
};