import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createItinerary,
  getUserItineraries,
  getItinerary,
  updateItinerary,
  deleteItinerary
} from '../controllers/itineraryController.js';

const router = express.Router();

// Protected routes
router.use(protect);

// Create new itinerary
router.post('/', createItinerary);

// Get all itineraries for a user (must come before /:idOrSlug)
router.get('/user/:userId', getUserItineraries);

// Get single itinerary by ID or slug
router.get('/:idOrSlug', getItinerary);

// Update itinerary
router.put('/:id', updateItinerary);

// Delete itinerary
router.delete('/:id', deleteItinerary);

export default router; 