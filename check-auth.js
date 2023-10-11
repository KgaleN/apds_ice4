const webtoken = require('jsonwebtoken');

module.exports=(req, res, next) =>
{
    try{
    const token = req.headers.authorization.split(" ")[1];
    webtoken.verify(token, "the_secret_is 12345678990_but maybe something different")
    next(); 
    }
    catch(error)
    {
        res.status(501).json({
            message: "Invalid token"
    }); }
};
