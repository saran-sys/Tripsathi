import express from 'express';
import { verifyToken } from '../utils/verifyToken.js';
import {
  getCurrentBookings,
  getPastBookings,
  createBooking,
  updateBookingStatus
} from '../controllers/tourBookingController.js';

const router = express.Router();

// Protected routes - require authentication
router.get('/current', verifyToken, getCurrentBookings);
router.get('/past', verifyToken, getPastBookings);
router.post('/', verifyToken, createBooking);
router.patch('/:bookingId/status', verifyToken, updateBookingStatus);

export default router; 