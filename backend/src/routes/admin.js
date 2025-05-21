const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');
const { getAllUsers, updateUser, deleteUser } = require('../controllers/adminController');

// Apply admin middleware to all routes
router.use(adminMiddleware);

// User management routes
router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router; 