const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    linkname: {
        type: String,
        required: true
    },
    linkurl: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

const LinkModel = mongoose.model("Link", linkSchema);

module.exports = LinkModel;