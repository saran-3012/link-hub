const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token){
        return res.status(401).json({message: "No token provided"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!decoded.userId || !decoded.username){
            return res.status(401).json({message: "Invalid token!"});
        }
        req.body.userId = decoded.userId;
        if(!req?.body?.username){
            req.body.username = decoded.username;
        }
        next();
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }

};

module.exports = auth;
