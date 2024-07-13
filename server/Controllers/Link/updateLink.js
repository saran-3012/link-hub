const LinkModel = require("../../Models/link");

const updateLink = async (req, res) => {
    const {id} = req.params;
    try{
        const link = await LinkModel.findByIdAndUpdate(id, req.body);
        res.status(202).json({message: "Link updated successfully!", link})
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

module.exports = updateLink;