/* eslint-disable max-len */
const Habits = require('../models/habits_model');

const addHabitController = async (req, res) => {
    try {
        const {userId, Name, Goal, schedual, repeat, startDate, streak, catagory} = req.body;
        await new Habits({
            userId: userId,
            Name: Name,
            Goal: Goal,
            schedual: schedual,
            repeat: repeat,
            start_date: startDate,
            streak: streak,
            catagory: catagory,
            progress: [],
        }).save((err, newHabit) => {
            if (!err) {
                res.status(201).json({
                    newHabit,
                    message: 'Habit is created successfully',
                    statusCode: 201,
                });
            }
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error occured!',
            error: error.message,
            statusCode: 400,
        });
    }
};

const viewHabitController = async (req, res) => {
    try {
        // const {time} = req.params;
        const habits = await Habits.find({userId: req.user.id});
        res.status(201).json({
            habits,
            statusCode: 201,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error occured!',
            error: error.message,
            statusCode: 400,
        });
    }
};

const deleteHabitController = async (req, res) => {
    try {
        const {id} = req.params.id;
        console.log(id);
        await Habits.remove({where: {'_id': `${id}`, 'userId': req.user.id}});
        res.status(200).json({
            message: 'Habit is deleted successfully',
            statusCode: 200,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error occured!',
            error: error.message,
            statusCode: 400,
        });
    }
};

const editHabitController = async (req, res) => {
    try {
        const {id} = req.params;
        const {userId, Name, Goal, schedual, repeat, startDate, streak, catagory} = req.body;
        await Habits.update({
            userId: userId,
            Name: Name,
            Goal: Goal,
            schedual: schedual,
            repeat: repeat,
            start_date: startDate,
            streak: streak,
            catagory: catagory,
        },
        {where: {_id: id, userId: req.user.id}});
    } catch (error) {
        res.status(400).json({
            message: 'Error occured!',
            error: error.message,
            statusCode: 400,
        });
    }
};
module.exports = {
    addHabitController,
    viewHabitController,
    deleteHabitController,
    editHabitController,
};
