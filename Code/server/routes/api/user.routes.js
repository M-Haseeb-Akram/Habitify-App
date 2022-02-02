// eslint-disable-next-line new-cap
const router = require('express').Router();
const {addHabitController} = require('../../controller/user.controller');
const {expressValidater,
    addHabitMiddleware} = require('../../middleware/user.middleware');


router.post(
    '/add-habit',
    addHabitMiddleware(),
    expressValidater,
    addHabitController,
);

module.exports = router;
