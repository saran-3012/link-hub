const UserModel = require('../../Models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();

const registerUser = async (req, res) => {
    const {name, username, email, password} = req.body;
    
    try{

        const existingUsername = await UserModel.findOne({ username });
        if(existingUsername){
            return res.status(409).json({message: "Username already exists!"});
        }

        const existingEmail = await UserModel.findOne({ email });
        if(existingEmail){
            return res.status(409).json({message: "Email already exists!"});
        }

        const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS);

        const newUser = new UserModel({
            name,
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({message: "User registered successfully!", newUser});
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
};

module.exports = registerUser;