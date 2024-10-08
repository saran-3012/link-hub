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
    userId: {
        type: String,
        required: true,
        ref: 'User'
    }

});

const LinkModel = mongoose.model("Link", linkSchema);

module.exports = LinkModel;