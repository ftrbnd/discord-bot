const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    username: String,
    day: Number,
    month: String,
    timezone: String,
});

module.exports = mongoose.model('Data', dataSchema);