const LinkModel = require("../../Models/link");

const updateLink = async (req, res) => {
    const {id} = req.params;
    const {linkname, linkurl} = req.body;

    try{

        if(!linkname && !linkurl){
            return res.status(422).json({message : "No details provided for updation"});
        }

        const updateDetails = {};

        if(linkname){
            updateDetails.linkname = linkname;
        }

        if(linkurl){
            updateDetails.linkurl = linkurl;
        }

        const link = await LinkModel.findByIdAndUpdate(
            id,
            { $set: updateDetails },
            { new: true }
        );

        if (!link) {
            return res.status(404).json({ message: "Link not found" });
        }

        res.status(202).json({ message: "Link updated successfully!", link });
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

module.exports = updateLink;