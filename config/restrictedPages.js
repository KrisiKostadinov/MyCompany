const configuration = require("./configuration");
const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
    
    try {
        const token = req.cookies.token;
        if(token) {
            var decoded = await jwt.verify(token, configuration.SECRET);
            console.log(decoded.company);
            
            if (decoded) {
                res.locals.data = decoded.company ? decoded.company : decoded.worker;
                return next();
            }


        }
    } catch (err) {
        res.redirect('/');
    }
    
    next();
}

const isNotAuth = (req, res, next) => {

}

module.exports = {
    isAuth,
    isNotAuth,
}