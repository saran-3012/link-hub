const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token){
        return res.status(401).json({message: "No token provided"});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.body.userId = decoded.userId;
    req.body.username = decoded.username;

    next();
};

module.exports = auth;
