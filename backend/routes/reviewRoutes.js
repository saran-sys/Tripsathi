import express from 'express';
import { createReview, getReviews, updateReview, deleteReview } from '../controllers/reviewController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new review
router.post('/:tourId', verifyToken, createReview);

// Get all reviews for a tour
router.get('/:tourId', getReviews);

// Update a review
router.put('/:id', verifyToken, updateReview);

// Delete a review
router.delete('/:id', verifyToken, deleteReview);

export default router; 