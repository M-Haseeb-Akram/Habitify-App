/* eslint-disable camelcase */
/* eslint-disable new-cap */
/* eslint-disable max-len */
const Habits = require('../models/habits_model');

const addHabitController = async (req, res) => {
    try {
        const {Name, Goal, schedual, repeat, start_date, streak, catagory} = req.body;
        const progress = {
            status: 'pending',
            done: 0,
            Remaining: Goal,
            days: 0,
            created_date: start_date,
        };
        await new Habits({
            userId: req.user.id,
            Name: Name,
            Goal: Goal,
            schedual: schedual,
            repeat: repeat,
            start_date: start_date,
            streak: streak,
            catagory: catagory,
            progress: [progress],
        }).save((err, newHabit) => {
            if (!err) {
                res.status(201).json({
                    newHabit,
                    message: 'Habit is created successfully',
                    statusCode: 201,
                });
            } else {
                res.status(403).json({
                    error: err,
                    statusCode: 403,
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

const getSingleHabit = async (req, res) => {
    try {
        const {id} = req.params;
        const habit = await Habits.findOne({_id: id, userId: req.user.id});
        res.status(201).json({
            habit,
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
        const id = req.params.id;
        await Habits.remove({'_id': id});
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
        const {Name, Goal, schedual, repeat, start_date, catagory} = req.body;
        const data = await Habits.findOneAndUpdate(
            {_id: id},
            {
                $set: {
                    Name: Name,
                    Goal: Goal,
                    schedual: schedual,
                    repeat: repeat,
                    start_date: start_date,
                    catagory: catagory,
                },
            },
            {new: true, useFindAndModify: false},
        );
        res.status(200).json({
            message: 'Updated Successfully!',
            data: data,
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

const editHabitCatagoryController = async (req, res) => {
    try {
        const {id} = req.params;
        const {catagory} = req.body;
        const data = await Habits.findOneAndUpdate(
            {_id: id},
            {
                $set: {
                    catagory: catagory,
                },
            },
            {new: true, useFindAndModify: false},
        );
        res.status(200).json({
            message: 'Updated Successfully!',
            data: data,
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

const updateProgressStatus = async (req, res) => {
    try {
        const {hid} = req.params;
        const {pid} = req.params;
        const {skip, fail, success, status} = req.body;
        await Habits.findOneAndUpdate(
            {'_id': hid, 'progress': {$elemMatch: {_id: pid}}},
            {
                $set: {
                    'progress.$.status': status,
                    'progress.$.done': 0,
                    'skip': skip,
                    'fail': fail,
                    'success': success,
                },
            },
            {new: true, useFindAndModify: false},
        );
        updateHabitStreak(req, res, hid);
    } catch (error) {
        res.status(400).json({
            message: 'Error occured!',
            error: error.message,
            statusCode: 400,
        });
    }
};


const checkInProgressStatus = async (req, res) => {
    try {
        const {hid} = req.params;
        const {pid} = req.params;
        const {done, success, status} = req.body;
        await Habits.findOneAndUpdate(
            {'_id': hid, 'progress': {$elemMatch: {_id: pid}}},
            {
                $set: {
                    'progress.$.status': status,
                    'progress.$.done': done,
                    'success': success,
                },
            },
            {new: true, useFindAndModify: false},
        );
        updateHabitStreak(req, res, hid);
    } catch (error) {
        res.status(400).json({
            message: 'Error occured!',
            error: error.message,
            statusCode: 400,
        });
    }
};


const updateHabitStreak = async (req, res, hid) => {
    try {
        let streak = 0;
        const data = await Habits.findOne(
            {'_id': hid},
        );
        const days = data.schedual;
        for (const progress of data.progress) {
            if (progress.status === 'success') {
                streak = streak + days;
            }
        }
        const newData = await Habits.findOneAndUpdate(
            {'_id': hid},
            {
                $set: {
                    streak: streak,
                },
            },
            {new: true, useFindAndModify: false},
        );
        res.status(200).json({
            message: 'Updated Successfully!',
            data: newData,
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

module.exports = {
    addHabitController,
    viewHabitController,
    deleteHabitController,
    editHabitController,
    getSingleHabit,
    editHabitCatagoryController,
    updateProgressStatus,
    updateHabitStreak,
    checkInProgressStatus,
};
