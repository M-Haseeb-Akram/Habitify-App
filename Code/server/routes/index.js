// eslint-disable-next-line new-cap
const router = require('express').Router();
const {authenticateAction} = require('../middleware/auth.middleware');
const authRoutes = require('./api/auth.routes');
const userRoutes = require('./api/user.routes');

// Auth Routes
router.use('/auth', authRoutes);

// Authorized User Routes
router.use('/user', authenticateAction, userRoutes);

module.exports = router;
