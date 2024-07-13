const LinkModel = require("../../Models/link");

const deleteLink = async (req, res) => {
    const {id} = req.params;
    try{
        const link = await LinkModel.findByIdAndDelete(id);
        res.status(202).json({message: "Link deleted successfully!", link})
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

module.exports = deleteLink;