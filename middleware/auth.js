const jwt = require('jsonwebtoken');
const config = require('config');
const {ROLE} = require ('../config/data');

const authBasic = 
    function (req, res, next) {

    const token = req.header('x-auth-token');

    if(!token) {
        return res.status(401).json({ msg: 'No token, authoroization denied' });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        console.log(decoded);
        req.user = decoded.user;
    
        next();
    } catch (err) {
        res.status(401).json( { msg: 'Token is not valid'});
    }
};

const authOwner =
 function  (req, res, next) {

    const token = req.header('x-auth-token');

    if(!token) {
        return res.status(401).json({ msg: 'No token, authoroization denied' });
    }
    
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
 
        req.owner = decoded.owner;
        next();
    } catch (err) {
        res.status(401).json( { msg: 'Token is not valid'});
    }
};

module.exports = { authBasic: authBasic, authOwner: authOwner };


