const LinkModel = require('../../Models/link');
const UserModel = require('../../Models/user');

const shareLinks = async (req, res) => {
    const {username, viewed} = req.params;
    try{

        const incrementValue = viewed === 'true' ? 1 : 0;

        const user = await UserModel.findOneAndUpdate(
            { username },
            { $inc: { views: incrementValue } },
            { new: true, runValidators: true }
        );

        if(!user){
            return res.status(404).json({message: "User not found!"});
        }

        const links = await LinkModel.find({userId: user._id.toString()});

        res.status(200).json({message: "Links fetched successfully!" ,data: links, name: user.name, bio: user.bio, profession: user.profession});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

module.exports = shareLinks;