// eslint-disable-next-line new-cap
const router = require('express').Router();
const {authenticateAction} = require('../middleware/auth_middleware');
const authRoutes = require('./api/auth_routes');
const userRoutes = require('./api/user_routes');

// Auth Routes
router.use('/auth', authRoutes);

// Authorized User Routes
router.use('/user', authenticateAction, userRoutes);

module.exports = router;
