// eslint-disable-next-line new-cap
const router = require('express').Router();
const {
    addHabitController,
    viewHabitController,
    deleteHabitController,
    editHabitController,
    getSingleHabit,
    editHabitCatagoryController} = require('../../controller/user_controller');
const {addHabitMiddleware} = require('../../middleware/user_middleware');


router.post(
    '/habit',
    addHabitMiddleware,
    addHabitController,
);

router.patch(
    '/habit/:id',
    addHabitMiddleware,
    editHabitController,
);

router.patch(
    '/habit/catagory/:id',
    editHabitCatagoryController,
);
router.delete(
    '/habit/:id',
    deleteHabitController,
);


router.get('/habits', viewHabitController);
router.get('/habit/:id', getSingleHabit);
module.exports = router;
