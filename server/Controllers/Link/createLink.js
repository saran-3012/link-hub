const LinkModel = require('../../Models/link');

const createLink = async (req, res) => {

    try{

        const newLink = new LinkModel(req.body);

        await newLink.save();

        res.status(201).json({message: "Link created successfully!", link: newLink});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

module.exports = createLink;