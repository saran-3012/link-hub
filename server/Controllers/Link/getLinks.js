const LinkModel = require('../../Models/link');

const getLinks = async (req, res) => {
    const {userId} = req.body;
    try{
        const links = await LinkModel.find({userId});

        res.status(200).json({data: links, message: "Links fetched Successfully!"})
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

module.exports = getLinks;