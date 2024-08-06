const UserModel = require('../../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerUser = async (req, res) => {
    const {name, username, email, password} = req.body;
    
    try{

        const existingUsername = await UserModel.findOne({ username });
        if(existingUsername){
            return res.status(409).json({message: "Username already exists!"});
        }

        const existingEmail = await UserModel.findOne({ email: email.toLowerCase() });
        if(existingEmail){
            return res.status(409).json({message: "Email already exists!"});
        }

        const hashedPassword = await bcrypt.hash(password, +process.env.SALT_ROUNDS);

        const newUser = new UserModel({
            name,
            username,
            email: email.toLowerCase(),
            password: hashedPassword
        });

        await newUser.save();

        const token = jwt.sign(
            {
                userId: newUser._id, 
                username: newUser.username 
            }, 
            process.env.JWT_SECRET_KEY
        );

        res.status(201).json({message: "User registered successfully!", token, data: {
            id: newUser._id,
            name: newUser.name,
            username: newUser.username,
            email: newUser.email,
            bio: newUser.bio,
            profession: newUser.profession,
            views: newUser.views
        }});
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
};

module.exports = registerUser;