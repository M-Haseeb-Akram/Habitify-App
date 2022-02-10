// eslint-disable-next-line new-cap
const router = require('express').Router();
const {
    addHabitController,
    viewHabitController,
    deleteHabitController,
    editHabitController} = require('../../controller/user_controller');
const {addHabitMiddleware} = require('../../middleware/user_middleware');


router.post(
    '/add-habit',
    addHabitMiddleware,
    addHabitController,
);

router.patch(
    '/update-habit/:id',
    addHabitMiddleware,
    editHabitController,
);

router.delete(
    '/delete-habit/:id',
    deleteHabitController,
);


router.get('/get-habits', viewHabitController);
module.exports = router;
