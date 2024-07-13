const mongoose = require('mongoose');

const connection = (uri) => mongoose.connect(uri);

module.exports = connection;

// Cluster password
// Q4rLa05cReOpdcfc