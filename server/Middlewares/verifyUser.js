const LinkModel = require("../Models/link");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyUser = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    const {id} = req.params; 

    if(!token){
        return res.status(401).json({message: "No token provided"});
    }

    try{

        const link = await LinkModel.findOne({_id: id});
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
        if(link.userId !== decoded.userId){
            return res.status(403).json({message: "You are not allowed to perform this action"});
        }
    
        next();
    }
    catch(err){
        res.status(500).json({message: err.message});
    }

};

module.exports = verifyUser;