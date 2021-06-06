const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    userID: String,
    day: Number,
    month: String,
    timezone: String,
});

module.exports = mongoose.model('Data', dataSchema);