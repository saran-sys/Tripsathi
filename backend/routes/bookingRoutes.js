import express from 'express';
import { createBooking, confirmPayment, updateBooking } from '../controllers/bookingController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST /api/bookings - Create a new booking
router.post('/', verifyToken, createBooking);

// Confirm payment
router.put('/:id/confirm-payment', verifyToken, confirmPayment);

// Update booking
router.put('/:id', verifyToken, updateBooking);

export default router; 