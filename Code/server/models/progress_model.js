const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Progress = new Schema({
    status: {type: String, default: 'pending'},
    done: {type: Number, default: 0},
    Remaining: {type: Number},
    count: {type: Number},
    created_date: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Progress', Progress);
