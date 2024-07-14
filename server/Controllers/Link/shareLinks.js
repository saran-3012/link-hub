const LinkModel = require('../../Models/link');
const UserModel = require('../../Models/user');

const shareLinks = async (req, res) => {
    const {username} = req.params;
    try{
        const user = await UserModel.findOne({username});

        if(!user){
            return res.status(404).json({message: "User no found!"});
        }

        const links = await LinkModel.find({username});

        res.status(200).json({data: links, name: user.name});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

module.exports = shareLinks;