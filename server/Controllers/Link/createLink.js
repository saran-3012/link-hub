const LinkModel = require('../../Models/link');

const createLink = async (req, res) => {

    const {linkname, linkurl, userId} = req.body;
    try{

        const newLink = new LinkModel({linkname, linkurl, userId});

        await newLink.save();

        res.status(201).json({message: "Link created successfully!", link: newLink});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

module.exports = createLink;