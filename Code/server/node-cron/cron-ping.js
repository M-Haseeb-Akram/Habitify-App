// const Habits = require('../models/habits_model');


// const habitsTracker = async (id, req, res) => {
//     const triggerHabit = '';
//     try {
//         const habit = await Habits.findOne({_id: id});
//         console.log(habit);
// if (habit.progress) {
//     triggerHabit = {
//         status: 'pending',
//         done: 0,
//         Remaining: habit.Goal,
//         count: habit.schedual,
//         created_date: Date.now,
//     };
// } else {
//     const lastIndex = habit.progress.at(-1);
//     if (lastIndex.count !== habit.progress.schedual) {
//         triggerHabit = {
//             status: lastIndex.status,
//             done: lastIndex.done,
//             Remaining: lastIndex.Remaining,
//             count: lastIndex.count + 1,
//             created_date: Date.now,
//         };
//     }
// }
// const newHabit = await Habits.updateOne({
//     _id: id,
// },
// {
//     progress: [...habit.progress + triggerHabit],
// });
// if (newHabit) {
//         res.status(201).json({
//             userDoc,
//             message: 'Habit is created successfully',
//             statusCode: 201,
//         });
//         // }
//     } catch (err) {
//         res.status(400).json({
//             message: 'Error occured! In Cron Jobs',
//             error: err.message,
//             statusCode: 400,
//         });
//     };
// };

// module.exports = habitsTracker;
