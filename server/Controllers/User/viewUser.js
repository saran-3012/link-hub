const UserModel = require('../../Models/user');

const viewUser = async (req, res) => {
    const {userId} = req.body;
    try{
        const user = await UserModel.findById(userId);

        res.status(200).json({ message: "User fetched successfully!", data: {
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

module.exports = viewUser;