const UserModel = require('../../Models/user');

const updateUser = async (req, res) => {
    const {userId, name, username, email, bio, profession} = req.body;

    try{

        if(!name && !username && !email && !bio && !profession){
            return res.status(422).json({message : "No details provided for updation"});
        }

        const updateDetails = {};

        if(name){
            updateDetails.name = name;
        }

        if(username){
            updateDetails.username = username;
        }

        if(email){
            updateDetails.email = email;
        }

        if(bio){
            updateDetails.bio = bio;
        }

        if(profession){
            updateDetails.profession = profession;
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId, 
            { $set: updateDetails },
            { new: true }
        );

        res.status(202).json({message: "User updated successfully!", data: {
            id: updatedUser._id,
            name: updatedUser.name,
            username: updatedUser.username,
            email: updatedUser.email,
            bio: updatedUser.bio,
            profession: updatedUser.profession,
            views: updatedUser.views
        }});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

module.exports = updateUser;