import express from 'express';
import adminMiddleware from '../middleware/adminMiddleware.js';
import { getAllUsers, createUser, updateUser, deleteUser } from '../controllers/adminController.js';

const router = express.Router();

// Apply admin middleware to all routes
router.use(adminMiddleware);

// User management routes
router.get('/users', getAllUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router; 