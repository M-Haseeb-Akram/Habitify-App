const Habits = require('../models/habits.model');


const addHabitController = (req, res) => {
    try {
        // eslint-disable-next-line max-len
        const {userId, Name, Goal, schedual, repeat, startDate, streak, catagory} = req.body;
        new Habits({
            userId: userId,
            Name: Name,
            Goal: Goal,
            schedual: schedual,
            repeat: repeat,
            start_date: startDate,
            streak: streak,
            catagory: catagory,
        }).save()
            .then((newHabit) => {
                res.status(201).json({
                    newHabit,
                    message: 'Habit is created successfully',
                    statusCode: 201,
                });
            })
            .catch((err) => {
                res.status(400).json({
                    message: 'Error occured!',
                    error: err.message,
                    statusCode: 400,
                });
            });
    } catch (error) {
        res.status(400).json({
            message: 'Error occured!',
            error: error.message,
            statusCode: 400,
        });
    }
};

module.exports = {addHabitController};
