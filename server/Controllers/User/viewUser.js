const UserModel = require('../../Models/user');

const viewUser = async (req, res) => {
    const {userId} = req.body;
    try{
        const user = await UserModel.findById(userId);

        res.status(200).json({ message: "User fetched successfully!", data: {...user, password: ''}});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

module.exports = viewUser;