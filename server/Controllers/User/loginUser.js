const UserModel = require('../../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginUser = async (req, res) => {

    const {username, password} = req.body;

    try{
        const user = await UserModel.findOne(
            {
                $or: [
                    { email: username }, 
                    {username: username}
                ]
            }
        );

        if(!user){
            return res.status(404).json("User not found!");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json("Wrong password");
        }

        const token = jwt.sign(
            {
                userId: user._id, 
                username: user.username
            }, 
            process.env.JWT_SECRET_KEY
        );

        res.status(200).json({message: "User logged in successfully", token, data: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            bio: user.bio,
            profession: user.profession,
            views: user.views
        }});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

module.exports = loginUser;