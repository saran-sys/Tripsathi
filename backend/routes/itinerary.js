import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createItinerary,
  getUserItineraries,
  getSingleItinerary,
  updateItinerary,
  deleteItinerary
} from '../controllers/itineraryController.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Create new itinerary
router.post('/', createItinerary);

// Get user's itineraries
router.get('/user/:userId', getUserItineraries);

// Get single itinerary
router.get('/:idOrSlug', getSingleItinerary);

// Update itinerary
router.put('/:id', updateItinerary);

// Delete itinerary
router.delete('/:id', deleteItinerary);

export default router;
