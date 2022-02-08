/* eslint-disable camelcase */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Progress = new Schema({
    status: {type: String, default: 'pending'},
    done: {type: Number, default: 0},
    Remaining: {type: Number},
    count: {type: Number},
    created_date: {type: Date, default: Date.now},
});

const Habits = new Schema({
    userId: {type: 'String'},
    Name: {type: 'String', required: true},
    Goal: {type: Number, default: 1},
    schedual: {type: Number, default: 1},
    repeat: {type: String, default: `0 0 * * 1-7`},
    start_date: {type: Date, default: Date.now},
    streak: {type: Number, default: 0},
    catagory: {type: String, default: 'All'},
    progress: {type: [Progress]},
});
module.exports = mongoose.model('Habits', Habits);
