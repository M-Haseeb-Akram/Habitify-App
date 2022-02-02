const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Habits = new Schema({
    userId: {type: 'String'},
    Name: {type: 'String', required: true},
    Goal: {type: Number, default: 1},
    schedual: {type: Number, default: 1},
    repeat: {type: String, default: '* * * * * 1-7'},
    start_date: {type: Date, default: Date.now},
    streak: {type: Number, default: 0},
    catagory: {type: String, default: 'All'},
});
module.exports = mongoose.model('Habits', Habits);
