const jwt = require('jsonwebtoken');
const config = require('config');
const ROLE = require ('../config/data');

module.exports = function authBasic (req, res, next) {

    const token = req.header('x-auth-token');

    if(!token) {
        return res.status(401).json({ msg: 'No token, authoroization denied' });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
 
        req.user = decoded.user;

        next();
    } catch (err) {
        res.status(401).json( { msg: 'Token is not valid'});
    }
};

module.exports = function authOwner (req, res, next) {

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

// module.exports = function authRole (role) {
//     return (req, res, next) => {
//       if (ROLE.ADMIN !== role) {
//         res.status(401)
//         return res.send('Not allowed')
//       }
//       next()
//     }
//   };

