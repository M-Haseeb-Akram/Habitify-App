/* eslint-disable camelcase */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Progress = new Schema({
    status: {type: String, default: 'pending', enum: {
        values: ['pending', 'success', 'fail', 'skip'],
        message: '{VALUE} is not supported',
    }},
    done: {type: Number, default: 0,
        min: [0, 'Must be at least 0, got {VALUE}'],
    },
    created_date: {type: Date, default: Date.now},
});

const Habits = new Schema({
    userId: {type: 'String'},
    Name: {type: 'String',
        required: [true, 'Habit Name is required!'],
        trim: true,
        validate: {
            validator: function(value) {
                return /^[a-zA-Z ]+$/.test(value);
            },
            message: (props) => `${props.value} is not a valid habit name!`,
        },
    },
    Goal: {type: Number, default: 1,
        min: [1, 'Goal be at least 1, got {VALUE}'],
    },
    schedual: {type: Number, default: 1, enum: {
        values: [1, 7, 31],
        message: '{VALUE} is not supported',
    }},
    repeat: {type: String, default: `00 00 * * *`},
    start_date: {type: Date, default: Date.now},
    streak: {type: Number, default: 0},
    success: {type: Number, default: 0,
        min: [0, 'Must be at least 0, got {VALUE}'],
    },
    fail: {type: Number, default: 0,
        min: [0, 'Must be at least 0, got {VALUE}'],
    },
    skip: {type: Number, default: 0,
        min: [0, 'Must be at least 0, got {VALUE}'],
    },
    catagory: {type: String, default: 'all', enum: {
        values: ['all', 'morning', 'evening', 'afternoon', 'archive'],
        message: '{VALUE} is not supported',
    }},
    progress: {type: [Progress]},
});
module.exports = mongoose.model('Habits', Habits);
