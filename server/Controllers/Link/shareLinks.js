const LinkModel = require('../../Models/link');
const UserModel = require('../../Models/user');

const shareLinks = async (req, res) => {
    const {username} = req.params;
    try{
        const user = await UserModel.findOneAndUpdate(
            { username },
            { $inc: { views: 1 } },
            { new: true, runValidators: true }
        );

        if(!user){
            return res.status(404).json({message: "User not found!"});
        }

        const links = await LinkModel.find({username});

        res.status(200).json({message: "Links fetched successfully!" ,data: links, name: user.name, bio: user.bio, profession: user.profession});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

module.exports = shareLinks;