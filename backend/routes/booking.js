import express from 'express'
import { protect } from '../middleware/authMiddleware.js';
import {
  createBooking,
  getUserBookings,
  getBooking,
  updateBooking,
  deleteBooking,
  confirmPayment,
  markAsComplete
} from '../controllers/bookingController.js';

const router = express.Router();

// Protected routes
router.use(protect);

// Create new booking
router.post('/', createBooking);

// Get all bookings for a user
router.get('/user/:userId', getUserBookings);

// Get single booking
router.get('/:id', getBooking);

// Update booking
router.put('/:id', updateBooking);

// Delete booking
router.delete('/:id', deleteBooking);

// Confirm payment
router.put('/:id/confirm-payment', confirmPayment);

// Mark as complete
router.put('/:id/complete', markAsComplete);

export default router;