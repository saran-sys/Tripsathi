import express from 'express';
import adminMiddleware from '../middleware/adminMiddleware.js';
import { getAllUsers, createUser, updateUser, deleteUser } from '../controllers/adminController.js';
import { getAllBookings, updateBookingStatus, deleteBookingAdmin } from '../controllers/bookingController.js';

const router = express.Router();

// Apply admin middleware to all routes
router.use(adminMiddleware);

// User management routes
router.get('/users', getAllUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Booking management routes
router.get('/bookings', getAllBookings);
router.put('/bookings/:id', updateBookingStatus);
router.delete('/bookings/:id', deleteBookingAdmin);

export default router; 