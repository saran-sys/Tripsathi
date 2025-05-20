import express from 'express'
import { createReview, getReviews, updateReview, deleteReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();//const router=express.Router()

// Create a new review
router.post('/:tourId', protect, createReview);

// Get all reviews for a tour
router.get('/:tourId', getReviews);

// Update a review
router.put('/:id', protect, updateReview);

// Delete a review
router.delete('/:id', protect, deleteReview);

export default router;